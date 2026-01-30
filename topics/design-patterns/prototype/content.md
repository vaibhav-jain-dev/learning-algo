# Prototype Pattern

## Overview

The Prototype pattern creates new objects by cloning existing instances rather than invoking constructors directly. This creational pattern delegates object instantiation to the objects themselves through a polymorphic `clone()` method, enabling runtime flexibility and eliminating the coupling between client code and concrete classes.

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 20px 0;">
  <div style="font-weight: 700; color: #92400e; margin-bottom: 8px;">Core Assumption</div>
  <div style="color: #78350f; font-size: 0.95rem;">
    The Prototype pattern assumes that <strong>copying an object is cheaper than constructing it from scratch</strong>. This assumption breaks down when objects contain non-cloneable resources (network connections, file handles) or when the cost of deep copying exceeds constructor cost.
  </div>
</div>

At the language level, cloning involves memory allocation for the new object followed by field-by-field copying. The critical distinction lies in how reference-typed fields are handled: shallow copying duplicates pointers while deep copying recursively duplicates the entire object graph. This distinction drives most interview questions about the pattern.

### Interview Questions: Overview

**Level 1: Why would you choose Prototype over calling a constructor directly?**

Constructors couple client code to concrete classes and require knowledge of all initialization parameters. Prototype enables polymorphic object creation where the client only knows the abstract `Prototype` interface. Additionally, when initialization involves expensive operations (loading assets, parsing configurations, network calls), cloning pre-initialized objects provides significant performance benefits.

**Level 2: How does the Prototype pattern interact with object identity and equality semantics?**

Cloning creates a new object with distinct identity (`clone != original`) but potentially equal state (`clone.equals(original)` may return true). This distinction matters for collections using identity-based hashing, observer registrations, and any system tracking objects by reference. The clone method must decide which identity-linked attributes (unique IDs, timestamps, observer subscriptions) to reset versus preserve.

**Level 3: In a distributed system where objects are serialized across network boundaries, what challenges arise when implementing Prototype, and how would you address objects containing references to shared remote resources?**

Distributed cloning faces several challenges: (1) References to remote services cannot be meaningfully cloned - the clone needs new connections or shared references with explicit lifecycle management; (2) Object versions may differ across nodes, requiring version-aware deserialization; (3) Circular references spanning multiple services require distributed memo tracking; (4) Clone operations may need to be transactional if the object graph spans multiple data stores. Solutions include using [[Proxy Pattern]](/topic/design-patterns/proxy) for remote references, implementing clone factories that inject appropriate service connections, and using serialization frameworks with pluggable reference resolution strategies.

---

## Shallow vs Deep Copy: The Critical Distinction

Understanding copy semantics is fundamental to implementing Prototype correctly. This distinction appears in nearly every interview discussing the pattern.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Copy Semantics Comparison</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
    <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px;">
      <div style="font-weight: 700; color: #1e40af; text-align: center; margin-bottom: 12px;">Shallow Copy</div>
      <div style="background: #eff6ff; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
        <div style="font-size: 0.85rem; color: #1e40af;">
          <strong>Mechanism:</strong> Allocates new object, copies field values directly. Reference fields point to same objects as original.
        </div>
      </div>
      <div style="font-size: 0.8rem; color: #2563eb;">
        <div style="margin-bottom: 6px;"><strong>Object A (original)</strong></div>
        <div style="background: #bfdbfe; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
          name: "Doc1"<br>
            data: [ref] ----+
          </div>
          <div style="margin-bottom: 6px;"><strong>Object B (shallow clone)</strong></div>
          <div style="background: #bfdbfe; padding: 8px; border-radius: 4px;">
            name: "Doc1"<br>
              data: [ref] ----+---> [Shared Array]
            </div>
          </div>
        </div>

        <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 16px;">
          <div style="font-weight: 700; color: #065f46; text-align: center; margin-bottom: 12px;">Deep Copy</div>
          <div style="background: #ecfdf5; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
            <div style="font-size: 0.85rem; color: #065f46;">
              <strong>Mechanism:</strong> Recursively copies entire object graph. Each reference field points to a new copy of the referenced object.
            </div>
          </div>
          <div style="font-size: 0.8rem; color: #059669;">
            <div style="margin-bottom: 6px;"><strong>Object A (original)</strong></div>
            <div style="background: #a7f3d0; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
              name: "Doc1"<br>
                data: [ref] ----> [Array A]
              </div>
              <div style="margin-bottom: 6px;"><strong>Object B (deep clone)</strong></div>
              <div style="background: #a7f3d0; padding: 8px; border-radius: 4px;">
                name: "Doc1"<br>
                  data: [ref] ----> [Array B] (copy)
                </div>
              </div>
            </div>
          </div>
        </div>

        ### Memory Layout and Performance Implications

        **Shallow copy** performs in O(1) relative to nested object graph size - it only copies the immediate object's fields regardless of how complex the referenced objects are. However, this creates **aliasing**: mutations through one reference affect all objects sharing that reference.

        **Deep copy** performs in O(n) where n is the total size of the object graph. Memory consumption doubles (or more, accounting for overhead). For large object graphs, this can cause significant GC pressure and latency spikes.

        <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-left: 4px solid #ec4899; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <div style="font-weight: 700; color: #9d174d; margin-bottom: 8px;">Critical Trade-off</div>
          <div style="color: #831843; font-size: 0.95rem;">
            The choice between shallow and deep copy is not binary. Production implementations often use <strong>hybrid approaches</strong>: deep copy for mutable state, shallow copy (or shared references) for immutable data and expensive-to-copy resources. This requires careful documentation of which fields are shared versus independent.
          </div>
        </div>

        ### Handling Circular References

        Circular references create infinite recursion in naive deep copy implementations. The solution is **memo-based copying**: maintain a dictionary mapping original objects to their clones. Before copying any object, check if it already exists in the memo.

        ```python
        def deep_copy_with_memo(obj, memo=None):
        if memo is None:
        memo = {}

        # Check if already copied
        obj_id = id(obj)
        if obj_id in memo:
        return memo[obj_id]

        # Create shell object and register BEFORE recursing
        clone = object.__new__(type(obj))
        memo[obj_id] = clone

        # Now safe to recursively copy fields
        for key, value in obj.__dict__.items():
        setattr(clone, key, deep_copy_with_memo(value, memo))

        return clone
        ```

        Python's `copy.deepcopy()` implements this pattern internally. The critical insight is that the clone must be registered in the memo **before** recursively copying its fields - otherwise circular references will still cause infinite recursion.

        ### Interview Questions: Shallow vs Deep Copy

        **Level 1: When is shallow copy sufficient, and when must you use deep copy?**

        Shallow copy suffices when: (1) All nested objects are immutable (strings, frozen collections), (2) You intentionally want clones to share state (e.g., shared configuration), (3) Performance constraints prohibit deep copying. Deep copy is required when clones must be independently mutable without affecting each other's nested state.

        **Level 2: How would you implement a copy strategy that deep-copies some fields while shallow-copying others, and what documentation would you provide?**

        Implement a custom `clone()` method that explicitly handles each field category. Document using a "clone contract" specifying: (1) Which fields are deep-copied (independent after cloning), (2) Which fields are shallow-copied (shared references), (3) Which fields are reset (IDs, timestamps), (4) Which fields reference non-cloneable resources. Consider using annotations or builder patterns to make the strategy explicit in code.

        **Level 3: In a system processing 10,000 clone operations per second on objects with 1MB average deep-copy size, what memory and GC implications arise, and how would you design the cloning strategy to minimize latency variance?**

        At 10K ops/sec with 1MB copies, you're generating 10GB/sec of short-lived objects - catastrophic for GC. Solutions: (1) Use [[Object Pool Pattern]](/topic/design-patterns/object-pool) with explicit recycling instead of cloning; (2) Implement copy-on-write semantics where clones share data until mutation; (3) Use structural sharing (persistent data structures) where unchanged subtrees are shared; (4) Implement region-based cloning where objects are allocated in arenas that can be bulk-freed; (5) Profile to identify the 20% of fields causing 80% of copy cost and consider lazy cloning for those. The key insight is that Prototype may be the wrong pattern at this scale - consider [[Flyweight]](/topic/design-patterns/flyweight) for shared intrinsic state.

        ---

        ## Java's Cloneable Interface: A Cautionary Tale

        Java's built-in cloning mechanism via `Cloneable` interface and `Object.clone()` is one of the most criticized features in the language. Understanding its flaws is essential for Java interviews.

        <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #ef4444; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <h4 style="color: #991b1b; margin-top: 0;">Why Java's Cloneable is Broken</h4>

          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
            <div style="background: #fff; border-radius: 8px; padding: 12px; border-left: 4px solid #dc2626;">
              <div style="font-weight: 600; color: #991b1b;">1. Marker Interface Anti-pattern</div>
              <div style="font-size: 0.9rem; color: #7f1d1d;">Cloneable has no methods. The clone() method is defined in Object, not Cloneable. Implementing Cloneable just changes Object.clone()'s behavior from throwing CloneNotSupportedException to performing a shallow copy.</div>
            </div>

            <div style="background: #fff; border-radius: 8px; padding: 12px; border-left: 4px solid #dc2626;">
              <div style="font-weight: 600; color: #991b1b;">2. Extralinguistic Object Creation</div>
              <div style="font-size: 0.9rem; color: #7f1d1d;">clone() creates objects without calling constructors, bypassing initialization logic and invariant establishment. Final fields cannot be set after Object.clone() returns, breaking immutability patterns.</div>
            </div>

            <div style="background: #fff; border-radius: 8px; padding: 12px; border-left: 4px solid #dc2626;">
              <div style="font-weight: 600; color: #991b1b;">3. Inheritance Complexity</div>
              <div style="font-size: 0.9rem; color: #7f1d1d;">If a parent class overrides clone() but a child doesn't, the child's clone will have wrong runtime type unless using super.clone() chain. Covariant return types partially address this but add complexity.</div>
            </div>

            <div style="background: #fff; border-radius: 8px; padding: 12px; border-left: 4px solid #dc2626;">
              <div style="font-weight: 600; color: #991b1b;">4. Shallow Copy Default</div>
              <div style="font-size: 0.9rem; color: #7f1d1d;">Object.clone() performs shallow copy. Every Cloneable implementation must manually deep-copy mutable fields, which is error-prone and often forgotten.</div>
            </div>
          </div>
        </div>

        ### The "Correct" Way to Implement Cloneable (If You Must)

        ```java
        public class Document implements Cloneable {
        private String title;                    // Immutable - shallow copy OK
        private Date createdAt;                  // Mutable - must deep copy
        private List<Section> sections;          // Mutable collection - must deep copy
          private final UUID id;                   // Final field problem!

          @Override
          public Document clone() {
          try {
          Document clone = (Document) super.clone();

          // Deep copy mutable fields
          clone.createdAt = (Date) this.createdAt.clone();
          clone.sections = new ArrayList<>();
          for (Section s : this.sections) {
          clone.sections.add(s.clone());  // Sections must also be Cloneable
          }

          // PROBLEM: Cannot reassign final field 'id'
          // clone.id = UUID.randomUUID();  // Compile error!

          return clone;
          } catch (CloneNotSupportedException e) {
          throw new AssertionError();  // Can't happen if we implement Cloneable
          }
          }
          }
          ```

          ### Preferred Alternatives to Cloneable

          <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #10b981; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h4 style="color: #065f46; margin-top: 0;">Better Approaches in Java</h4>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 16px;">
              <div style="background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #6ee7b7;">
                <div style="font-weight: 600; color: #065f46; margin-bottom: 8px;">Copy Constructor</div>
                <div style="font-size: 0.85rem; color: #047857;">
                  <code>public Document(Document other)</code><br><br>
                      Explicit, uses normal construction, can set final fields, no checked exceptions.
                    </div>
                  </div>

                  <div style="background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #6ee7b7;">
                    <div style="font-weight: 600; color: #065f46; margin-bottom: 8px;">Static Factory Method</div>
                    <div style="font-size: 0.85rem; color: #047857;">
                      <code>public static Document copyOf(Document d)</code><br><br>
                          Can return subtype, can cache, descriptive naming, full control over construction.
                        </div>
                      </div>

                      <div style="background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #6ee7b7;">
                        <div style="font-weight: 600; color: #065f46; margin-bottom: 8px;">Serialization Round-trip</div>
                        <div style="font-size: 0.85rem; color: #047857;">
                          Serialize to bytes, deserialize to new object. Handles entire object graph automatically. Slower but handles complex graphs.
                        </div>
                      </div>

                      <div style="background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #6ee7b7;">
                        <div style="font-weight: 600; color: #065f46; margin-bottom: 8px;">Builder Pattern</div>
                        <div style="font-size: 0.85rem; color: #047857;">
                          <code>Document.builder(original).withId(newId).build()</code><br><br>
                              Maximum flexibility, explicit about modifications, works with immutable objects.
                            </div>
                          </div>
                        </div>
                      </div>

                      ### Interview Questions: Java Cloneable

                      **Level 1: Why is implementing Cloneable considered problematic in Java?**

                      Cloneable is a marker interface with no clone() method - the method lives in Object. Clone bypasses constructors, making it impossible to enforce invariants or initialize final fields. The default shallow copy behavior requires manual deep-copy code for every mutable field. The checked CloneNotSupportedException is almost always impossible when the class implements Cloneable, yet must still be caught.

                      **Level 2: How would you design a cloneable class hierarchy where both parent and child classes have mutable state that needs deep copying?**

                      Each class in the hierarchy must: (1) Call super.clone() to get proper runtime type, (2) Deep-copy its own mutable fields after super.clone() returns, (3) Document the clone contract for subclasses. The parent's clone() should be protected if not all subclasses should be cloneable. Consider making clone() final in the parent if the class hierarchy's cloning semantics shouldn't be overridden. Use covariant return types for type-safe cloning.

                      **Level 3: Given that Object.clone() bypasses constructors, how would you implement clone() for a class that uses constructor injection for dependencies, maintains invariants checked in the constructor, and has final fields that should differ between original and clone?**

                      This scenario exposes Cloneable's fundamental design flaw. Solutions: (1) Abandon Cloneable entirely - use copy constructor that takes both the source object and the dependencies to inject; (2) Use a static factory that creates a new instance via constructor, then copies state: `Document copyOf(Document src, IdGenerator idGen)`; (3) If forced to use clone(), make fields non-final and use a post-clone initialization method (breaks immutability); (4) Use [[Builder Pattern]](/topic/design-patterns/builder) where `toBuilder()` returns a pre-populated builder that can be modified before building a new instance with proper construction.

                      ---

                      ## Prototype Registry: Managing Prototype Collections

                      The Prototype Registry (also called Prototype Manager) centralizes prototype storage and provides named access to clones. This is essential when prototypes are expensive to create or configured at startup.

                      <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                        <h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Prototype Registry Architecture</h4>

                        <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px;">
                          <div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap;">
                            <div style="background: #e0e7ff; border: 2px solid #6366f1; border-radius: 8px; padding: 16px; text-align: center; min-width: 120px;">
                              <div style="font-weight: 600; color: #3730a3;">Client</div>
                              <div style="font-size: 0.75rem; color: #4f46e5; margin-top: 4px;">Requests clones by name</div>
                            </div>

                            <div style="color: #64748b; font-size: 1.5rem;">&#8594;</div>

                            <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px; text-align: center; min-width: 180px;">
                              <div style="font-weight: 600; color: #92400e;">Prototype Registry</div>
                              <div style="font-size: 0.75rem; color: #b45309; margin-top: 4px;">
                                register(name, proto)<br>
                                  clone(name): Prototype<br>
                                    unregister(name)
                                  </div>
                                </div>

                                <div style="color: #64748b; font-size: 1.5rem;">&#8594;</div>

                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                  <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 6px; padding: 8px 16px; text-align: center;">
                                    <div style="font-size: 0.8rem; color: #1e40af;">"report" : ReportProto</div>
                                  </div>
                                  <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 6px; padding: 8px 16px; text-align: center;">
                                    <div style="font-size: 0.8rem; color: #065f46;">"invoice" : InvoiceProto</div>
                                  </div>
                                  <div style="background: #fce7f3; border: 2px solid #ec4899; border-radius: 6px; padding: 8px 16px; text-align: center;">
                                    <div style="font-size: 0.8rem; color: #9d174d;">"memo" : MemoProto</div>
                                  </div>
                                </div>
                              </div>

                              <div style="background: #f1f5f9; border-radius: 8px; padding: 12px;">
                                <div style="font-size: 0.85rem; color: #475569;">
                                  <strong>Key Behaviors:</strong> (1) Clients decouple from concrete classes - only know prototype names; (2) Prototypes can be added/removed at runtime; (3) Registry can implement lazy initialization, caching, or pooling strategies.
                                </div>
                              </div>
                            </div>
                          </div>

                          ### Registry Implementation Considerations

                          **Thread Safety**: In concurrent systems, the registry must handle simultaneous registrations and clone requests. Options include:
                          - Concurrent hash maps for lock-free reads
                          - Read-write locks for read-heavy workloads
                          - Copy-on-write for rarely-modified registries

                          **Hierarchical Registries**: Large systems may use registry hierarchies - local registries that fall back to parent registries, enabling context-specific prototypes with shared defaults.

                          **Lazy vs Eager Initialization**: Prototypes can be created eagerly at startup (faster clone requests, longer startup) or lazily on first request (faster startup, first-request latency).

                          ```python
                          class PrototypeRegistry:
                          def __init__(self, parent: 'PrototypeRegistry' = None):
                          self._prototypes: Dict[str, Prototype] = {}
                          self._factories: Dict[str, Callable[[], Prototype]] = {}  # Lazy init
                          self._parent = parent
                          self._lock = threading.RLock()

                          def register(self, name: str, prototype: Prototype) -> None:
                          with self._lock:
                          self._prototypes[name] = prototype

                          def register_factory(self, name: str, factory: Callable[[], Prototype]) -> None:
                          """Register a factory for lazy prototype initialization."""
                          with self._lock:
                          self._factories[name] = factory

                          def clone(self, name: str) -> Prototype:
                          with self._lock:
                          # Check local prototypes
                          if name in self._prototypes:
                          return self._prototypes[name].clone()

                          # Check lazy factories
                          if name in self._factories:
                          self._prototypes[name] = self._factories[name]()
                          del self._factories[name]
                          return self._prototypes[name].clone()

                          # Fall back to parent registry
                          if self._parent:
                          return self._parent.clone(name)

                          raise KeyError(f"Unknown prototype: {name}")
                          ```

                          ### Interview Questions: Prototype Registry

                          **Level 1: What are the benefits of using a Prototype Registry versus having clients manage prototypes directly?**

                          The registry centralizes prototype lifecycle management, enabling: (1) Named access without clients knowing concrete types; (2) Runtime registration/modification of prototypes; (3) Centralized policies for caching, initialization, and access control; (4) Easier testing through registry mocking; (5) Decoupling between prototype creation and usage locations.

                          **Level 2: How would you design a registry that supports prototype versioning, allowing clients to request specific versions or "latest"?**

                          Extend the registry key to include version: `Map<(name, version), Prototype>`. Maintain a separate "latest" pointer per name. Implement version resolution strategies: exact match, compatible range (semver), or fallback chain. Consider whether clones should embed their source version for debugging. For audit requirements, log which version was cloned when. Handle version deprecation with grace periods and warnings.

                          **Level 3: Design a distributed prototype registry for a microservices architecture where prototypes may be defined in different services and need to be accessible across the cluster with consistency guarantees.**

                          Key challenges: (1) **Discovery**: Use service registry (Consul, etcd) to track which services offer which prototypes; (2) **Serialization**: Prototypes must be serializable across service boundaries - define a wire format and versioning scheme; (3) **Caching**: Local caches reduce latency but need invalidation strategies (TTL, pub/sub notifications); (4) **Consistency**: Choose between strong consistency (serialize through leader) or eventual consistency (acceptable staleness). Consider [[CQRS]](/topic/system-design/cqrs) where prototype definitions are commands and local caches are eventually-consistent read models; (5) **Failure handling**: Define behavior when remote registry is unavailable - fail fast, use stale cache, or degrade to local-only prototypes.

                          ---

                          ## Cloning Complex Objects: Advanced Scenarios

                          Real-world objects often contain elements that complicate cloning: circular references, external resource handles, lazy-loaded proxies, and observer relationships.

                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                            <h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Complex Object Cloning Challenges</h4>

                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 20px;">
                              <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 16px;">
                                <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">Circular References</div>
                                <div style="font-size: 0.85rem; color: #7f1d1d;">
                                  Object A references B, B references A. Naive deep copy causes infinite recursion. Solution: memo-based copying with pre-registration.
                                </div>
                              </div>

                              <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 16px;">
                                <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">External Resources</div>
                                <div style="font-size: 0.85rem; color: #7f1d1d;">
                                  Database connections, file handles, sockets cannot be meaningfully copied. Options: share reference, create new connection, or null and lazy-reinitialize.
                                </div>
                              </div>

                              <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 16px;">
                                <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">Lazy-Loaded Proxies</div>
                                <div style="font-size: 0.85rem; color: #7f1d1d;">
                                  ORM proxies (Hibernate, SQLAlchemy) may trigger database loads during cloning. Decide: clone the proxy, force-load then clone, or clone only loaded state.
                                </div>
                              </div>

                              <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 16px;">
                                <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">Observer Relationships</div>
                                <div style="font-size: 0.85rem; color: #7f1d1d;">
                                  If original has registered listeners/observers, should clone inherit them? Usually no - clone should have empty observer list requiring explicit re-registration.
                                </div>
                              </div>

                              <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 16px;">
                                <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">Transient/Derived State</div>
                                <div style="font-size: 0.85rem; color: #7f1d1d;">
                                  Cached computations, memoized values. Options: copy cached state (faster but may be stale) or invalidate caches (slower but correct).
                                </div>
                              </div>

                              <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 16px;">
                                <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">Identity Fields</div>
                                <div style="font-size: 0.85rem; color: #7f1d1d;">
                                  UUIDs, database IDs, creation timestamps must typically be regenerated for clones to avoid identity conflicts.
                                </div>
                              </div>
                            </div>
                          </div>

                          ### Clone Contract Documentation

                          Complex objects need explicit documentation of cloning behavior:

                          ```python
                          class Order(Prototype):
                          """
                          Clone Contract:

                          DEEP COPIED (independent after clone):
                          - line_items: List[LineItem] - each item cloned
                          - shipping_address: Address - full copy
                          - custom_fields: Dict - deep copied

                          SHALLOW COPIED (shared reference):
                          - customer: Customer - references same customer
                          - product_catalog: Catalog - shared, immutable

                          RESET (new value for clone):
                          - id: regenerated UUID
                          - created_at: current timestamp
                          - status: reset to DRAFT
                          - observers: empty list (re-register if needed)

                          NOT COPIED (null in clone):
                          - payment_info: security-sensitive, must be re-entered
                          - audit_log: clone starts fresh audit trail
                          """
                          ```

                          ### Implementing Cloneable with External Resources

                          ```python
                          class DatabaseBackedDocument(Prototype):
                          def __init__(self, doc_id: str, connection_pool: ConnectionPool):
                          self.doc_id = doc_id
                          self._connection_pool = connection_pool  # External resource
                          self._content = None  # Lazy loaded
                          self._observers: List[Observer] = []
                          self._cache: Dict[str, Any] = {}

                          def clone(self) -> 'DatabaseBackedDocument':
                          """
                          Creates a new document that shares the connection pool
                          but has independent state.
                          """
                          # Use new ID for the clone
                          new_id = str(uuid.uuid4())

                          # Create new instance - DON'T deepcopy the whole thing
                          clone = DatabaseBackedDocument(new_id, self._connection_pool)

                          # Deep copy the content if loaded
                          if self._content is not None:
                          clone._content = copy.deepcopy(self._content)

                          # Don't copy observers - clone starts with none
                          clone._observers = []

                          # Invalidate cache - clone computes fresh
                          clone._cache = {}

                          return clone
                          ```

                          ### Interview Questions: Cloning Complex Objects

                          **Level 1: What special handling is needed when cloning objects that contain database connections or file handles?**

                          These resources cannot be duplicated at the OS/network level. Options: (1) Share the reference if thread-safe and semantically appropriate; (2) Create a new connection for the clone from a connection pool; (3) Set to null in clone and lazy-initialize on first access; (4) Throw an exception if cloning resource-holding objects is prohibited by design. Document the chosen behavior clearly.

                          **Level 2: How would you implement clone() for an object graph where some objects should be shared between original and clone while others should be deeply copied?**

                          Implement a custom cloning visitor that traverses the object graph with explicit rules per type. Use annotations or a configuration map to specify clone strategy per field/type: `@CloneStrategy(DEEP)`, `@CloneStrategy(SHALLOW)`, `@CloneStrategy(RESET)`, `@CloneStrategy(SKIP)`. The visitor maintains a memo for already-cloned objects while respecting the per-field strategy. Consider implementing `CloneContext` that carries both the memo and the strategy configuration.

                          **Level 3: Design a cloning system for a domain model using an ORM (like Hibernate) where entities have lazy-loaded relationships, version fields for optimistic locking, and bidirectional associations. How do you handle detached vs managed entity cloning?**

                          This is a deeply challenging scenario: (1) **Lazy loading**: Decide whether to clone proxies as-is (clone will trigger load on access), force-initialize before cloning (N+1 queries), or explicitly load only needed relationships; (2) **Versioning**: Clone must have version=0 or null for new entities, otherwise optimistic locking fails; (3) **Bidirectional associations**: When cloning A->B and B->A, both clones must reference each other, not the originals - requires memo-based approach with post-processing to fix up back-references; (4) **Managed vs detached**: Cloning managed entities may require explicit detachment first; the clone should typically be transient (not yet persisted); (5) **ID generation**: Clear IDs so the ORM treats clones as new entities. Consider implementing as an ORM session extension: `session.clone(entity, depth_config)` that handles these concerns systematically. Use [[Unit of Work]](/topic/design-patterns/unit-of-work) pattern awareness to track clone lifecycle.

                          ---

                          ## Real-World Implementation Patterns

                          ### Pattern 1: Prototype with Copy-on-Write

                          For memory efficiency when clones rarely diverge:

                          ```python
                          class CopyOnWriteDocument:
                          """Shares state until modification, then copies."""

                          def __init__(self, data=None, shared_data=None):
                          if shared_data is not None:
                          self._shared_data = shared_data
                          self._local_modifications = {}
                          self._is_copy = True
                          else:
                          self._shared_data = data or {}
                          self._local_modifications = {}
                          self._is_copy = False

                          def clone(self) -> 'CopyOnWriteDocument':
                          # Clone shares original data, tracks own modifications
                          return CopyOnWriteDocument(shared_data=self._shared_data)

                          def __getitem__(self, key):
                          if key in self._local_modifications:
                          return self._local_modifications[key]
                          return self._shared_data[key]

                          def __setitem__(self, key, value):
                          # Modifications go to local storage only
                          self._local_modifications[key] = value

                          def materialize(self) -> Dict:
                          """Create fully independent copy of current state."""
                          result = dict(self._shared_data)
                          result.update(self._local_modifications)
                          return result
                          ```

                          ### Pattern 2: Versioned Prototype Registry

                          ```python
                          class VersionedPrototypeRegistry:
                          """Registry supporting multiple prototype versions."""

                          def __init__(self):
                          self._versions: Dict[str, Dict[str, Prototype]] = defaultdict(dict)
                          self._latest: Dict[str, str] = {}  # name -> latest version

                          def register(self, name: str, version: str, prototype: Prototype) -> None:
                          self._versions[name][version] = prototype
                          # Update latest if this is newer
                          if name not in self._latest or version > self._latest[name]:
                          self._latest[name] = version

                          def clone(self, name: str, version: str = None) -> Prototype:
                          if version is None:
                          version = self._latest.get(name)
                          if version is None:
                          raise KeyError(f"No versions registered for '{name}'")

                          prototype = self._versions[name].get(version)
                          if prototype is None:
                          raise KeyError(f"Version '{version}' not found for '{name}'")

                          clone = prototype.clone()
                          # Embed source version metadata
                          if hasattr(clone, 'metadata'):
                          clone.metadata['_cloned_from_version'] = version
                          return clone
                          ```

                          ### Pattern 3: Prototype Factory Integration

                          Combining Prototype with [[Factory Method]](/topic/design-patterns/factory-method) for flexible object creation:

                          ```python
                          class DocumentFactory:
                          """Factory that uses prototypes for common cases, construction for custom."""

                          def __init__(self, registry: PrototypeRegistry):
                          self._registry = registry

                          def create(self, doc_type: str, **customizations) -> Document:
                          try:
                          # Try to clone from registry first
                          doc = self._registry.clone(doc_type)
                          except KeyError:
                          # Fall back to construction for unknown types
                          doc = self._construct_custom(doc_type)

                          # Apply customizations
                          for key, value in customizations.items():
                          setattr(doc, key, value)

                          return doc

                          def _construct_custom(self, doc_type: str) -> Document:
                          # Factory method for types without prototypes
                          return Document(title=f"New {doc_type}", content="")
                          ```

                          ---

                          ## Code Implementation

                          ### Python Implementation

                          ```python
                          """
                          Prototype Pattern - Complete Implementation

                          Demonstrates:
                          - Deep vs shallow cloning
                          - Prototype registry with versioning
                          - Complex object cloning with external resources
                          - Copy-on-write optimization
                          - Thread-safe registry operations
                          """

                          import copy
                          import uuid
                          import threading
                          from abc import ABC, abstractmethod
                          from typing import Dict, Any, Optional, Callable, List
                          from datetime import datetime
                          from collections import defaultdict


                          class Prototype(ABC):
                          """
                          Abstract prototype interface.

                          Subclasses must implement clone() to create copies of themselves.
                          The implementation should document its clone contract explicitly.
                          """

                          @abstractmethod
                          def clone(self) -> 'Prototype':
                          """
                          Create a copy of this object.

                          Returns:
                          A new instance that is a copy of this object.
                          The copy semantics (shallow vs deep) are implementation-specific.
                          """
                          pass


                          class Document(Prototype):
                          """
                          A document with complex nested structure demonstrating proper cloning.

                          Clone Contract:
                          - title, content: deep copied (new strings)
                          - metadata: deep copied (independent dict)
                          - sections: deep copied (independent list with copied sections)
                          - formatting: deep copied (independent nested structure)
                          - id: RESET to new UUID
                          - created_at: RESET to current time
                          - observers: RESET to empty list
                          """

                          def __init__(self, title: str, content: str = ""):
                          self.id = str(uuid.uuid4())
                          self.title = title
                          self.content = content
                          self.metadata: Dict[str, Any] = {}
                          self.sections: List[Dict[str, str]] = []
                          self.formatting = {
                          'font': 'Arial',
                          'size': 12,
                          'margins': {'top': 1, 'bottom': 1, 'left': 1, 'right': 1}
                          }
                          self.created_at = datetime.now()
                          self._observers: List[Callable] = []  # Not cloned

                          def add_section(self, name: str, content: str) -> None:
                          self.sections.append({'name': name, 'content': content})

                          def add_observer(self, callback: Callable) -> None:
                          self._observers.append(callback)

                          def clone(self) -> 'Document':
                          """Create a deep copy with reset identity fields."""
                          # Deep copy entire object graph
                          cloned = copy.deepcopy(self)

                          # Reset identity fields
                          cloned.id = str(uuid.uuid4())
                          cloned.created_at = datetime.now()

                          # Clear observers - clone starts fresh
                          cloned._observers = []

                          return cloned

                          def __repr__(self) -> str:
                          return (f"Document(id={self.id[:8]}..., title='{self.title}', "
                          f"sections={len(self.sections)}, created={self.created_at.isoformat()})")


                          class GameCharacter(Prototype):
                          """
                          Game character demonstrating cloning with shared immutable resources.

                          Clone Contract:
                          - name, character_class, stats: deep copied
                          - skills, inventory, equipment: deep copied
                          - _loaded_assets: SHALLOW copied (immutable, expensive to load)
                          - position: RESET to spawn point
                          - entity_id: RESET to new UUID
                          """

                          def __init__(self, name: str, character_class: str):
                          self.entity_id = str(uuid.uuid4())
                          self.name = name
                          self.character_class = character_class
                          self.level = 1
                          self.health = 100
                          self.mana = 50
                          self.skills: Dict[str, int] = {}
                          self.inventory: List[str] = []
                          self.equipment = {'weapon': None, 'armor': None, 'accessory': None}
                          self.position = {'x': 0.0, 'y': 0.0, 'z': 0.0}

                          # Expensive to load, immutable - will be shared
                          self._loaded_assets = self._load_assets()

                          def _load_assets(self) -> Dict[str, str]:
                          """Simulate expensive asset loading."""
                          # In production: load 3D models, textures, animations
                          return {
                          'model': f'{self.character_class.lower()}_model.fbx',
                          'texture': f'{self.character_class.lower()}_texture.png',
                          'animations': f'{self.character_class.lower()}_anims.dat'
                          }

                          def clone(self) -> 'GameCharacter':
                          """
                          Clone character with deep copy of mutable state,
                          shallow copy of immutable assets.
                          """
                          # Create new instance without expensive asset loading
                          clone = object.__new__(GameCharacter)

                          # Copy primitive fields
                          clone.name = self.name
                          clone.character_class = self.character_class
                          clone.level = self.level
                          clone.health = self.health
                          clone.mana = self.mana

                          # Deep copy mutable collections
                          clone.skills = dict(self.skills)
                          clone.inventory = list(self.inventory)
                          clone.equipment = dict(self.equipment)

                          # Reset position to spawn point
                          clone.position = {'x': 0.0, 'y': 0.0, 'z': 0.0}

                          # New entity ID
                          clone.entity_id = str(uuid.uuid4())

                          # SHALLOW copy - share immutable assets
                          clone._loaded_assets = self._loaded_assets

                          return clone

                          def __repr__(self) -> str:
                          return (f"GameCharacter(id={self.entity_id[:8]}..., name='{self.name}', "
                          f"class={self.character_class}, level={self.level})")


                          class PrototypeRegistry:
                          """
                          Thread-safe registry for managing named prototypes.

                          Supports:
                          - Immediate registration with prototype instances
                          - Lazy registration with factory functions
                          - Hierarchical registries (parent fallback)
                          - Thread-safe operations
                          """

                          def __init__(self, parent: 'PrototypeRegistry' = None):
                          self._prototypes: Dict[str, Prototype] = {}
                          self._factories: Dict[str, Callable[[], Prototype]] = {}
                          self._parent = parent
                          self._lock = threading.RLock()

                          def register(self, name: str, prototype: Prototype) -> None:
                          """Register a prototype instance."""
                          with self._lock:
                          self._prototypes[name] = prototype
                          # Clear any factory for this name
                          self._factories.pop(name, None)

                          def register_lazy(self, name: str, factory: Callable[[], Prototype]) -> None:
                          """Register a factory for lazy prototype initialization."""
                          with self._lock:
                          self._factories[name] = factory

                          def unregister(self, name: str) -> bool:
                          """Remove a prototype. Returns True if found and removed."""
                          with self._lock:
                          removed = name in self._prototypes or name in self._factories
                          self._prototypes.pop(name, None)
                          self._factories.pop(name, None)
                          return removed

                          def clone(self, name: str) -> Prototype:
                          """
                          Clone a prototype by name.

                          Resolution order:
                          1. Local prototypes
                          2. Local factories (lazily initialized)
                          3. Parent registry (if exists)

                          Raises:
                          KeyError: If prototype not found in any registry
                          """
                          with self._lock:
                          # Check local prototypes
                          if name in self._prototypes:
                          return self._prototypes[name].clone()

                          # Check lazy factories
                          if name in self._factories:
                          # Initialize and cache
                          self._prototypes[name] = self._factories[name]()
                          del self._factories[name]
                          return self._prototypes[name].clone()

                          # Try parent
                          if self._parent is not None:
                          return self._parent.clone(name)

                          raise KeyError(f"Prototype '{name}' not found in registry")

                          def list_prototypes(self) -> List[str]:
                          """List all available prototype names including lazy ones."""
                          with self._lock:
                          names = set(self._prototypes.keys()) | set(self._factories.keys())
                          if self._parent:
                          names |= set(self._parent.list_prototypes())
                          return sorted(names)

                          def __contains__(self, name: str) -> bool:
                          """Check if a prototype is registered."""
                          with self._lock:
                          if name in self._prototypes or name in self._factories:
                          return True
                          if self._parent:
                          return name in self._parent
                          return False


                          class VersionedPrototypeRegistry:
                          """
                          Registry supporting multiple versions of prototypes.

                          Supports:
                          - Multiple versions per prototype name
                          - "Latest" version tracking
                          - Version metadata embedding in clones
                          """

                          def __init__(self):
                          self._versions: Dict[str, Dict[str, Prototype]] = defaultdict(dict)
                          self._latest: Dict[str, str] = {}
                          self._lock = threading.RLock()

                          def register(self, name: str, version: str, prototype: Prototype,
                          is_latest: bool = True) -> None:
                          """Register a prototype version."""
                          with self._lock:
                          self._versions[name][version] = prototype
                          if is_latest or name not in self._latest:
                          self._latest[name] = version

                          def clone(self, name: str, version: str = None) -> Prototype:
                          """
                          Clone a prototype, optionally specifying version.

                          Args:
                          name: Prototype name
                          version: Specific version, or None for latest

                          Returns:
                          Cloned prototype with version metadata if supported
                          """
                          with self._lock:
                          if version is None:
                          version = self._latest.get(name)
                          if version is None:
                          raise KeyError(f"No versions registered for '{name}'")

                          versions = self._versions.get(name, {})
                          prototype = versions.get(version)
                          if prototype is None:
                          raise KeyError(f"Version '{version}' not found for '{name}'")

                          clone = prototype.clone()

                          # Embed version metadata if possible
                          if hasattr(clone, 'metadata') and isinstance(clone.metadata, dict):
                          clone.metadata['_source_version'] = version
                          clone.metadata['_source_name'] = name

                          return clone

                          def list_versions(self, name: str) -> List[str]:
                          """List all versions for a prototype name."""
                          with self._lock:
                          return sorted(self._versions.get(name, {}).keys())

                          def get_latest_version(self, name: str) -> Optional[str]:
                          """Get the latest version string for a name."""
                          return self._latest.get(name)


                          # Usage demonstration
                          if __name__ == "__main__":
                          print("=" * 60)
                          print("PROTOTYPE PATTERN DEMONSTRATION")
                          print("=" * 60)

                          # === Document Cloning ===
                          print("\n--- Document Cloning ---")

                          original_doc = Document("Quarterly Report Template")
                          original_doc.metadata = {'department': 'Engineering', 'confidential': True}
                          original_doc.add_section("Executive Summary", "[Summary placeholder]")
                          original_doc.add_section("Metrics", "[Metrics placeholder]")
                          original_doc.formatting['font'] = 'Times New Roman'

                          print(f"Original: {original_doc}")

                          # Clone and customize
                          q4_report = original_doc.clone()
                          q4_report.title = "Q4 2024 Engineering Report"
                          q4_report.sections[0]['content'] = "Q4 saw 15% improvement in deployment frequency..."

                          print(f"Clone: {q4_report}")
                          print(f"Independent sections: {original_doc.sections[0]['content'] != q4_report.sections[0]['content']}")
                          print(f"Different IDs: {original_doc.id != q4_report.id}")

                          # === Game Character Cloning ===
                          print("\n--- Game Character Cloning ---")

                          warrior_template = GameCharacter("Warrior Template", "Warrior")
                          warrior_template.skills = {'slash': 10, 'block': 8, 'charge': 5}
                          warrior_template.inventory = ['iron_sword', 'leather_armor', 'health_potion']
                          warrior_template.equipment['weapon'] = 'Iron Sword'
                          warrior_template.equipment['armor'] = 'Chain Mail'

                          print(f"Template: {warrior_template}")

                          # Spawn multiple warriors
                          player1 = warrior_template.clone()
                          player1.name = "Thorin"
                          player1.position = {'x': 10.0, 'y': 0.0, 'z': 5.0}

                          player2 = warrior_template.clone()
                          player2.name = "Gimli"
                          player2.skills['slash'] = 15  # Customize skills
                          player2.inventory.append('throwing_axe')

                          print(f"Player 1: {player1}")
                          print(f"Player 2: {player2}")
                          print(f"Template skills unchanged: {warrior_template.skills['slash'] == 10}")
                          print(f"Template inventory unchanged: {len(warrior_template.inventory) == 3}")
                          print(f"Shared assets (memory optimization): {player1._loaded_assets is player2._loaded_assets}")

                          # === Prototype Registry ===
                          print("\n--- Prototype Registry ---")

                          registry = PrototypeRegistry()

                          # Register templates
                          registry.register("report", original_doc)
                          registry.register("warrior", warrior_template)

                          # Lazy registration
                          registry.register_lazy("mage", lambda: GameCharacter("Mage Template", "Mage"))

                          print(f"Available prototypes: {registry.list_prototypes()}")

                          # Clone from registry
                          new_report = registry.clone("report")
                          new_warrior = registry.clone("warrior")
                          new_mage = registry.clone("mage")  # Triggers lazy initialization

                          print(f"Cloned report: {new_report}")
                          print(f"Cloned warrior: {new_warrior}")
                          print(f"Cloned mage: {new_mage}")

                          # === Versioned Registry ===
                          print("\n--- Versioned Prototype Registry ---")

                          versioned = VersionedPrototypeRegistry()

                          # Register multiple versions
                          v1_doc = Document("Report v1")
                          v1_doc.metadata = {'version': '1.0', 'features': ['basic']}
                          versioned.register("report", "1.0", v1_doc, is_latest=False)

                          v2_doc = Document("Report v2")
                          v2_doc.metadata = {'version': '2.0', 'features': ['basic', 'charts', 'export']}
                          v2_doc.add_section("Charts", "[Chart section]")
                          versioned.register("report", "2.0", v2_doc, is_latest=True)

                          print(f"Report versions: {versioned.list_versions('report')}")
                          print(f"Latest version: {versioned.get_latest_version('report')}")

                          # Clone specific version
                          v1_clone = versioned.clone("report", "1.0")
                          latest_clone = versioned.clone("report")  # Gets 2.0

                          print(f"v1 clone sections: {len(v1_clone.sections)}")
                          print(f"Latest clone sections: {len(latest_clone.sections)}")
                          print(f"Version metadata: {latest_clone.metadata.get('_source_version')}")

                          print("\n" + "=" * 60)
                          print("DEMONSTRATION COMPLETE")
                          print("=" * 60)
                          ```

                          ### Go Implementation

                          ```go
                          package main

                          import (
                          "fmt"
                          "sync"
                          "time"

                          "github.com/google/uuid"
                          )

                          // Prototype defines the cloning interface.
                          // All cloneable types must implement this interface.
                          type Prototype interface {
                          Clone() Prototype
                          }

                          // Document represents a complex document with nested structures.
                          // Clone Contract:
                          // - Title, Content: copied (Go strings are immutable)
                          // - Metadata: deep copied (new map)
                          // - Sections: deep copied (new slice with copied structs)
                          // - Formatting: deep copied (new nested struct)
                          // - ID: RESET to new UUID
                          // - CreatedAt: RESET to current time
                          type Document struct {
                          ID         string
                          Title      string
                          Content    string
                          Metadata   map[string]string
                          Sections   []Section
                          Formatting Formatting
                          CreatedAt  time.Time
                          }

                          type Section struct {
                          Name    string
                          Content string
                          }

                          type Formatting struct {
                          Font    string
                          Size    int
                          Margins Margins
                          }

                          type Margins struct {
                          Top, Bottom, Left, Right int
                          }

                          // NewDocument creates a new document with default formatting.
                          func NewDocument(title string) *Document {
                          return &Document{
                          ID:       uuid.New().String(),
                          Title:    title,
                          Metadata: make(map[string]string),
                          Sections: make([]Section, 0),
                          Formatting: Formatting{
                          Font: "Arial",
                          Size: 12,
                          Margins: Margins{
                          Top: 1, Bottom: 1, Left: 1, Right: 1,
                          },
                          },
                          CreatedAt: time.Now(),
                          }
                          }

                          // Clone creates a deep copy of the document with reset identity fields.
                          func (d *Document) Clone() Prototype {
                          clone := &Document{
                          ID:        uuid.New().String(), // New ID
                          Title:     d.Title,
                          Content:   d.Content,
                          CreatedAt: time.Now(), // Reset timestamp
                          Formatting: Formatting{
                          Font: d.Formatting.Font,
                          Size: d.Formatting.Size,
                          Margins: Margins{
                          Top:    d.Formatting.Margins.Top,
                          Bottom: d.Formatting.Margins.Bottom,
                          Left:   d.Formatting.Margins.Left,
                          Right:  d.Formatting.Margins.Right,
                          },
                          },
                          }

                          // Deep copy metadata map
                          clone.Metadata = make(map[string]string, len(d.Metadata))
                          for k, v := range d.Metadata {
                          clone.Metadata[k] = v
                          }

                          // Deep copy sections slice
                          clone.Sections = make([]Section, len(d.Sections))
                          copy(clone.Sections, d.Sections)

                          return clone
                          }

                          // AddSection adds a new section to the document.
                          func (d *Document) AddSection(name, content string) {
                          d.Sections = append(d.Sections, Section{Name: name, Content: content})
                          }

                          // GameCharacter represents a game entity with expensive-to-load assets.
                          // Clone Contract:
                          // - Name, CharacterClass, stats: copied
                          // - Skills: deep copied (new map)
                          // - Inventory: deep copied (new slice)
                          // - Equipment: deep copied (new struct)
                          // - LoadedAssets: SHALLOW copied (immutable, expensive)
                          // - Position: RESET to spawn point
                          // - EntityID: RESET to new UUID
                          type GameCharacter struct {
                          EntityID       string
                          Name           string
                          CharacterClass string
                          Level          int
                          Health         int
                          Mana           int
                          Skills         map[string]int
                          Inventory      []string
                          Equipment      Equipment
                          Position       Position
                          loadedAssets   *Assets // Shared between clones (immutable)
                          }

                          type Equipment struct {
                          Weapon    string
                          Armor     string
                          Accessory string
                          }

                          type Position struct {
                          X, Y, Z float64
                          }

                          type Assets struct {
                          Model      string
                          Texture    string
                          Animations string
                          }

                          // NewGameCharacter creates a new character with loaded assets.
                          func NewGameCharacter(name, class string) *GameCharacter {
                          c := &GameCharacter{
                          EntityID:       uuid.New().String(),
                          Name:           name,
                          CharacterClass: class,
                          Level:          1,
                          Health:         100,
                          Mana:           50,
                          Skills:         make(map[string]int),
                          Inventory:      make([]string, 0),
                          Position:       Position{X: 0, Y: 0, Z: 0},
                          }
                          // Simulate expensive asset loading
                          c.loadedAssets = c.loadAssets()
                          return c
                          }

                          func (c *GameCharacter) loadAssets() *Assets {
                          // In production: load 3D models, textures, animations
                          return &Assets{
                          Model:      fmt.Sprintf("%s_model.fbx", c.CharacterClass),
                          Texture:    fmt.Sprintf("%s_texture.png", c.CharacterClass),
                          Animations: fmt.Sprintf("%s_anims.dat", c.CharacterClass),
                          }
                          }

                          // Clone creates a copy with deep-copied mutable state and shared assets.
                          func (c *GameCharacter) Clone() Prototype {
                          clone := &GameCharacter{
                          EntityID:       uuid.New().String(), // New ID
                          Name:           c.Name,
                          CharacterClass: c.CharacterClass,
                          Level:          c.Level,
                          Health:         c.Health,
                          Mana:           c.Mana,
                          Equipment:      c.Equipment, // Struct copied by value
                          Position:       Position{X: 0, Y: 0, Z: 0}, // Reset spawn
                          loadedAssets:   c.loadedAssets, // SHARED - immutable
                          }

                          // Deep copy skills map
                          clone.Skills = make(map[string]int, len(c.Skills))
                          for k, v := range c.Skills {
                          clone.Skills[k] = v
                          }

                          // Deep copy inventory slice
                          clone.Inventory = make([]string, len(c.Inventory))
                          copy(clone.Inventory, c.Inventory)

                          return clone
                          }

                          // PrototypeRegistry manages named prototypes with thread-safe operations.
                          type PrototypeRegistry struct {
                          prototypes map[string]Prototype
                          factories  map[string]func() Prototype
                          parent     *PrototypeRegistry
                          mu         sync.RWMutex
                          }

                          // NewPrototypeRegistry creates a new registry, optionally with a parent.
                          func NewPrototypeRegistry(parent *PrototypeRegistry) *PrototypeRegistry {
                          return &PrototypeRegistry{
                          prototypes: make(map[string]Prototype),
                          factories:  make(map[string]func() Prototype),
                          parent:     parent,
                          }
                          }

                          // Register adds a prototype instance to the registry.
                          func (r *PrototypeRegistry) Register(name string, prototype Prototype) {
                          r.mu.Lock()
                          defer r.mu.Unlock()
                          r.prototypes[name] = prototype
                          delete(r.factories, name)
                          }

                          // RegisterLazy adds a factory for lazy prototype initialization.
                          func (r *PrototypeRegistry) RegisterLazy(name string, factory func() Prototype) {
                          r.mu.Lock()
                          defer r.mu.Unlock()
                          r.factories[name] = factory
                          }

                          // Clone creates a copy of a named prototype.
                          func (r *PrototypeRegistry) Clone(name string) (Prototype, error) {
                          r.mu.Lock()
                          defer r.mu.Unlock()

                          // Check local prototypes
                          if proto, ok := r.prototypes[name]; ok {
                          return proto.Clone(), nil
                          }

                          // Check lazy factories
                          if factory, ok := r.factories[name]; ok {
                          r.prototypes[name] = factory()
                          delete(r.factories, name)
                          return r.prototypes[name].Clone(), nil
                          }

                          // Try parent
                          if r.parent != nil {
                          return r.parent.Clone(name)
                          }

                          return nil, fmt.Errorf("prototype '%s' not found", name)
                          }

                          // List returns all available prototype names.
                          func (r *PrototypeRegistry) List() []string {
                          r.mu.RLock()
                          defer r.mu.RUnlock()

                          names := make(map[string]bool)
                          for name := range r.prototypes {
                          names[name] = true
                          }
                          for name := range r.factories {
                          names[name] = true
                          }
                          if r.parent != nil {
                          for _, name := range r.parent.List() {
                          names[name] = true
                          }
                          }

                          result := make([]string, 0, len(names))
                          for name := range names {
                          result = append(result, name)
                          }
                          return result
                          }

                          // VersionedPrototypeRegistry supports multiple versions of prototypes.
                          type VersionedPrototypeRegistry struct {
                          versions map[string]map[string]Prototype
                          latest   map[string]string
                          mu       sync.RWMutex
                          }

                          // NewVersionedPrototypeRegistry creates a versioned registry.
                          func NewVersionedPrototypeRegistry() *VersionedPrototypeRegistry {
                          return &VersionedPrototypeRegistry{
                          versions: make(map[string]map[string]Prototype),
                          latest:   make(map[string]string),
                          }
                          }

                          // Register adds a versioned prototype.
                          func (r *VersionedPrototypeRegistry) Register(name, version string, proto Prototype, isLatest bool) {
                          r.mu.Lock()
                          defer r.mu.Unlock()

                          if _, ok := r.versions[name]; !ok {
                          r.versions[name] = make(map[string]Prototype)
                          }
                          r.versions[name][version] = proto

                          if isLatest || r.latest[name] == "" {
                          r.latest[name] = version
                          }
                          }

                          // Clone creates a copy, optionally from a specific version.
                          func (r *VersionedPrototypeRegistry) Clone(name string, version string) (Prototype, error) {
                          r.mu.RLock()
                          defer r.mu.RUnlock()

                          if version == "" {
                          version = r.latest[name]
                          if version == "" {
                          return nil, fmt.Errorf("no versions for '%s'", name)
                          }
                          }

                          versions, ok := r.versions[name]
                          if !ok {
                          return nil, fmt.Errorf("prototype '%s' not found", name)
                          }

                          proto, ok := versions[version]
                          if !ok {
                          return nil, fmt.Errorf("version '%s' not found for '%s'", version, name)
                          }

                          return proto.Clone(), nil
                          }

                          func main() {
                          fmt.Println("============================================================")
                          fmt.Println("PROTOTYPE PATTERN - GO IMPLEMENTATION")
                          fmt.Println("============================================================")

                          // === Document Cloning ===
                          fmt.Println("\n--- Document Cloning ---")

                          original := NewDocument("Quarterly Report Template")
                          original.Metadata["department"] = "Engineering"
                          original.Metadata["confidential"] = "true"
                          original.AddSection("Executive Summary", "[Summary placeholder]")
                          original.AddSection("Metrics", "[Metrics placeholder]")
                          original.Formatting.Font = "Times New Roman"

                          fmt.Printf("Original: ID=%s..., Title=%s, Sections=%d\n",
                          original.ID[:8], original.Title, len(original.Sections))

                          // Clone and customize
                          cloned := original.Clone().(*Document)
                          cloned.Title = "Q4 2024 Engineering Report"
                          cloned.Sections[0].Content = "Q4 results exceeded expectations..."

                          fmt.Printf("Clone: ID=%s..., Title=%s, Sections=%d\n",
                          cloned.ID[:8], cloned.Title, len(cloned.Sections))
                          fmt.Printf("Independent IDs: %v\n", original.ID != cloned.ID)
                          fmt.Printf("Independent sections: %v\n",
                          original.Sections[0].Content != cloned.Sections[0].Content)

                          // === Game Character Cloning ===
                          fmt.Println("\n--- Game Character Cloning ---")

                          warriorTemplate := NewGameCharacter("Warrior Template", "Warrior")
                          warriorTemplate.Skills["slash"] = 10
                          warriorTemplate.Skills["block"] = 8
                          warriorTemplate.Inventory = []string{"iron_sword", "leather_armor"}
                          warriorTemplate.Equipment.Weapon = "Iron Sword"

                          fmt.Printf("Template: %s (%s), Skills: %v\n",
                          warriorTemplate.Name, warriorTemplate.CharacterClass, warriorTemplate.Skills)

                          player1 := warriorTemplate.Clone().(*GameCharacter)
                          player1.Name = "Thorin"
                          player1.Position = Position{X: 10, Y: 0, Z: 5}

                          player2 := warriorTemplate.Clone().(*GameCharacter)
                          player2.Name = "Gimli"
                          player2.Skills["slash"] = 15
                          player2.Inventory = append(player2.Inventory, "throwing_axe")

                          fmt.Printf("Player1: %s, Skills: %v, Pos: %v\n", player1.Name, player1.Skills, player1.Position)
                          fmt.Printf("Player2: %s, Skills: %v, Inventory: %v\n", player2.Name, player2.Skills, player2.Inventory)
                          fmt.Printf("Template unchanged: skills[slash]=%d, inventory=%v\n",
                          warriorTemplate.Skills["slash"], warriorTemplate.Inventory)
                          fmt.Printf("Shared assets (memory opt): %v\n",
                          player1.loadedAssets == player2.loadedAssets)

                          // === Prototype Registry ===
                          fmt.Println("\n--- Prototype Registry ---")

                          registry := NewPrototypeRegistry(nil)
                          registry.Register("report", original)
                          registry.Register("warrior", warriorTemplate)
                          registry.RegisterLazy("mage", func() Prototype {
                          return NewGameCharacter("Mage Template", "Mage")
                          })

                          fmt.Printf("Available: %v\n", registry.List())

                          newReport, _ := registry.Clone("report")
                          newWarrior, _ := registry.Clone("warrior")
                          newMage, _ := registry.Clone("mage")

                          fmt.Printf("Cloned report: %s\n", newReport.(*Document).Title)
                          fmt.Printf("Cloned warrior: %s\n", newWarrior.(*GameCharacter).Name)
                          fmt.Printf("Cloned mage: %s\n", newMage.(*GameCharacter).Name)

                          // === Versioned Registry ===
                          fmt.Println("\n--- Versioned Prototype Registry ---")

                          versioned := NewVersionedPrototypeRegistry()

                          v1Doc := NewDocument("Report v1")
                          v1Doc.Metadata["version"] = "1.0"
                          versioned.Register("report", "1.0", v1Doc, false)

                          v2Doc := NewDocument("Report v2")
                          v2Doc.Metadata["version"] = "2.0"
                          v2Doc.AddSection("Charts", "[Charts section]")
                          versioned.Register("report", "2.0", v2Doc, true)

                          v1Clone, _ := versioned.Clone("report", "1.0")
                          latestClone, _ := versioned.Clone("report", "")

                          fmt.Printf("v1 clone sections: %d\n", len(v1Clone.(*Document).Sections))
                          fmt.Printf("Latest clone sections: %d\n", len(latestClone.(*Document).Sections))

                          fmt.Println("\n============================================================")
                          fmt.Println("DEMONSTRATION COMPLETE")
                          fmt.Println("============================================================")
                          }
                          ```

                          ---

                          ## Quick Reference

                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                            <h4 style="color: #1e293b; margin-top: 0;">Pattern Summary</h4>

                            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                              <tr style="background: #e2e8f0;">
                                <td style="padding: 12px; font-weight: 600; border: 1px solid #cbd5e1;">Aspect</td>
                                <td style="padding: 12px; font-weight: 600; border: 1px solid #cbd5e1;">Details</td>
                              </tr>
                              <tr>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Type</strong></td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">Creational</td>
                              </tr>
                              <tr style="background: #f8fafc;">
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Intent</strong></td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">Create objects by cloning existing instances</td>
                              </tr>
                              <tr>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Key Mechanism</strong></td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">Polymorphic clone() method with deep/shallow copy semantics</td>
                              </tr>
                              <tr style="background: #f8fafc;">
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Use When</strong></td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">Object construction is expensive; runtime type flexibility needed; many similar configurations required</td>
                              </tr>
                              <tr>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Avoid When</strong></td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">Simple construction; objects contain non-cloneable resources; deep copy exceeds construction cost</td>
                              </tr>
                            </table>
                          </div>

                          ### Decision Matrix: Clone Strategy Selection

                          | Scenario | Recommended Approach |
                          |----------|---------------------|
                          | All fields immutable | Shallow copy sufficient |
                          | Mutable nested objects | Deep copy required |
                          | External resources (DB, files) | Share reference or null + lazy init |
                          | Large object graphs, rare mutations | Copy-on-write |
                          | High-frequency cloning, memory constraints | Object pool instead of prototype |
                          | Identity fields (IDs, timestamps) | Always reset in clone |
                          | Observer/callback lists | Clear in clone, re-register explicitly |

                          ### Implementation Checklist

                          - [ ] Define clone interface with clear contract documentation
                          - [ ] Decide shallow vs deep copy per field and document
                          - [ ] Handle circular references with memo-based copying
                          - [ ] Reset identity fields (UUIDs, timestamps)
                          - [ ] Clear transient state (observers, caches)
                          - [ ] Handle non-cloneable resources explicitly
                          - [ ] Consider thread safety for registry operations
                          - [ ] Test clone independence (mutations don't affect original)
                          - [ ] Consider copy-on-write for memory optimization
                          - [ ] Avoid Java Cloneable; use copy constructors instead

                          ---

                          ## Related Patterns

                          - [[Factory Method]](/topic/design-patterns/factory-method) - Alternative creation approach; use Factory when construction logic is complex, Prototype when configuration is complex
                          - [[Abstract Factory]](/topic/design-patterns/abstract-factory) - Can use prototypes internally to create product families
                          - [[Builder]](/topic/design-patterns/builder) - Use toBuilder() pattern for immutable objects that need "modified copies"
                          - [[Singleton]](/topic/design-patterns/singleton) - Opposite intent: single instance vs multiple copies
                          - [[Memento]](/topic/design-patterns/memento) - Uses similar cloning mechanism for state snapshots
                          - [[Flyweight]](/topic/design-patterns/flyweight) - Alternative for memory optimization through sharing intrinsic state
                          - [[Object Pool]](/topic/design-patterns/object-pool) - Alternative when recycling is better than cloning
