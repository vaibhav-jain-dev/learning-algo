# Abstract Factory Pattern

## Overview

The Abstract Factory pattern provides an interface for creating **families of related or dependent objects** without specifying their concrete classes. Unlike [[Factory Method]](/topics/design-patterns/factory-method) which creates a single product, Abstract Factory orchestrates the creation of multiple products that must work together coherently.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border: 2px solid #e2e8f0;">
  <h4 style="margin: 0 0 12px 0; color: #1e40af;">Core Insight</h4>
  <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569;">
    Abstract Factory enforces a <strong>product family constraint</strong>: all products created by a single factory instance are guaranteed to be compatible. This is the pattern's defining characteristic and primary value proposition.
  </p>
</div>

**The fundamental problem it solves**: When your system needs to create objects that belong together (a "family"), and mixing objects from different families would cause subtle bugs or visual inconsistencies, you need a mechanism to guarantee family coherence at the architectural level.

---

## Section 1: Factory Families - The Core Abstraction

### 1.1 What Constitutes a Factory Family

A **factory family** consists of:
1. A **product family** - A set of related objects designed to work together
2. A **concrete factory** - The class responsible for creating all products in that family
3. An **invariant** - The guarantee that all products from one factory are mutually compatible

<div style="background: #fefce8; border-left: 4px solid #eab308; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
  <h4 style="margin: 0 0 8px 0; color: #a16207;">Key Assumption</h4>
  <p style="margin: 0; color: #713f12; font-size: 14px;">
    The pattern assumes that <strong>all products within a family share enough common interface</strong> that they can be substituted for products from another family. If MacButton and WindowsButton have fundamentally different behaviors (not just appearance), the abstraction breaks down.
  </p>
</div>

### 1.2 The Family Invariant Deep Dive

The family invariant is enforced through **construction-time binding**, not runtime checks:

```python
class UIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: ...

    @abstractmethod
    def create_scrollbar(self) -> Scrollbar: ...

    # The invariant: if you call both methods on the same instance,
    # the returned objects are GUARANTEED compatible
```

**Internal mechanism**: The concrete factory holds the "family identity" as implicit state. When `MacFactory.create_button()` is called, the method's implementation (not runtime configuration) determines the product type.

### 1.3 Family Consistency vs. Product Consistency

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0;">
  <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 10px; padding: 16px;">
    <h5 style="margin: 0 0 8px 0; color: #166534;">Family Consistency (Abstract Factory)</h5>
    <p style="margin: 0; font-size: 13px; color: #15803d;">
      All products created by MacFactory work together. All products created by WindowsFactory work together. You cannot mix.
    </p>
  </div>
  <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 10px; padding: 16px;">
    <h5 style="margin: 0 0 8px 0; color: #991b1b;">Product Consistency (Factory Method)</h5>
    <p style="margin: 0; font-size: 13px; color: #b91c1c;">
      Each factory method creates one product type. No guarantee about relationships between different products.
    </p>
  </div>
</div>

### Interview Questions: Factory Families (3 Levels Deep)

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">

  **Level 1: "What is a factory family and why does it matter?"**

  > A factory family is a set of related products designed to work together, created by a single concrete factory. It matters because it prevents incompatibility bugs - like trying to use a Windows scrollbar rendering callback with a Mac button event system. The factory guarantees coherence by construction.

  **Level 2: "How does Abstract Factory enforce family consistency, and what happens if a developer circumvents it?"**

  > Enforcement is structural, not runtime: the concrete factory class itself embodies the family identity. A developer could circumvent it by:
  > 1. Storing products in variables typed to concrete classes and mixing them
  > 2. Using multiple factory instances from different families in the same context
  > 3. Casting abstract products to concrete types and directly instantiating others
  >
  > Circumvention leads to subtle bugs: mismatched event systems, incompatible rendering pipelines, or memory layout mismatches in low-level systems. Prevention requires discipline (code reviews) or language-level help (Rust's type system can encode family membership).

  **Level 3: "Design a type system that makes family mixing a compile-time error. What are the trade-offs of different approaches?"**

  > **Approach 1: Phantom Types**
  > ```typescript
  > type Button<Family> = { render(): void; __family: Family };
    > type MacFamily = { readonly brand: 'mac' };
    > type WinFamily = { readonly brand: 'win' };
    >
    > function createDialog<F>(btn: Button<F>, scroll: Scrollbar<F>) { ... }
          > // Mixing families is now a type error
          > ```
          > Trade-off: Requires generic propagation throughout the codebase; verbose.
          >
          > **Approach 2: Module-level Isolation**
          > Each family is a separate module with internal concrete types, exporting only through a unified interface.
          > Trade-off: Duplicated interface definitions; harder to add new families.
          >
          > **Approach 3: Dependent Types (Idris, Agda)**
          > Family membership encoded as a type-level proof term.
          > Trade-off: Extreme complexity; not practical for most production systems.
          >
          > The pragmatic solution for most systems is Approach 1 combined with [[Dependency Injection]](/topics/design-patterns/dependency-injection) to ensure factory consistency at the composition root.

        </div>

        ---

        ## Section 2: UI Toolkit Example - The Canonical Use Case

        ### 2.1 Why UI Toolkits Are the Perfect Example

        UI toolkits demonstrate Abstract Factory's value because:

        1. **Visual coherence is immediately observable** - A Windows button in a Mac app looks wrong
        2. **Event systems are tightly coupled** - Mac uses responder chains; Windows uses message loops
        3. **Rendering pipelines differ** - DirectX vs. Metal vs. OpenGL backends
        4. **Accessibility APIs vary** - Screen readers expect platform-specific semantics

        ### 2.2 Anatomy of a Cross-Platform UI Factory

        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 20px 0;">
          <h4 style="color: #334155; margin: 0 0 20px 0; text-align: center;">Cross-Platform UI Factory Architecture</h4>

          <div style="display: flex; flex-direction: column; gap: 20px;">

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px 20px; text-align: center;">
                <div style="font-weight: 700; color: #1e40af; font-size: 14px;">WidgetFactory</div>
                <div style="font-size: 11px; color: #3b82f6; margin-top: 4px;">interface</div>
                <div style="font-family: monospace; font-size: 11px; color: #1e3a5f; margin-top: 8px; text-align: left;">
                  +createButton()<br/>
                  +createScrollbar()<br/>
                  +createTextInput()<br/>
                  +createMenu()<br/>
                  +getEventLoop()
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: center;">
              <div style="color: #64748b; font-size: 12px;">implements</div>
            </div>

            <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
              <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 140px;">
                <div style="font-weight: 600; color: #166534; font-size: 13px;">MacWidgetFactory</div>
                <div style="font-size: 10px; color: #15803d; margin-top: 4px;">Cocoa/AppKit backend</div>
              </div>
              <div style="background: #e0e7ff; border: 2px solid #6366f1; border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 140px;">
                <div style="font-weight: 600; color: #3730a3; font-size: 13px;">WinWidgetFactory</div>
                <div style="font-size: 10px; color: #4338ca; margin-top: 4px;">Win32/WinRT backend</div>
              </div>
              <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 140px;">
                <div style="font-weight: 600; color: #92400e; font-size: 13px;">LinuxWidgetFactory</div>
                <div style="font-size: 10px; color: #b45309; margin-top: 4px;">GTK/Qt backend</div>
              </div>
            </div>

            <div style="border-top: 2px dashed #cbd5e1; padding-top: 16px; margin-top: 8px;">
              <div style="text-align: center; color: #64748b; font-size: 12px; margin-bottom: 12px;">Each factory creates a complete, coherent product family</div>
              <div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
                <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 4px; padding: 6px 10px; font-size: 11px; color: #166534;">MacButton</div>
                <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 4px; padding: 6px 10px; font-size: 11px; color: #166534;">MacScrollbar</div>
                <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 4px; padding: 6px 10px; font-size: 11px; color: #166534;">MacEventLoop</div>
                <div style="background: #eef2ff; border: 1px solid #a5b4fc; border-radius: 4px; padding: 6px 10px; font-size: 11px; color: #3730a3;">WinButton</div>
                <div style="background: #eef2ff; border: 1px solid #a5b4fc; border-radius: 4px; padding: 6px 10px; font-size: 11px; color: #3730a3;">WinScrollbar</div>
                <div style="background: #eef2ff; border: 1px solid #a5b4fc; border-radius: 4px; padding: 6px 10px; font-size: 11px; color: #3730a3;">WinEventLoop</div>
              </div>
            </div>
          </div>
        </div>

        ### 2.3 Hidden Complexity: Event System Coupling

        The most underappreciated aspect of UI Abstract Factories is **event system coupling**:

        ```python
        class Button(ABC):
        @abstractmethod
        def on_click(self, handler: Callable[['ClickEvent'], None]) -> None:
        """Register click handler.

        CRITICAL: The ClickEvent type varies by platform!
        - Mac: contains responder chain info, gesture recognizer state
        - Windows: contains HWND, message ID, WPARAM, LPARAM
        - Linux/GTK: contains GdkEvent pointer, widget hierarchy

        The abstract Button hides this, but the factory must ensure
        the event loop that dispatches events understands the event format.
        """
        pass
        ```

        <div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #991b1b;">Edge Case: Mixed Event Systems</h4>
          <p style="margin: 0; color: #7f1d1d; font-size: 14px;">
            If you create a MacButton but run it with a Windows event loop, the button will never receive click events. The event loop doesn't know how to translate Windows messages into Mac responder chain calls. <strong>This is why the factory must also provide the event loop</strong> - it's part of the family.
          </p>
        </div>

        ### 2.4 Real Implementation: Java Swing's Pluggable Look and Feel

        ```java
        // Java's UIManager is an Abstract Factory in disguise
        UIManager.setLookAndFeel("javax.swing.plaf.metal.MetalLookAndFeel");

        // Under the hood:
        // 1. MetalLookAndFeel is a factory that provides:
        //    - MetalButtonUI (how buttons render)
        //    - MetalScrollBarUI (how scrollbars render)
        //    - MetalTreeUI (how trees render)
        //    - ... 50+ UI delegate classes

        // The factory creates ComponentUI instances:
        public abstract class LookAndFeel {
        // Factory methods for each component type
        public abstract ButtonUI getButtonUI(JButton b);
        public abstract ScrollBarUI getScrollBarUI(JScrollBar sb);
        // ... etc
        }
        ```

        **Why Swing's approach is interesting**: The UI delegates are created lazily and cached. The factory doesn't create widgets; it creates *renderers* for widgets. This is a variant called **Abstract Factory with Flyweight**.

        ### Interview Questions: UI Toolkit (3 Levels Deep)

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">

          **Level 1: "Why is UI toolkit development a canonical example of Abstract Factory?"**

          > UI toolkits need to create multiple related components (buttons, scrollbars, text inputs) that must be visually and behaviorally consistent. A Mac button must work with Mac menus and Mac event handling. Abstract Factory guarantees this by making the platform choice a single decision point that affects all component creation.

          **Level 2: "Beyond visual consistency, what other 'hidden' products must a UI factory family include?"**

          > A complete UI factory family includes:
          > 1. **Event loop/message pump** - Platform-specific event dispatching
          > 2. **Accessibility provider** - Screen reader integration (AT-SPI on Linux, MSAA/UIA on Windows, NSAccessibility on Mac)
          > 3. **Clipboard handler** - Platform clipboard formats differ
          > 4. **Drag-and-drop coordinator** - Drop target/source protocols vary
          > 5. **Font rasterizer** - ClearType vs. FreeType vs. Core Text
          > 6. **Input method editor** - IME integration for CJK languages
          > 7. **Theme provider** - System theme colors, dark mode detection
          >
          > Missing any of these creates subtle bugs: text looks wrong, accessibility doesn't work, copy-paste fails for certain data types.

          **Level 3: "Design a UI factory that supports runtime theme switching without recreating all widgets. What patterns would you combine with Abstract Factory?"**

          > Runtime theme switching requires separating **widget identity** from **widget appearance**:
          >
          > **Solution: Abstract Factory + [[Strategy]](/topics/design-patterns/strategy) + [[Observer]](/topics/design-patterns/observer)**
          >
          > ```python
          > class Button:
          >     def __init__(self, renderer: ButtonRenderer, theme_manager: ThemeManager):
          >         self.renderer = renderer
          >         theme_manager.subscribe(self._on_theme_change)
          >
          >     def _on_theme_change(self, new_theme: Theme):
          >         # Get new renderer from current factory
          >         self.renderer = new_theme.factory.create_button_renderer()
          >         self.invalidate()  # Trigger repaint
          >
          > class ThemeManager:
          >     def switch_theme(self, new_factory: WidgetFactory):
          >         self.current_factory = new_factory
          >         self.notify_subscribers(Theme(new_factory))
          > ```
          >
          > **Trade-offs**:
          > - Memory: Each widget holds a reference to its renderer (slight overhead)
          > - Complexity: Two-layer abstraction (widget + renderer) is harder to understand
          > - Performance: Theme switch triggers O(n) updates for n widgets
          > - Consistency: Brief visual inconsistency during transition if not batched
          >
          > **Alternative**: Use [[Flyweight]](/topics/design-patterns/flyweight) for shared rendering state, reducing memory overhead.

        </div>

        ---

        ## Section 3: Cross-Platform Development - Beyond UI

        ### 3.1 Platform Abstraction Layers

        Abstract Factory excels at creating **Platform Abstraction Layers (PALs)**:

        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 20px 0;">
          <h4 style="color: #334155; margin: 0 0 20px 0; text-align: center;">Platform Abstraction Layer Architecture</h4>

          <div style="display: flex; flex-direction: column; gap: 16px;">

            <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px; text-align: center;">
              <div style="font-weight: 700; color: #92400e;">Application Layer</div>
              <div style="font-size: 12px; color: #b45309;">Business logic - uses only abstract interfaces</div>
            </div>

            <div style="display: flex; justify-content: center;">
              <div style="width: 2px; height: 20px; background: #94a3b8;"></div>
            </div>

            <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px; text-align: center;">
              <div style="font-weight: 700; color: #1e40af;">PlatformFactory Interface</div>
              <div style="font-size: 12px; color: #3b82f6; margin-top: 8px;">
                createFileSystem() | createNetwork() | createThreading() | createGraphics()
              </div>
            </div>

            <div style="display: flex; justify-content: center;">
              <div style="width: 2px; height: 20px; background: #94a3b8;"></div>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 12px 16px; text-align: center; flex: 1; min-width: 120px; max-width: 160px;">
                <div style="font-weight: 600; color: #166534; font-size: 13px;">POSIXFactory</div>
                <div style="font-size: 10px; color: #15803d;">Linux, macOS, BSD</div>
              </div>
              <div style="background: #e0e7ff; border: 2px solid #6366f1; border-radius: 8px; padding: 12px 16px; text-align: center; flex: 1; min-width: 120px; max-width: 160px;">
                <div style="font-weight: 600; color: #3730a3; font-size: 13px;">Win32Factory</div>
                <div style="font-size: 10px; color: #4338ca;">Windows desktop</div>
              </div>
              <div style="background: #fce7f3; border: 2px solid #ec4899; border-radius: 8px; padding: 12px 16px; text-align: center; flex: 1; min-width: 120px; max-width: 160px;">
                <div style="font-weight: 600; color: #9d174d; font-size: 13px;">WebFactory</div>
                <div style="font-size: 10px; color: #be185d;">Browser/WASM</div>
              </div>
              <div style="background: #fef9c3; border: 2px solid #facc15; border-radius: 8px; padding: 12px 16px; text-align: center; flex: 1; min-width: 120px; max-width: 160px;">
                <div style="font-weight: 600; color: #854d0e; font-size: 13px;">EmbeddedFactory</div>
                <div style="font-size: 10px; color: #a16207;">RTOS, bare metal</div>
              </div>
            </div>

          </div>
        </div>

        ### 3.2 The Cross-Cutting Concerns Problem

        A subtle issue arises when products have **cross-cutting dependencies**:

        ```python
        class PlatformFactory(ABC):
        @abstractmethod
        def create_file_system(self) -> FileSystem: ...

        @abstractmethod
        def create_network(self) -> Network: ...

        @abstractmethod
        def create_logger(self) -> Logger: ...

        # Problem: Logger might need FileSystem for file logging
        # AND Network for remote logging. But these are created separately!

        class WindowsFactory(PlatformFactory):
        def create_logger(self) -> Logger:
        # Option 1: Logger creates its own dependencies (breaks DI)
        # Option 2: Logger takes FileSystem and Network (circular!)
        # Option 3: Use a service locator (anti-pattern?)
        pass
        ```

        <div style="background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #1e40af;">Design Choice: Factory as Service Locator</h4>
          <p style="margin: 0; color: #1e3a5f; font-size: 14px;">
            One solution is to make the factory itself a parameter to product constructors. The logger receives the factory and lazily retrieves dependencies. This is controversial - it resembles Service Locator, which hides dependencies. The trade-off is explicit: cross-cutting concerns require either dependency hiding or complex initialization ordering.
          </p>
        </div>

        ### 3.3 Conditional Compilation vs. Abstract Factory

        Many cross-platform codebases use **conditional compilation** instead of Abstract Factory:

        ```cpp
        // Conditional compilation approach
        #ifdef _WIN32
        #include "windows_impl.h"
        using FileSystem = WindowsFileSystem;
        #elif __APPLE__
        #include "mac_impl.h"
        using FileSystem = MacFileSystem;
        #else
        #include "linux_impl.h"
        using FileSystem = LinuxFileSystem;
        #endif
        ```

        **Trade-off analysis**:

        | Aspect | Abstract Factory | Conditional Compilation |
        |--------|------------------|------------------------|
        | Runtime switching | Yes | No (compile-time only) |
        | Binary size | Larger (all platforms) | Smaller (one platform) |
        | Testing | Mock factory injection | Requires target platform |
        | Complexity | Higher abstraction overhead | Lower, but scattered |
        | Link-time dependencies | All platforms linked | Only active platform |

        ### 3.4 Cloud Provider Abstraction (Real-World Case Study)

        ```python
        class CloudInfrastructureFactory(ABC):
        """Abstract factory for multi-cloud deployments."""

        @abstractmethod
        def create_compute(self) -> ComputeService:
        """Create VM/container service."""
        pass

        @abstractmethod
        def create_storage(self) -> StorageService:
        """Create object storage service."""
        pass

        @abstractmethod
        def create_database(self) -> DatabaseService:
        """Create managed database service."""
        pass

        @abstractmethod
        def create_queue(self) -> QueueService:
        """Create message queue service."""
        pass

        @abstractmethod
        def create_identity(self) -> IdentityService:
        """Create IAM/identity service."""
        pass

        class AWSFactory(CloudInfrastructureFactory):
        def __init__(self, region: str, credentials: AWSCredentials):
        self.region = region
        self.credentials = credentials
        self._session = None  # Lazy initialization

        def create_compute(self) -> ComputeService:
        return EC2Service(self._get_session())

        def create_storage(self) -> StorageService:
        return S3Service(self._get_session())

        def create_database(self) -> DatabaseService:
        return RDSService(self._get_session())

        def create_queue(self) -> QueueService:
        return SQSService(self._get_session())

        def create_identity(self) -> IdentityService:
        return IAMService(self._get_session())

        def _get_session(self):
        if self._session is None:
        self._session = boto3.Session(
        region_name=self.region,
        **self.credentials.to_dict()
        )
        return self._session

        class GCPFactory(CloudInfrastructureFactory):
        # Similar implementation for Google Cloud
        pass

        class AzureFactory(CloudInfrastructureFactory):
        # Similar implementation for Azure
        pass
        ```

        <div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #991b1b;">Real-World Edge Case: Service Parity</h4>
          <p style="margin: 0; color: #7f1d1d; font-size: 14px;">
            Cloud providers don't have perfect feature parity. AWS Lambda has different cold start characteristics than Azure Functions. S3 has eventual consistency properties that GCS doesn't. <strong>The abstraction leaks</strong>. Solutions: 1) Lowest common denominator API, 2) Provider-specific extension interfaces, 3) Feature flags in the abstract interface.
          </p>
        </div>

        ### Interview Questions: Cross-Platform Development (3 Levels Deep)

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">

          **Level 1: "How does Abstract Factory help with cross-platform development?"**

          > Abstract Factory creates a single abstraction point for platform differences. Application code depends only on abstract interfaces (FileSystem, Network, etc.), and a platform-specific factory provides concrete implementations. Switching platforms means changing only the factory instantiation, not the application logic.

          **Level 2: "What happens when platforms have fundamentally different capabilities? How do you handle the 'leaky abstraction' problem?"**

          > Platform capability gaps create leaky abstractions. Solutions:
          >
          > 1. **Lowest Common Denominator**: Define the interface as the intersection of all platforms. Simple but limits functionality.
          >
          > 2. **Capability Query**: Add `supports_feature(feature: str) -> bool` to products. Application code checks before using advanced features.
          >
          > 3. **Optional Interfaces**: Use interface segregation - `StorageService` vs `VersionedStorageService`. Only implement advanced interfaces on capable platforms.
          >
          > 4. **Adapter + Emulation**: Emulate missing features. Example: Emulate S3's eventual consistency model on GCS by adding artificial delays in the adapter.
          >
          > 5. **Fail-Fast with Clear Error**: Throw `NotSupportedOnPlatform` with guidance on alternatives.
          >
          > The choice depends on whether the feature is essential or optional. Essential features need emulation; optional ones need capability queries.

          **Level 3: "Design a multi-cloud factory system that handles: (a) partial failures during multi-service operations, (b) service version incompatibilities, and (c) live cloud provider migration without downtime."**

          > This requires combining Abstract Factory with several other patterns:
          >
          > **(a) Partial Failures - [[Saga Pattern]](/topics/system-design/saga)**:
          > ```python
          > class CloudTransactionFactory(CloudFactory):
          >     def create_provisioning_saga(self) -> ProvisioningSaga:
          >         return ProvisioningSaga(
          >             steps=[
          >                 self.create_compute,  # Step 1
          >                 self.create_storage,  # Step 2
          >                 self.create_database, # Step 3
          >             ],
          >             compensations=[
          >                 self._destroy_compute,
          >                 self._destroy_storage,
          >                 self._destroy_database,
          >             ]
          >         )
          > ```
          >
          > **(b) Version Incompatibilities - Factory Versioning**:
          > ```python
          > class CloudFactoryRegistry:
          >     def get_factory(self, provider: str, api_version: str) -> CloudFactory:
          >         # Returns factory compatible with specific API version
          >         # Internally maps to versioned implementations
          >         key = f"{provider}:{api_version}"
          >         return self._factories[key]
          > ```
          >
          > **(c) Live Migration - [[Blue-Green Deployment]](/topics/system-design/blue-green) + Dual-Write**:
          > ```python
          > class MigratingFactory(CloudFactory):
          >     def __init__(self, source: CloudFactory, target: CloudFactory,
          >                  migration_state: MigrationState):
          >         self.source = source
          >         self.target = target
          >         self.state = migration_state
          >
          >     def create_storage(self) -> StorageService:
          >         if self.state.phase == 'dual_write':
          >             return DualWriteStorage(
          >                 self.source.create_storage(),
          >                 self.target.create_storage()
          >             )
          >         elif self.state.phase == 'target_primary':
          >             return self.target.create_storage()
          >         else:
          >             return self.source.create_storage()
          > ```
          >
          > **Trade-offs**: Migration adds latency (dual writes), complexity (state machines), and cost (running two systems). The benefit is zero-downtime migration and ability to rollback.

        </div>

        ---

        ## Section 4: Factory Method vs Abstract Factory - Critical Distinctions

        ### 4.1 Structural Comparison

        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 20px 0;">
          <h4 style="color: #334155; margin: 0 0 20px 0; text-align: center;">Factory Method vs Abstract Factory</h4>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">

            <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 10px; padding: 16px;">
              <h5 style="color: #1e40af; margin: 0 0 12px 0; text-align: center;">Factory Method</h5>
              <div style="font-size: 13px; color: #1e3a5f;">
                <div style="margin-bottom: 8px;"><strong>Structure:</strong> Single method in a class</div>
                <div style="margin-bottom: 8px;"><strong>Creates:</strong> One product type</div>
                <div style="margin-bottom: 8px;"><strong>Extension:</strong> Subclass overrides method</div>
                <div style="margin-bottom: 8px;"><strong>Relationship:</strong> IS-A (inheritance)</div>
                <div style="background: #bfdbfe; padding: 8px; border-radius: 4px; margin-top: 12px;">
                  <code style="font-size: 11px;">
                    class Dialog:<br/>
                    &nbsp;&nbsp;def create_button(self) -> Button:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;return DefaultButton()
                  </code>
                </div>
              </div>
            </div>

            <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 10px; padding: 16px;">
              <h5 style="color: #166534; margin: 0 0 12px 0; text-align: center;">Abstract Factory</h5>
              <div style="font-size: 13px; color: #14532d;">
                <div style="margin-bottom: 8px;"><strong>Structure:</strong> Interface with multiple methods</div>
                <div style="margin-bottom: 8px;"><strong>Creates:</strong> Family of related products</div>
                <div style="margin-bottom: 8px;"><strong>Extension:</strong> New factory class</div>
                <div style="margin-bottom: 8px;"><strong>Relationship:</strong> HAS-A (composition)</div>
                <div style="background: #bbf7d0; padding: 8px; border-radius: 4px; margin-top: 12px;">
                  <code style="font-size: 11px;">
                    class WidgetFactory:<br/>
                    &nbsp;&nbsp;def create_button(self) -> Button<br/>
                    &nbsp;&nbsp;def create_scroll(self) -> Scrollbar<br/>
                    &nbsp;&nbsp;def create_menu(self) -> Menu
                  </code>
                </div>
              </div>
            </div>

          </div>
        </div>

        ### 4.2 When to Use Which

        <div style="background: #fefce8; border-left: 4px solid #eab308; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #a16207;">Decision Framework</h4>
          <div style="color: #713f12; font-size: 14px;">
            <p><strong>Use Factory Method when:</strong></p>
            <ul style="margin: 8px 0;">
              <li>You need to create ONE type of object with variations</li>
              <li>Subclasses should decide which class to instantiate</li>
              <li>You want to defer instantiation to derived classes</li>
            </ul>
            <p><strong>Use Abstract Factory when:</strong></p>
            <ul style="margin: 8px 0;">
              <li>You need to create MULTIPLE related objects that must work together</li>
              <li>System should be independent of how products are created</li>
              <li>You need to enforce family constraints (no mixing)</li>
            </ul>
          </div>
        </div>

        ### 4.3 The Composition Relationship

        Abstract Factory often **contains** Factory Methods:

        ```python
        class WidgetFactory(ABC):
        """Abstract Factory for UI widgets."""

        @abstractmethod
        def create_button(self) -> Button:
        """Factory Method for buttons."""
        pass

        @abstractmethod
        def create_scrollbar(self) -> Scrollbar:
        """Factory Method for scrollbars."""
        pass

        # Each abstract method IS a Factory Method
        # The collection of related Factory Methods IS an Abstract Factory
        ```

        ### 4.4 Evolution Path

        Systems often evolve from Factory Method to Abstract Factory:

        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 20px 0;">
          <h4 style="color: #334155; margin: 0 0 16px 0; text-align: center;">Pattern Evolution</h4>

          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">

            <div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 8px; padding: 12px 16px; text-align: center; flex: 1; min-width: 100px;">
              <div style="font-weight: 600; color: #475569; font-size: 12px;">Stage 1</div>
              <div style="font-size: 11px; color: #64748b;">Constructor</div>
              <div style="font-family: monospace; font-size: 10px; margin-top: 4px;">new Button()</div>
            </div>

            <div style="color: #94a3b8; font-size: 20px;">-></div>

            <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px 16px; text-align: center; flex: 1; min-width: 100px;">
              <div style="font-weight: 600; color: #1e40af; font-size: 12px;">Stage 2</div>
              <div style="font-size: 11px; color: #3b82f6;">Factory Method</div>
              <div style="font-family: monospace; font-size: 10px; margin-top: 4px;">createButton()</div>
            </div>

            <div style="color: #94a3b8; font-size: 20px;">-></div>

            <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 12px 16px; text-align: center; flex: 1; min-width: 100px;">
              <div style="font-weight: 600; color: #166534; font-size: 12px;">Stage 3</div>
              <div style="font-size: 11px; color: #15803d;">Abstract Factory</div>
              <div style="font-family: monospace; font-size: 10px; margin-top: 4px;">factory.createX()</div>
            </div>

          </div>

          <div style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #64748b; text-align: center;">
            Evolve when: single product becomes family, OR platform variations emerge
          </div>
        </div>

        ### 4.5 Anti-Pattern: Premature Abstract Factory

        <div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #991b1b;">Common Mistake: Over-Engineering</h4>
          <p style="margin: 0; color: #7f1d1d; font-size: 14px;">
            Creating an Abstract Factory when you only have one product family and no plans for more is over-engineering. The indirection adds complexity without benefit. <strong>YAGNI</strong> (You Aren't Gonna Need It) applies. Start with direct construction or Factory Method; refactor to Abstract Factory when the second family appears.
          </p>
        </div>

        ### Interview Questions: Factory Method vs Abstract Factory (3 Levels Deep)

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">

          **Level 1: "What is the key difference between Factory Method and Abstract Factory?"**

          > Factory Method creates ONE product through inheritance (subclass overrides a creation method). Abstract Factory creates a FAMILY of related products through composition (client holds a factory object). Factory Method is about deferring instantiation to subclasses; Abstract Factory is about enforcing family consistency.

          **Level 2: "Can you have an Abstract Factory that uses only one product? Would that be a valid use of the pattern?"**

          > Technically yes, but it's likely a design smell. If there's only one product, you lose the main benefit: family consistency guarantees. However, there are valid cases:
          >
          > 1. **Future-proofing**: You know more products are coming
          > 2. **Testing**: The factory interface enables mock injection even for one product
          > 3. **Configuration**: Factory encapsulates complex construction parameters
          >
          > But generally, single-product "Abstract Factories" should be Factory Methods. The pattern's essence is *families* - without multiple related products, the abstraction isn't pulling its weight.

          **Level 3: "Design a system that needs to switch between Factory Method and Abstract Factory at runtime based on configuration. What are the implications for your type system and client code?"**

          > This is a fascinating edge case requiring careful design:
          >
          > ```python
          > class ProductionStrategy(ABC):
          >     @abstractmethod
          >     def get_button(self, context: Context) -> Button:
          >         """May create new or return cached, family-aware or not."""
          >         pass
          >
          > class SimpleFactoryStrategy(ProductionStrategy):
          >     """Uses Factory Method - no family constraints."""
          >     def get_button(self, context: Context) -> Button:
          >         return context.create_button()  # Factory Method call
          >
          > class FamilyFactoryStrategy(ProductionStrategy):
          >     """Uses Abstract Factory - enforces family."""
          >     def __init__(self, factory: WidgetFactory):
          >         self.factory = factory
          >
          >     def get_button(self, context: Context) -> Button:
          >         return self.factory.create_button()  # Abstract Factory call
          >
          > class Application:
          >     def __init__(self, strategy: ProductionStrategy):
          >         self.strategy = strategy  # Injected based on config
          > ```
          >
          > **Implications**:
          >
          > 1. **Type System**: Both strategies must return the same abstract type (`Button`). The difference is in guarantees, not types.
          >
          > 2. **Family Safety**: When using `SimpleFactoryStrategy`, family mixing is possible. Client code can't assume safety.
          >
          > 3. **Capability Query**: Consider adding `strategy.guarantees_family_consistency() -> bool` so clients can adapt.
          >
          > 4. **Documentation**: The contract is behavioral, not structural. Must be clearly documented.
          >
          > 5. **Testing**: Each strategy needs separate test suites - one verifying family constraints, one verifying single-product flexibility.
          >
          > This pattern is useful in frameworks that serve both simple use cases (factory method sufficient) and complex multi-platform cases (abstract factory needed).

        </div>

        ---

        ## Section 5: Implementation Deep Dive

        ### 5.1 Python Implementation: Database Driver Factory

        ```python
        from abc import ABC, abstractmethod
        from typing import TypeVar, Generic, Any, Dict, List, Optional
        from dataclasses import dataclass
        from contextlib import contextmanager
        import threading

        # Type variable for family identification (phantom type technique)
        F = TypeVar('F', bound='FamilyMarker')

        class FamilyMarker:
        """Base class for phantom type markers."""
        pass

        class PostgresFamily(FamilyMarker):
        """Marker for PostgreSQL product family."""
        pass

        class MySQLFamily(FamilyMarker):
        """Marker for MySQL product family."""
        pass

        class SQLiteFamily(FamilyMarker):
        """Marker for SQLite product family."""
        pass

        # ============================================
        # ABSTRACT PRODUCTS
        # ============================================

        @dataclass
        class QueryResult:
        """Unified query result structure."""
        columns: List[str]
        rows: List[tuple]
        affected_rows: int
        last_insert_id: Optional[int]

        class Connection(ABC, Generic[F]):
        """Abstract connection product."""

        @abstractmethod
        def execute(self, sql: str, params: tuple = ()) -> QueryResult:
        """Execute SQL and return results."""
        pass

        @abstractmethod
        def begin_transaction(self) -> 'Transaction[F]':
        """Start a new transaction."""
        pass

        @abstractmethod
        def close(self) -> None:
        """Close the connection."""
        pass

        @abstractmethod
        def is_alive(self) -> bool:
        """Check if connection is still valid."""
        pass

        class Transaction(ABC, Generic[F]):
        """Abstract transaction product."""

        @abstractmethod
        def commit(self) -> None:
        """Commit the transaction."""
        pass

        @abstractmethod
        def rollback(self) -> None:
        """Rollback the transaction."""
        pass

        @abstractmethod
        def execute(self, sql: str, params: tuple = ()) -> QueryResult:
        """Execute within transaction."""
        pass

        @abstractmethod
        def savepoint(self, name: str) -> 'Savepoint[F]':
        """Create a savepoint within transaction."""
        pass

        class Savepoint(ABC, Generic[F]):
        """Abstract savepoint product - demonstrates nested family products."""

        @abstractmethod
        def release(self) -> None:
        """Release the savepoint."""
        pass

        @abstractmethod
        def rollback_to(self) -> None:
        """Rollback to this savepoint."""
        pass

        class ConnectionPool(ABC, Generic[F]):
        """Abstract connection pool product."""

        @abstractmethod
        def acquire(self) -> Connection[F]:
        """Acquire a connection from the pool."""
        pass

        @abstractmethod
        def release(self, conn: Connection[F]) -> None:
        """Release a connection back to the pool."""
        pass

        @abstractmethod
        def close_all(self) -> None:
        """Close all connections in the pool."""
        pass

        @contextmanager
        def connection(self):
        """Context manager for automatic release."""
        conn = self.acquire()
        try:
        yield conn
        finally:
        self.release(conn)

        class QueryBuilder(ABC, Generic[F]):
        """Abstract query builder - handles dialect differences."""

        @abstractmethod
        def select(self, *columns: str) -> 'QueryBuilder[F]':
        pass

        @abstractmethod
        def from_table(self, table: str) -> 'QueryBuilder[F]':
        pass

        @abstractmethod
        def where(self, condition: str, *params) -> 'QueryBuilder[F]':
        pass

        @abstractmethod
        def limit(self, n: int) -> 'QueryBuilder[F]':
        pass

        @abstractmethod
        def build(self) -> tuple[str, tuple]:
        """Return (sql, params) tuple."""
        pass

        # ============================================
        # POSTGRESQL FAMILY
        # ============================================

        class PostgresConnection(Connection[PostgresFamily]):
        """PostgreSQL connection implementation."""

        def __init__(self, host: str, port: int, database: str,
        user: str, password: str):
        self.host = host
        self.port = port
        self.database = database
        self._conn = None  # Would be psycopg2 connection
        self._closed = False
        # Simulate connection
        print(f"PostgreSQL: Connected to {host}:{port}/{database}")

        def execute(self, sql: str, params: tuple = ()) -> QueryResult:
        if self._closed:
        raise RuntimeError("Connection is closed")
        # PostgreSQL uses $1, $2 for placeholders
        print(f"PostgreSQL executing: {sql} with {params}")
        return QueryResult(columns=[], rows=[], affected_rows=0,
        last_insert_id=None)

        def begin_transaction(self) -> 'PostgresTransaction':
        return PostgresTransaction(self)

        def close(self) -> None:
        self._closed = True
        print("PostgreSQL: Connection closed")

        def is_alive(self) -> bool:
        return not self._closed

        class PostgresTransaction(Transaction[PostgresFamily]):
        """PostgreSQL transaction with MVCC semantics."""

        def __init__(self, conn: PostgresConnection):
        self.conn = conn
        self._active = True
        # PostgreSQL transaction isolation
        conn.execute("BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED")

        def commit(self) -> None:
        if not self._active:
        raise RuntimeError("Transaction already completed")
        self.conn.execute("COMMIT")
        self._active = False

        def rollback(self) -> None:
        if not self._active:
        raise RuntimeError("Transaction already completed")
        self.conn.execute("ROLLBACK")
        self._active = False

        def execute(self, sql: str, params: tuple = ()) -> QueryResult:
        if not self._active:
        raise RuntimeError("Transaction not active")
        return self.conn.execute(sql, params)

        def savepoint(self, name: str) -> 'PostgresSavepoint':
        self.conn.execute(f"SAVEPOINT {name}")
        return PostgresSavepoint(self, name)

        class PostgresSavepoint(Savepoint[PostgresFamily]):
        """PostgreSQL savepoint implementation."""

        def __init__(self, tx: PostgresTransaction, name: str):
        self.tx = tx
        self.name = name

        def release(self) -> None:
        self.tx.execute(f"RELEASE SAVEPOINT {self.name}")

        def rollback_to(self) -> None:
        self.tx.execute(f"ROLLBACK TO SAVEPOINT {self.name}")

        class PostgresConnectionPool(ConnectionPool[PostgresFamily]):
        """PostgreSQL connection pool with PgBouncer-like semantics."""

        def __init__(self, factory: 'PostgresFactory',
        min_size: int = 5, max_size: int = 20):
        self.factory = factory
        self.min_size = min_size
        self.max_size = max_size
        self._available: List[PostgresConnection] = []
        self._in_use: List[PostgresConnection] = []
        self._lock = threading.Lock()

        # Pre-populate minimum connections
        for _ in range(min_size):
        self._available.append(self.factory.create_connection())

        def acquire(self) -> PostgresConnection:
        with self._lock:
        # Try to reuse existing connection
        while self._available:
        conn = self._available.pop()
        if conn.is_alive():
        self._in_use.append(conn)
        return conn

        # Create new if under max
        if len(self._in_use) < self.max_size:
        conn = self.factory.create_connection()
        self._in_use.append(conn)
        return conn

        raise RuntimeError("Connection pool exhausted")

        def release(self, conn: PostgresConnection) -> None:
        with self._lock:
        if conn in self._in_use:
        self._in_use.remove(conn)
        if conn.is_alive():
        self._available.append(conn)
        else:
        conn.close()

        def close_all(self) -> None:
        with self._lock:
        for conn in self._available + self._in_use:
        conn.close()
        self._available.clear()
        self._in_use.clear()

        class PostgresQueryBuilder(QueryBuilder[PostgresFamily]):
        """PostgreSQL query builder with dialect-specific features."""

        def __init__(self):
        self._columns: List[str] = []
        self._table: str = ""
        self._conditions: List[tuple[str, tuple]] = []
        self._limit: Optional[int] = None
        self._param_count = 0

        def select(self, *columns: str) -> 'PostgresQueryBuilder':
        self._columns.extend(columns)
        return self

        def from_table(self, table: str) -> 'PostgresQueryBuilder':
        self._table = table
        return self

        def where(self, condition: str, *params) -> 'PostgresQueryBuilder':
        # Convert ? placeholders to PostgreSQL $N style
        converted = condition
        for i, _ in enumerate(params):
        self._param_count += 1
        converted = converted.replace("?", f"${self._param_count}", 1)
        self._conditions.append((converted, params))
        return self

        def limit(self, n: int) -> 'PostgresQueryBuilder':
        self._limit = n
        return self

        def build(self) -> tuple[str, tuple]:
        cols = ", ".join(self._columns) if self._columns else "*"
        sql = f"SELECT {cols} FROM {self._table}"

        params: List[Any] = []
        if self._conditions:
        where_clauses = []
        for cond, cond_params in self._conditions:
        where_clauses.append(cond)
        params.extend(cond_params)
        sql += " WHERE " + " AND ".join(where_clauses)

        if self._limit is not None:
        sql += f" LIMIT {self._limit}"

        return sql, tuple(params)

        # ============================================
        # MYSQL FAMILY (Abbreviated - similar structure)
        # ============================================

        class MySQLConnection(Connection[MySQLFamily]):
        """MySQL connection with MySQL-specific features."""

        def __init__(self, host: str, port: int, database: str,
        user: str, password: str):
        self.host = host
        print(f"MySQL: Connected to {host}:{port}/{database}")
        self._closed = False

        def execute(self, sql: str, params: tuple = ()) -> QueryResult:
        # MySQL uses %s for placeholders
        print(f"MySQL executing: {sql} with {params}")
        return QueryResult(columns=[], rows=[], affected_rows=0,
        last_insert_id=None)

        def begin_transaction(self) -> 'MySQLTransaction':
        return MySQLTransaction(self)

        def close(self) -> None:
        self._closed = True

        def is_alive(self) -> bool:
        return not self._closed

        class MySQLTransaction(Transaction[MySQLFamily]):
        def __init__(self, conn: MySQLConnection):
        self.conn = conn
        conn.execute("START TRANSACTION")
        self._active = True

        def commit(self) -> None:
        self.conn.execute("COMMIT")
        self._active = False

        def rollback(self) -> None:
        self.conn.execute("ROLLBACK")
        self._active = False

        def execute(self, sql: str, params: tuple = ()) -> QueryResult:
        return self.conn.execute(sql, params)

        def savepoint(self, name: str) -> 'MySQLSavepoint':
        self.conn.execute(f"SAVEPOINT {name}")
        return MySQLSavepoint(self, name)

        class MySQLSavepoint(Savepoint[MySQLFamily]):
        def __init__(self, tx: MySQLTransaction, name: str):
        self.tx = tx
        self.name = name

        def release(self) -> None:
        self.tx.execute(f"RELEASE SAVEPOINT {self.name}")

        def rollback_to(self) -> None:
        self.tx.execute(f"ROLLBACK TO SAVEPOINT {self.name}")

        class MySQLQueryBuilder(QueryBuilder[MySQLFamily]):
        """MySQL query builder with backtick quoting."""

        def __init__(self):
        self._columns: List[str] = []
        self._table: str = ""
        self._conditions: List[tuple[str, tuple]] = []
        self._limit: Optional[int] = None

        def select(self, *columns: str) -> 'MySQLQueryBuilder':
        # MySQL uses backticks for identifiers
        self._columns.extend(f"`{c}`" for c in columns)
        return self

        def from_table(self, table: str) -> 'MySQLQueryBuilder':
        self._table = f"`{table}`"
        return self

        def where(self, condition: str, *params) -> 'MySQLQueryBuilder':
        self._conditions.append((condition, params))
        return self

        def limit(self, n: int) -> 'MySQLQueryBuilder':
        self._limit = n
        return self

        def build(self) -> tuple[str, tuple]:
        cols = ", ".join(self._columns) if self._columns else "*"
        sql = f"SELECT {cols} FROM {self._table}"

        params: List[Any] = []
        if self._conditions:
        where_clauses = []
        for cond, cond_params in self._conditions:
        where_clauses.append(cond)
        params.extend(cond_params)
        sql += " WHERE " + " AND ".join(where_clauses)

        if self._limit is not None:
        sql += f" LIMIT {self._limit}"

        return sql, tuple(params)

        # ============================================
        # ABSTRACT FACTORY
        # ============================================

        class DatabaseFactory(ABC, Generic[F]):
        """Abstract factory for database product families."""

        @abstractmethod
        def create_connection(self) -> Connection[F]:
        """Create a new database connection."""
        pass

        @abstractmethod
        def create_pool(self, min_size: int = 5,
        max_size: int = 20) -> ConnectionPool[F]:
        """Create a connection pool."""
        pass

        @abstractmethod
        def create_query_builder(self) -> QueryBuilder[F]:
        """Create a query builder for this database's dialect."""
        pass

        @abstractmethod
        def get_dialect_name(self) -> str:
        """Return the SQL dialect name."""
        pass

        # ============================================
        # CONCRETE FACTORIES
        # ============================================

        class PostgresFactory(DatabaseFactory[PostgresFamily]):
        """Factory for PostgreSQL database products."""

        def __init__(self, host: str, port: int, database: str,
        user: str, password: str):
        self.host = host
        self.port = port
        self.database = database
        self.user = user
        self.password = password

        def create_connection(self) -> PostgresConnection:
        return PostgresConnection(
        self.host, self.port, self.database,
        self.user, self.password
        )

        def create_pool(self, min_size: int = 5,
        max_size: int = 20) -> PostgresConnectionPool:
        return PostgresConnectionPool(self, min_size, max_size)

        def create_query_builder(self) -> PostgresQueryBuilder:
        return PostgresQueryBuilder()

        def get_dialect_name(self) -> str:
        return "PostgreSQL"

        class MySQLFactory(DatabaseFactory[MySQLFamily]):
        """Factory for MySQL database products."""

        def __init__(self, host: str, port: int, database: str,
        user: str, password: str):
        self.host = host
        self.port = port
        self.database = database
        self.user = user
        self.password = password

        def create_connection(self) -> MySQLConnection:
        return MySQLConnection(
        self.host, self.port, self.database,
        self.user, self.password
        )

        def create_pool(self, min_size: int = 5,
        max_size: int = 20) -> ConnectionPool[MySQLFamily]:
        # Simplified - would create MySQLConnectionPool
        raise NotImplementedError("MySQL pool not shown for brevity")

        def create_query_builder(self) -> MySQLQueryBuilder:
        return MySQLQueryBuilder()

        def get_dialect_name(self) -> str:
        return "MySQL"

        # ============================================
        # CLIENT CODE
        # ============================================

        class UserRepository(Generic[F]):
        """
        Repository that works with any database family.
        Note the Generic[F] - this propagates family type safety.
        """

        def __init__(self, factory: DatabaseFactory[F]):
        self.factory = factory
        self.pool = factory.create_pool(min_size=2, max_size=10)

        def find_by_id(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Find user by ID using the appropriate dialect."""
        qb = self.factory.create_query_builder()
        sql, params = (qb
        .select("id", "name", "email")
        .from_table("users")
        .where("id = ?", user_id)
        .limit(1)
        .build())

        with self.pool.connection() as conn:
        result = conn.execute(sql, params)
        if result.rows:
        return dict(zip(result.columns, result.rows[0]))
        return None

        def create_user(self, name: str, email: str) -> int:
        """Create user within a transaction."""
        with self.pool.connection() as conn:
        tx = conn.begin_transaction()
        try:
        # Transaction operations are guaranteed to be
        # from the same family as the connection
        result = tx.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        (name, email)
        )
        tx.commit()
        return result.last_insert_id or 0
        except Exception:
        tx.rollback()
        raise

        # ============================================
        # USAGE EXAMPLE
        # ============================================

        def main():
        # Configuration would come from environment
        db_type = "postgresql"

        # Factory selection - the ONLY place where concrete types appear
        if db_type == "postgresql":
        factory: DatabaseFactory = PostgresFactory(
        host="localhost",
        port=5432,
        database="myapp",
        user="admin",
        password="secret"
        )
        elif db_type == "mysql":
        factory = MySQLFactory(
        host="localhost",
        port=3306,
        database="myapp",
        user="admin",
        password="secret"
        )
        else:
        raise ValueError(f"Unknown database type: {db_type}")

        # Client code is database-agnostic
        repo = UserRepository(factory)

        # These operations work identically regardless of database
        user = repo.find_by_id(1)
        new_id = repo.create_user("Alice", "alice@example.com")

        print(f"Using dialect: {factory.get_dialect_name()}")
        print(f"Found user: {user}")
        print(f"Created user with ID: {new_id}")

        if __name__ == "__main__":
        main()
        ```

        ### 5.2 Go Implementation: Cross-Platform File System

        ```go
        package main

        import (
        "fmt"
        "io"
        "os"
        "path/filepath"
        "sync"
        "time"
        )

        // ============================================
        // ABSTRACT PRODUCTS
        // ============================================

        // FileInfo represents file metadata across platforms
        type FileInfo interface {
        Name() string
        Size() int64
        Mode() uint32
        ModTime() time.Time
        IsDir() bool
        // Platform-specific metadata access
        PlatformAttrs() map[string]interface{}
        }

        // File represents an open file handle
        type File interface {
        io.Reader
        io.Writer
        io.Closer
        io.Seeker
        Sync() error
        Stat() (FileInfo, error)
        // Platform-specific operations
        Lock() error
        Unlock() error
        }

        // Directory represents a directory handle
        type Directory interface {
        List() ([]FileInfo, error)
        Create(name string) error
        Remove(name string) error
        Close() error
        }

        // FileWatcher watches for file system changes
        type FileWatcher interface {
        Watch(path string, callback func(event WatchEvent)) error
        Unwatch(path string) error
        Close() error
        }

        // WatchEvent represents a file system event
        type WatchEvent struct {
        Path      string
        Type      WatchEventType
        Timestamp time.Time
        }

        type WatchEventType int

        const (
        Created WatchEventType = iota
        Modified
        Deleted
        Renamed
        )

        // ============================================
        // POSIX FAMILY (Linux, macOS, BSD)
        // ============================================

        type POSIXFileInfo struct {
        name    string
        size    int64
        mode    uint32
        modTime time.Time
        isDir   bool
        uid     uint32
        gid     uint32
        inode   uint64
        }

        func (f *POSIXFileInfo) Name() string                       { return f.name }
        func (f *POSIXFileInfo) Size() int64                        { return f.size }
        func (f *POSIXFileInfo) Mode() uint32                       { return f.mode }
        func (f *POSIXFileInfo) ModTime() time.Time                 { return f.modTime }
        func (f *POSIXFileInfo) IsDir() bool                        { return f.isDir }
        func (f *POSIXFileInfo) PlatformAttrs() map[string]interface{} {
        return map[string]interface{}{
        "uid":   f.uid,
        "gid":   f.gid,
        "inode": f.inode,
        }
        }

        type POSIXFile struct {
        file   *os.File
        path   string
        locked bool
        mu     sync.Mutex
        }

        func (f *POSIXFile) Read(p []byte) (int, error)  { return f.file.Read(p) }
        func (f *POSIXFile) Write(p []byte) (int, error) { return f.file.Write(p) }
        func (f *POSIXFile) Close() error                { return f.file.Close() }
        func (f *POSIXFile) Sync() error                 { return f.file.Sync() }

        func (f *POSIXFile) Seek(offset int64, whence int) (int64, error) {
        return f.file.Seek(offset, whence)
        }

        func (f *POSIXFile) Stat() (FileInfo, error) {
        info, err := f.file.Stat()
        if err != nil {
        return nil, err
        }
        return &POSIXFileInfo{
        name:    info.Name(),
        size:    info.Size(),
        mode:    uint32(info.Mode()),
        modTime: info.ModTime(),
        isDir:   info.IsDir(),
        // In real impl, would extract uid/gid/inode from syscall.Stat_t
        }, nil
        }

        func (f *POSIXFile) Lock() error {
        f.mu.Lock()
        defer f.mu.Unlock()
        // In real implementation: syscall.Flock(f.file.Fd(), syscall.LOCK_EX)
        fmt.Printf("POSIX: Acquired exclusive lock on %s via flock()\n", f.path)
        f.locked = true
        return nil
        }

        func (f *POSIXFile) Unlock() error {
        f.mu.Lock()
        defer f.mu.Unlock()
        // In real implementation: syscall.Flock(f.file.Fd(), syscall.LOCK_UN)
        fmt.Printf("POSIX: Released lock on %s\n", f.path)
        f.locked = false
        return nil
        }

        type POSIXDirectory struct {
        path string
        }

        func (d *POSIXDirectory) List() ([]FileInfo, error) {
        entries, err := os.ReadDir(d.path)
        if err != nil {
        return nil, err
        }

        infos := make([]FileInfo, 0, len(entries))
        for _, entry := range entries {
        info, _ := entry.Info()
        infos = append(infos, &POSIXFileInfo{
        name:    info.Name(),
        size:    info.Size(),
        mode:    uint32(info.Mode()),
        modTime: info.ModTime(),
        isDir:   info.IsDir(),
        })
        }
        return infos, nil
        }

        func (d *POSIXDirectory) Create(name string) error {
        return os.Mkdir(filepath.Join(d.path, name), 0755)
        }

        func (d *POSIXDirectory) Remove(name string) error {
        return os.Remove(filepath.Join(d.path, name))
        }

        func (d *POSIXDirectory) Close() error { return nil }

        type POSIXFileWatcher struct {
        // In real implementation: uses inotify (Linux) or kqueue (BSD/macOS)
        watches map[string]func(WatchEvent)
        mu      sync.RWMutex
        }

        func NewPOSIXFileWatcher() *POSIXFileWatcher {
        return &POSIXFileWatcher{
        watches: make(map[string]func(WatchEvent)),
        }
        }

        func (w *POSIXFileWatcher) Watch(path string, callback func(WatchEvent)) error {
        w.mu.Lock()
        defer w.mu.Unlock()
        // Real impl: syscall to inotify_add_watch or kevent
        fmt.Printf("POSIX: Watching %s via inotify/kqueue\n", path)
        w.watches[path] = callback
        return nil
        }

        func (w *POSIXFileWatcher) Unwatch(path string) error {
        w.mu.Lock()
        defer w.mu.Unlock()
        delete(w.watches, path)
        return nil
        }

        func (w *POSIXFileWatcher) Close() error {
        w.mu.Lock()
        defer w.mu.Unlock()
        w.watches = nil
        return nil
        }

        // ============================================
        // WINDOWS FAMILY
        // ============================================

        type WindowsFileInfo struct {
        name       string
        size       int64
        attrs      uint32 // FILE_ATTRIBUTE_* flags
        modTime    time.Time
        isDir      bool
        fileIndex  uint64 // Unique file ID on NTFS
        volumeSerial uint32
        }

        func (f *WindowsFileInfo) Name() string       { return f.name }
        func (f *WindowsFileInfo) Size() int64        { return f.size }
        func (f *WindowsFileInfo) Mode() uint32       { return f.attrs }
        func (f *WindowsFileInfo) ModTime() time.Time { return f.modTime }
        func (f *WindowsFileInfo) IsDir() bool        { return f.isDir }
        func (f *WindowsFileInfo) PlatformAttrs() map[string]interface{} {
        return map[string]interface{}{
        "attributes":   f.attrs,
        "fileIndex":    f.fileIndex,
        "volumeSerial": f.volumeSerial,
        "isHidden":     f.attrs&0x2 != 0, // FILE_ATTRIBUTE_HIDDEN
        "isSystem":     f.attrs&0x4 != 0, // FILE_ATTRIBUTE_SYSTEM
        "isReadOnly":   f.attrs&0x1 != 0, // FILE_ATTRIBUTE_READONLY
        }
        }

        type WindowsFile struct {
        file   *os.File
        path   string
        handle uintptr // HANDLE from CreateFile
        }

        func (f *WindowsFile) Read(p []byte) (int, error)  { return f.file.Read(p) }
        func (f *WindowsFile) Write(p []byte) (int, error) { return f.file.Write(p) }
        func (f *WindowsFile) Close() error                { return f.file.Close() }
        func (f *WindowsFile) Sync() error                 { return f.file.Sync() }

        func (f *WindowsFile) Seek(offset int64, whence int) (int64, error) {
        return f.file.Seek(offset, whence)
        }

        func (f *WindowsFile) Stat() (FileInfo, error) {
        info, err := f.file.Stat()
        if err != nil {
        return nil, err
        }
        return &WindowsFileInfo{
        name:    info.Name(),
        size:    info.Size(),
        modTime: info.ModTime(),
        isDir:   info.IsDir(),
        }, nil
        }

        func (f *WindowsFile) Lock() error {
        // Windows uses LockFileEx, not flock
        // Supports byte-range locking unlike POSIX flock
        fmt.Printf("Windows: Acquired lock on %s via LockFileEx()\n", f.path)
        return nil
        }

        func (f *WindowsFile) Unlock() error {
        fmt.Printf("Windows: Released lock on %s via UnlockFileEx()\n", f.path)
        return nil
        }

        type WindowsDirectory struct {
        path   string
        handle uintptr // HANDLE from FindFirstFile
        }

        func (d *WindowsDirectory) List() ([]FileInfo, error) {
        // Windows uses FindFirstFile/FindNextFile pattern
        fmt.Printf("Windows: Listing %s via FindFirstFile/FindNextFile\n", d.path)
        entries, err := os.ReadDir(d.path)
        if err != nil {
        return nil, err
        }

        infos := make([]FileInfo, 0, len(entries))
        for _, entry := range entries {
        info, _ := entry.Info()
        infos = append(infos, &WindowsFileInfo{
        name:    info.Name(),
        size:    info.Size(),
        modTime: info.ModTime(),
        isDir:   info.IsDir(),
        })
        }
        return infos, nil
        }

        func (d *WindowsDirectory) Create(name string) error {
        // Windows: CreateDirectory API
        return os.Mkdir(filepath.Join(d.path, name), 0755)
        }

        func (d *WindowsDirectory) Remove(name string) error {
        return os.Remove(filepath.Join(d.path, name))
        }

        func (d *WindowsDirectory) Close() error {
        // Windows: FindClose
        return nil
        }

        type WindowsFileWatcher struct {
        // Uses ReadDirectoryChangesW on Windows
        watches map[string]func(WatchEvent)
        mu      sync.RWMutex
        }

        func NewWindowsFileWatcher() *WindowsFileWatcher {
        return &WindowsFileWatcher{
        watches: make(map[string]func(WatchEvent)),
        }
        }

        func (w *WindowsFileWatcher) Watch(path string, callback func(WatchEvent)) error {
        w.mu.Lock()
        defer w.mu.Unlock()
        fmt.Printf("Windows: Watching %s via ReadDirectoryChangesW\n", path)
        w.watches[path] = callback
        return nil
        }

        func (w *WindowsFileWatcher) Unwatch(path string) error {
        w.mu.Lock()
        defer w.mu.Unlock()
        delete(w.watches, path)
        return nil
        }

        func (w *WindowsFileWatcher) Close() error {
        return nil
        }

        // ============================================
        // ABSTRACT FACTORY
        // ============================================

        // FileSystemFactory creates platform-specific file system products
        type FileSystemFactory interface {
        OpenFile(path string, flags int) (File, error)
        OpenDirectory(path string) (Directory, error)
        CreateWatcher() FileWatcher
        Stat(path string) (FileInfo, error)
        GetPlatformName() string

        // Platform-specific capability queries
        SupportsSymlinks() bool
        SupportsHardLinks() bool
        SupportsByteRangeLocking() bool
        MaxPathLength() int
        }

        // ============================================
        // CONCRETE FACTORIES
        // ============================================

        type POSIXFactory struct {
        rootPath string
        }

        func NewPOSIXFactory(rootPath string) *POSIXFactory {
        return &POSIXFactory{rootPath: rootPath}
        }

        func (f *POSIXFactory) OpenFile(path string, flags int) (File, error) {
        file, err := os.OpenFile(path, flags, 0644)
        if err != nil {
        return nil, err
        }
        return &POSIXFile{file: file, path: path}, nil
        }

        func (f *POSIXFactory) OpenDirectory(path string) (Directory, error) {
        info, err := os.Stat(path)
        if err != nil {
        return nil, err
        }
        if !info.IsDir() {
        return nil, fmt.Errorf("not a directory: %s", path)
        }
        return &POSIXDirectory{path: path}, nil
        }

        func (f *POSIXFactory) CreateWatcher() FileWatcher {
        return NewPOSIXFileWatcher()
        }

        func (f *POSIXFactory) Stat(path string) (FileInfo, error) {
        info, err := os.Stat(path)
        if err != nil {
        return nil, err
        }
        return &POSIXFileInfo{
        name:    info.Name(),
        size:    info.Size(),
        mode:    uint32(info.Mode()),
        modTime: info.ModTime(),
        isDir:   info.IsDir(),
        }, nil
        }

        func (f *POSIXFactory) GetPlatformName() string      { return "POSIX" }
        func (f *POSIXFactory) SupportsSymlinks() bool       { return true }
        func (f *POSIXFactory) SupportsHardLinks() bool      { return true }
        func (f *POSIXFactory) SupportsByteRangeLocking() bool { return false } // flock is whole-file
        func (f *POSIXFactory) MaxPathLength() int           { return 4096 } // PATH_MAX

        type WindowsFactory struct {
        rootPath string
        }

        func NewWindowsFactory(rootPath string) *WindowsFactory {
        return &WindowsFactory{rootPath: rootPath}
        }

        func (f *WindowsFactory) OpenFile(path string, flags int) (File, error) {
        file, err := os.OpenFile(path, flags, 0644)
        if err != nil {
        return nil, err
        }
        return &WindowsFile{file: file, path: path}, nil
        }

        func (f *WindowsFactory) OpenDirectory(path string) (Directory, error) {
        info, err := os.Stat(path)
        if err != nil {
        return nil, err
        }
        if !info.IsDir() {
        return nil, fmt.Errorf("not a directory: %s", path)
        }
        return &WindowsDirectory{path: path}, nil
        }

        func (f *WindowsFactory) CreateWatcher() FileWatcher {
        return NewWindowsFileWatcher()
        }

        func (f *WindowsFactory) Stat(path string) (FileInfo, error) {
        info, err := os.Stat(path)
        if err != nil {
        return nil, err
        }
        return &WindowsFileInfo{
        name:    info.Name(),
        size:    info.Size(),
        modTime: info.ModTime(),
        isDir:   info.IsDir(),
        }, nil
        }

        func (f *WindowsFactory) GetPlatformName() string      { return "Windows" }
        func (f *WindowsFactory) SupportsSymlinks() bool       { return true } // Since Vista with elevation
        func (f *WindowsFactory) SupportsHardLinks() bool      { return true } // NTFS only
        func (f *WindowsFactory) SupportsByteRangeLocking() bool { return true }
        func (f *WindowsFactory) MaxPathLength() int           { return 260 } // MAX_PATH, 32K with \\?\ prefix

        // ============================================
        // CLIENT CODE
        // ============================================

        // FileManager is a cross-platform file manager client
        type FileManager struct {
        factory FileSystemFactory
        watcher FileWatcher
        }

        func NewFileManager(factory FileSystemFactory) *FileManager {
        return &FileManager{
        factory: factory,
        watcher: factory.CreateWatcher(),
        }
        }

        func (m *FileManager) CopyFile(src, dst string) error {
        // All operations use abstract interfaces
        srcFile, err := m.factory.OpenFile(src, os.O_RDONLY)
        if err != nil {
        return fmt.Errorf("open source: %w", err)
        }
        defer srcFile.Close()

        dstFile, err := m.factory.OpenFile(dst, os.O_CREATE|os.O_WRONLY|os.O_TRUNC)
        if err != nil {
        return fmt.Errorf("open dest: %w", err)
        }
        defer dstFile.Close()

        // Lock source for reading, dest for writing
        if err := srcFile.Lock(); err != nil {
        return fmt.Errorf("lock source: %w", err)
        }
        defer srcFile.Unlock()

        if err := dstFile.Lock(); err != nil {
        return fmt.Errorf("lock dest: %w", err)
        }
        defer dstFile.Unlock()

        // Copy data
        buf := make([]byte, 32*1024)
        for {
        n, err := srcFile.Read(buf)
        if n > 0 {
        if _, werr := dstFile.Write(buf[:n]); werr != nil {
        return fmt.Errorf("write: %w", werr)
        }
        }
        if err == io.EOF {
        break
        }
        if err != nil {
        return fmt.Errorf("read: %w", err)
        }
        }

        return dstFile.Sync()
        }

        func (m *FileManager) WatchDirectory(path string, onChange func(string)) error {
        return m.watcher.Watch(path, func(event WatchEvent) {
        onChange(fmt.Sprintf("%s: %s", event.Type, event.Path))
        })
        }

        func (m *FileManager) Close() error {
        return m.watcher.Close()
        }

        // ============================================
        // FACTORY SELECTOR
        // ============================================

        func GetFileSystemFactory(platform string) FileSystemFactory {
        switch platform {
        case "windows":
        return NewWindowsFactory("")
        case "posix", "linux", "darwin":
        return NewPOSIXFactory("")
        default:
        // Default to POSIX
        return NewPOSIXFactory("")
        }
        }

        // ============================================
        // MAIN
        // ============================================

        func main() {
        // In real code, would detect platform automatically
        platform := "posix"

        factory := GetFileSystemFactory(platform)
        manager := NewFileManager(factory)
        defer manager.Close()

        fmt.Printf("File Manager initialized for: %s\n", factory.GetPlatformName())
        fmt.Printf("  Symlinks supported: %v\n", factory.SupportsSymlinks())
        fmt.Printf("  Byte-range locking: %v\n", factory.SupportsByteRangeLocking())
        fmt.Printf("  Max path length: %d\n", factory.MaxPathLength())

        // Example operations - work identically on all platforms
        err := manager.CopyFile("/tmp/source.txt", "/tmp/dest.txt")
        if err != nil {
        fmt.Printf("Copy failed: %v\n", err)
        }

        err = manager.WatchDirectory("/tmp", func(change string) {
        fmt.Printf("Change detected: %s\n", change)
        })
        if err != nil {
        fmt.Printf("Watch failed: %v\n", err)
        }
        }
        ```

        ---

        ## Section 6: Advanced Topics and Edge Cases

        ### 6.1 Factory Composition: Combining Multiple Factories

        Sometimes systems need products from multiple factories:

        ```python
        class CompositeCloudFactory:
        """Combines products from multiple cloud providers."""

        def __init__(self,
        compute_factory: CloudFactory,
        storage_factory: CloudFactory,
        database_factory: CloudFactory):
        # WARNING: This breaks family consistency!
        # Only valid when products are truly independent
        self.compute = compute_factory
        self.storage = storage_factory
        self.database = database_factory

        def create_compute(self) -> ComputeService:
        return self.compute.create_compute()

        def create_storage(self) -> StorageService:
        return self.storage.create_storage()

        def create_database(self) -> DatabaseService:
        return self.database.create_database()
        ```

        <div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #991b1b;">Design Trade-off: Composite Factories</h4>
          <p style="margin: 0; color: #7f1d1d; font-size: 14px;">
            Composite factories sacrifice family consistency for flexibility. Use only when: (1) Products are truly independent, (2) Cross-provider communication is handled explicitly, (3) The performance/cost benefits outweigh the complexity. Document the "allowed combinations" clearly.
          </p>
        </div>

        ### 6.2 Factory Caching and Singleton Integration

        Factories often integrate with [[Singleton]](/topics/design-patterns/singleton):

        ```python
        class FactoryRegistry:
        """Global registry of factories - Singleton pattern."""

        _instance: Optional['FactoryRegistry'] = None
        _lock = threading.Lock()

        def __new__(cls):
        if cls._instance is None:
        with cls._lock:
        if cls._instance is None:
        cls._instance = super().__new__(cls)
        cls._instance._factories: Dict[str, CloudFactory] = {}
        return cls._instance

        def register(self, name: str, factory: CloudFactory) -> None:
        self._factories[name] = factory

        def get(self, name: str) -> CloudFactory:
        if name not in self._factories:
        raise KeyError(f"No factory registered for: {name}")
        return self._factories[name]
        ```

        ### 6.3 Lazy Product Creation

        For expensive products, defer creation:

        ```python
        class LazyDatabaseFactory(DatabaseFactory):
        """Factory that creates products lazily on first use."""

        def __init__(self, underlying: DatabaseFactory):
        self._underlying = underlying
        self._pool: Optional[ConnectionPool] = None
        self._lock = threading.Lock()

        def create_pool(self, **kwargs) -> ConnectionPool:
        if self._pool is None:
        with self._lock:
        if self._pool is None:
        self._pool = self._underlying.create_pool(**kwargs)
        return self._pool
        ```

        ### 6.4 Testing with Mock Factories

        ```python
        class MockDatabaseFactory(DatabaseFactory[MockFamily]):
        """Factory for unit testing - creates in-memory mocks."""

        def __init__(self):
        self.created_connections: List[MockConnection] = []
        self.executed_queries: List[str] = []

        def create_connection(self) -> MockConnection:
        conn = MockConnection(self)
        self.created_connections.append(conn)
        return conn

        def create_pool(self, **kwargs) -> MockConnectionPool:
        return MockConnectionPool(self)

        def create_query_builder(self) -> MockQueryBuilder:
        return MockQueryBuilder()

        # Test assertion helpers
        def assert_query_executed(self, pattern: str):
        matching = [q for q in self.executed_queries if pattern in q]
        assert matching, f"No query matching '{pattern}' was executed"

        def assert_connection_count(self, expected: int):
        assert len(self.created_connections) == expected
        ```

        ---

        ## Section 7: Common Pitfalls and Anti-Patterns

        ### 7.1 The "God Factory" Anti-Pattern

        <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 10px; padding: 20px; margin: 20px 0;">
          <h4 style="margin: 0 0 12px 0; color: #991b1b;">Anti-Pattern: God Factory</h4>
          <div style="color: #7f1d1d; font-size: 14px;">
            <p><strong>Problem:</strong> Factory that creates too many unrelated products:</p>
            <pre style="background: #fee2e2; padding: 12px; border-radius: 4px; overflow-x: auto;">
              class ApplicationFactory:
              def create_database(self): ...
              def create_cache(self): ...
              def create_email_sender(self): ...  # Unrelated!
              def create_pdf_generator(self): ... # Unrelated!
              def create_logger(self): ...
              def create_metrics(self): ...
            </pre>
            <p style="margin-top: 12px;"><strong>Solution:</strong> Split into multiple focused factories. Use [[Interface Segregation]](/topics/design-patterns/solid) principle.</p>
          </div>
        </div>

        ### 7.2 Violating Liskov Substitution

        ```python
        # BAD: Products behave differently across families
        class MacButton(Button):
        def click(self):
        # Mac-specific: shows confirmation dialog first
        if not self._show_confirmation():
        return
        super().click()

        class WindowsButton(Button):
        def click(self):
        # Windows: clicks immediately
        super().click()

        # Client code expecting immediate click will break on Mac!
        ```

        ### 7.3 Factory Configuration Explosion

        When factories have many configuration options, use [[Builder]](/topics/design-patterns/builder):

        ```python
        # BAD: Constructor with too many parameters
        factory = PostgresFactory(
        host="localhost",
        port=5432,
        database="myapp",
        user="admin",
        password="secret",
        ssl_mode="require",
        ssl_cert="/path/to/cert",
        pool_min=5,
        pool_max=20,
        connect_timeout=30,
        statement_timeout=60,
        ...  # 15 more parameters
        )

        # GOOD: Use builder
        factory = (PostgresFactoryBuilder()
        .host("localhost")
        .port(5432)
        .database("myapp")
        .credentials("admin", "secret")
        .ssl(mode="require", cert="/path/to/cert")
        .pool(min=5, max=20)
        .timeouts(connect=30, statement=60)
        .build())
        ```

        ---

        ## Section 8: Related Patterns

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin: 20px 0;">

          <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 10px; padding: 16px;">
            <h5 style="margin: 0 0 8px 0; color: #334155;">[[Factory Method]](/topics/design-patterns/factory-method)</h5>
            <p style="margin: 0; font-size: 13px; color: #64748b;">
              Single product creation via inheritance. Abstract Factory often composed of multiple Factory Methods.
            </p>
          </div>

          <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 10px; padding: 16px;">
            <h5 style="margin: 0 0 8px 0; color: #334155;">[[Builder]](/topics/design-patterns/builder)</h5>
            <p style="margin: 0; font-size: 13px; color: #64748b;">
              Step-by-step construction. Use when products require complex configuration before creation.
            </p>
          </div>

          <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 10px; padding: 16px;">
            <h5 style="margin: 0 0 8px 0; color: #334155;">[[Prototype]](/topics/design-patterns/prototype)</h5>
            <p style="margin: 0; font-size: 13px; color: #64748b;">
              Clone-based creation. Alternative when products are expensive to create from scratch.
            </p>
          </div>

          <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 10px; padding: 16px;">
            <h5 style="margin: 0 0 8px 0; color: #334155;">[[Singleton]](/topics/design-patterns/singleton)</h5>
            <p style="margin: 0; font-size: 13px; color: #64748b;">
              Factories are often singletons. Ensures consistent factory instance across application.
            </p>
          </div>

          <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 10px; padding: 16px;">
            <h5 style="margin: 0 0 8px 0; color: #334155;">[[Dependency Injection]](/topics/design-patterns/dependency-injection)</h5>
            <p style="margin: 0; font-size: 13px; color: #64748b;">
              Factories are injected into clients. Enables testing and configuration flexibility.
            </p>
          </div>

          <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 10px; padding: 16px;">
            <h5 style="margin: 0 0 8px 0; color: #334155;">[[Strategy]](/topics/design-patterns/strategy)</h5>
            <p style="margin: 0; font-size: 13px; color: #64748b;">
              Factory selection itself can be a strategy. Runtime factory switching based on context.
            </p>
          </div>

        </div>

        ---

        ## Quick Reference Card

        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">

          ### Pattern Essence
          <div style="color: #475569;">

            - **Intent**: Create families of related objects without specifying concrete classes
            - **Key Benefit**: Guarantees product family consistency by construction
            - **Category**: Creational Pattern (GoF)

          </div>

          ### Decision Checklist

          | Question | If Yes |
          |----------|--------|
          | Multiple related objects that must work together? | Use Abstract Factory |
          | Only one product type with variations? | Use Factory Method |
          | Products need complex multi-step construction? | Combine with Builder |
          | Only one product family, no plans for more? | Avoid - use direct construction |
          | Products from different families can mix safely? | Consider Factory Method per product |

          ### Key Trade-offs

          | Aspect | Pro | Con |
          |--------|-----|-----|
          | Adding families | Easy - new factory class | N/A |
          | Adding products | N/A | Hard - modify all factories |
          | Testing | Mock factory injection | More interfaces to mock |
          | Flexibility | Switch families at runtime | Locked into family constraints |
          | Complexity | Clear separation | Additional abstraction layer |

          ### Code Smell Indicators
          - Scattered `if/switch` on type for object creation
          - Products accidentally mixed from different sources
          - Difficulty testing due to concrete dependencies
          - Factory with 10+ unrelated creation methods (God Factory)

          ### Implementation Checklist
          1. Identify product families and product types
          2. Define abstract product interfaces (one per product type)
          3. Implement concrete products for each family
          4. Define abstract factory interface
          5. Implement concrete factory for each family
          6. Client code depends only on abstract interfaces
          7. Inject factory at composition root
          8. Document family constraints and product relationships

        </div>
