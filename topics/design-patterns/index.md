# Design Patterns

## Overview

Design patterns are reusable solutions to commonly occurring problems in software design. They represent best practices evolved over time by experienced software developers. This comprehensive guide covers the 23 classic Gang of Four (GoF) patterns plus modern patterns essential for today's software development.

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">5</div>
<h4 style="color: #166534; margin: 0 0 8px 0;">Creational Patterns</h4>
<p style="color: #475569; font-size: 13px; margin: 0;">Object creation mechanisms</p>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">7</div>
<h4 style="color: #1e40af; margin: 0 0 8px 0;">Structural Patterns</h4>
<p style="color: #475569; font-size: 13px; margin: 0;">Object composition</p>
</div>
<div style="background: linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">11</div>
<h4 style="color: #7c3aed; margin: 0 0 8px 0;">Behavioral Patterns</h4>
<p style="color: #475569; font-size: 13px; margin: 0;">Object communication</p>
</div>
</div>

---

## Creational Patterns

These patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/design-patterns/singleton" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Singleton</strong> - Ensures a class has only one instance with global access point
</a>
<a href="/topic/design-patterns/factory-method" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Factory Method</strong> - Defines an interface for creating objects, letting subclasses decide which class to instantiate
</a>
<a href="/topic/design-patterns/abstract-factory" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Abstract Factory</strong> - Creates families of related objects without specifying concrete classes
</a>
<a href="/topic/design-patterns/builder" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Builder</strong> - Separates the construction of a complex object from its representation
</a>
<a href="/topic/design-patterns/prototype" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Prototype</strong> - Creates new objects by copying existing ones (cloning)
</a>
</div>

---

## Structural Patterns

These patterns deal with object composition and typically identify simple ways to realize relationships between different objects.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/design-patterns/adapter" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Adapter</strong> - Converts the interface of a class into another interface clients expect
</a>
<a href="/topic/design-patterns/bridge" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Bridge</strong> - Separates an abstraction from its implementation so both can vary independently
</a>
<a href="/topic/design-patterns/composite" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Composite</strong> - Composes objects into tree structures to represent part-whole hierarchies
</a>
<a href="/topic/design-patterns/decorator" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Decorator</strong> - Attaches additional responsibilities to an object dynamically
</a>
<a href="/topic/design-patterns/facade" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Facade</strong> - Provides a unified interface to a set of interfaces in a subsystem
</a>
<a href="/topic/design-patterns/flyweight" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Flyweight</strong> - Uses sharing to support large numbers of fine-grained objects efficiently
</a>
<a href="/topic/design-patterns/proxy" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Proxy</strong> - Provides a surrogate or placeholder for another object to control access
</a>
</div>

---

## Behavioral Patterns

These patterns are concerned with algorithms and the assignment of responsibilities between objects.

<div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/design-patterns/chain-of-responsibility" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Chain of Responsibility</strong> - Passes requests along a chain of handlers
</a>
<a href="/topic/design-patterns/command" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Command</strong> - Encapsulates a request as an object, allowing parameterization
</a>
<a href="/topic/design-patterns/iterator" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Iterator</strong> - Provides a way to access elements of a collection sequentially
</a>
<a href="/topic/design-patterns/mediator" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Mediator</strong> - Defines an object that encapsulates how a set of objects interact
</a>
<a href="/topic/design-patterns/memento" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Memento</strong> - Captures and externalizes an object's internal state for later restoration
</a>
<a href="/topic/design-patterns/observer" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Observer</strong> - Defines a one-to-many dependency between objects
</a>
<a href="/topic/design-patterns/state" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>State</strong> - Allows an object to alter its behavior when its internal state changes
</a>
<a href="/topic/design-patterns/strategy" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Strategy</strong> - Defines a family of algorithms and makes them interchangeable
</a>
<a href="/topic/design-patterns/template-method" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Template Method</strong> - Defines the skeleton of an algorithm, deferring steps to subclasses
</a>
<a href="/topic/design-patterns/visitor" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Visitor</strong> - Separates an algorithm from the object structure it operates on
</a>
</div>

---

## Modern Patterns

Additional patterns essential for contemporary software development.

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/design-patterns/dependency-injection" style="color: #92400e; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Dependency Injection</strong> - A technique for achieving Inversion of Control (IoC) between classes and their dependencies
</a>
</div>

---

## Pattern Selection Guide

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">WHEN TO USE WHICH PATTERN</h3>

<div style="overflow-x: auto;">

| Problem | Pattern | Why |
|---------|---------|-----|
| Need only one instance | Singleton | Ensures single instance with global access |
| Create objects without specifying class | Factory Method | Lets subclasses decide instantiation |
| Create families of related objects | Abstract Factory | Maintains consistency across product families |
| Complex object construction | Builder | Step-by-step construction with flexibility |
| Convert incompatible interfaces | Adapter | Makes existing classes work with others |
| Add behavior dynamically | Decorator | Wraps objects with additional functionality |
| Simplify complex subsystem | Facade | Provides unified interface |
| Handle requests in a chain | Chain of Responsibility | Decouples sender from receivers |
| Encapsulate requests | Command | Turns requests into stand-alone objects |
| React to state changes | Observer | Implements distributed event handling |
| Switch algorithms at runtime | Strategy | Defines interchangeable algorithms |

</div>
</div>

---

## Content Format

All pattern documentation in this category uses a hybrid Markdown + inline HTML approach for rich formatting:

- **Markdown**: Headers, code blocks, tables, lists, and basic text formatting
- **Inline HTML**: Styled callouts, visual diagrams, colored sections, and interactive elements

This approach enables visually engaging content while maintaining markdown portability and version control friendliness.
