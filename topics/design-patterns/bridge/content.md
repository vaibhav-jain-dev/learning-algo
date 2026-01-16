# Bridge Pattern

## Overview

The Bridge pattern separates an abstraction from its implementation, allowing them to vary independently. It prevents a "Cartesian product" explosion of classes when you have multiple dimensions of variation.

## Key Concepts

### When to Use

- Avoid permanent binding between abstraction and implementation
- Both abstraction and implementation should be extensible
- Changes in implementation shouldn't affect clients
- Share implementation among multiple objects

## Implementation

### Python

```python
from abc import ABC, abstractmethod


# Implementation hierarchy
class Renderer(ABC):
    @abstractmethod
    def render_circle(self, x: float, y: float, radius: float) -> str:
        pass

    @abstractmethod
    def render_rectangle(self, x: float, y: float, width: float, height: float) -> str:
        pass


class VectorRenderer(Renderer):
    def render_circle(self, x: float, y: float, radius: float) -> str:
        return f"Drawing circle as vectors at ({x}, {y}) with radius {radius}"

    def render_rectangle(self, x: float, y: float, width: float, height: float) -> str:
        return f"Drawing rectangle as vectors at ({x}, {y}) with size {width}x{height}"


class RasterRenderer(Renderer):
    def render_circle(self, x: float, y: float, radius: float) -> str:
        return f"Drawing circle as pixels at ({x}, {y}) with radius {radius}"

    def render_rectangle(self, x: float, y: float, width: float, height: float) -> str:
        return f"Drawing rectangle as pixels at ({x}, {y}) with size {width}x{height}"


# Abstraction hierarchy
class Shape(ABC):
    def __init__(self, renderer: Renderer):
        self.renderer = renderer

    @abstractmethod
    def draw(self) -> str:
        pass

    @abstractmethod
    def resize(self, factor: float):
        pass


class Circle(Shape):
    def __init__(self, renderer: Renderer, x: float, y: float, radius: float):
        super().__init__(renderer)
        self.x = x
        self.y = y
        self.radius = radius

    def draw(self) -> str:
        return self.renderer.render_circle(self.x, self.y, self.radius)

    def resize(self, factor: float):
        self.radius *= factor


class Rectangle(Shape):
    def __init__(self, renderer: Renderer, x: float, y: float, width: float, height: float):
        super().__init__(renderer)
        self.x = x
        self.y = y
        self.width = width
        self.height = height

    def draw(self) -> str:
        return self.renderer.render_rectangle(self.x, self.y, self.width, self.height)

    def resize(self, factor: float):
        self.width *= factor
        self.height *= factor


# Real-world example: Device and Remote Control
class Device(ABC):
    @abstractmethod
    def is_enabled(self) -> bool:
        pass

    @abstractmethod
    def enable(self):
        pass

    @abstractmethod
    def disable(self):
        pass

    @abstractmethod
    def get_volume(self) -> int:
        pass

    @abstractmethod
    def set_volume(self, volume: int):
        pass

    @abstractmethod
    def get_channel(self) -> int:
        pass

    @abstractmethod
    def set_channel(self, channel: int):
        pass


class TV(Device):
    def __init__(self):
        self._enabled = False
        self._volume = 30
        self._channel = 1

    def is_enabled(self) -> bool:
        return self._enabled

    def enable(self):
        self._enabled = True
        print("TV is ON")

    def disable(self):
        self._enabled = False
        print("TV is OFF")

    def get_volume(self) -> int:
        return self._volume

    def set_volume(self, volume: int):
        self._volume = max(0, min(100, volume))
        print(f"TV volume: {self._volume}")

    def get_channel(self) -> int:
        return self._channel

    def set_channel(self, channel: int):
        self._channel = channel
        print(f"TV channel: {self._channel}")


class Radio(Device):
    def __init__(self):
        self._enabled = False
        self._volume = 20
        self._channel = 88

    def is_enabled(self) -> bool:
        return self._enabled

    def enable(self):
        self._enabled = True
        print("Radio is ON")

    def disable(self):
        self._enabled = False
        print("Radio is OFF")

    def get_volume(self) -> int:
        return self._volume

    def set_volume(self, volume: int):
        self._volume = max(0, min(100, volume))
        print(f"Radio volume: {self._volume}")

    def get_channel(self) -> int:
        return self._channel

    def set_channel(self, channel: int):
        self._channel = channel
        print(f"Radio frequency: {self._channel} FM")


class RemoteControl:
    def __init__(self, device: Device):
        self.device = device

    def toggle_power(self):
        if self.device.is_enabled():
            self.device.disable()
        else:
            self.device.enable()

    def volume_up(self):
        self.device.set_volume(self.device.get_volume() + 10)

    def volume_down(self):
        self.device.set_volume(self.device.get_volume() - 10)

    def channel_up(self):
        self.device.set_channel(self.device.get_channel() + 1)

    def channel_down(self):
        self.device.set_channel(self.device.get_channel() - 1)


class AdvancedRemoteControl(RemoteControl):
    def mute(self):
        self.device.set_volume(0)

    def set_channel_directly(self, channel: int):
        self.device.set_channel(channel)


# Usage
print("=== Shape Rendering ===")
vector_renderer = VectorRenderer()
raster_renderer = RasterRenderer()

circle1 = Circle(vector_renderer, 5, 10, 20)
circle2 = Circle(raster_renderer, 5, 10, 20)

print(circle1.draw())
print(circle2.draw())

rectangle = Rectangle(vector_renderer, 0, 0, 100, 50)
print(rectangle.draw())

print("\n=== Device Control ===")
tv = TV()
radio = Radio()

tv_remote = AdvancedRemoteControl(tv)
radio_remote = RemoteControl(radio)

tv_remote.toggle_power()
tv_remote.volume_up()
tv_remote.set_channel_directly(42)
tv_remote.mute()

radio_remote.toggle_power()
radio_remote.channel_up()
```

### Go

```go
package main

import "fmt"

// Implementation interface
type Renderer interface {
	RenderCircle(x, y, radius float64) string
	RenderRectangle(x, y, width, height float64) string
}

type VectorRenderer struct{}

func (r *VectorRenderer) RenderCircle(x, y, radius float64) string {
	return fmt.Sprintf("Drawing circle as vectors at (%.1f, %.1f) with radius %.1f", x, y, radius)
}

func (r *VectorRenderer) RenderRectangle(x, y, width, height float64) string {
	return fmt.Sprintf("Drawing rectangle as vectors at (%.1f, %.1f) size %.1fx%.1f", x, y, width, height)
}

type RasterRenderer struct{}

func (r *RasterRenderer) RenderCircle(x, y, radius float64) string {
	return fmt.Sprintf("Drawing circle as pixels at (%.1f, %.1f) with radius %.1f", x, y, radius)
}

func (r *RasterRenderer) RenderRectangle(x, y, width, height float64) string {
	return fmt.Sprintf("Drawing rectangle as pixels at (%.1f, %.1f) size %.1fx%.1f", x, y, width, height)
}

// Abstraction
type Shape interface {
	Draw() string
	Resize(factor float64)
}

type Circle struct {
	renderer Renderer
	x, y     float64
	radius   float64
}

func NewCircle(renderer Renderer, x, y, radius float64) *Circle {
	return &Circle{renderer: renderer, x: x, y: y, radius: radius}
}

func (c *Circle) Draw() string {
	return c.renderer.RenderCircle(c.x, c.y, c.radius)
}

func (c *Circle) Resize(factor float64) {
	c.radius *= factor
}

type Rectangle struct {
	renderer      Renderer
	x, y          float64
	width, height float64
}

func NewRectangle(renderer Renderer, x, y, width, height float64) *Rectangle {
	return &Rectangle{renderer: renderer, x: x, y: y, width: width, height: height}
}

func (r *Rectangle) Draw() string {
	return r.renderer.RenderRectangle(r.x, r.y, r.width, r.height)
}

func (r *Rectangle) Resize(factor float64) {
	r.width *= factor
	r.height *= factor
}

// Device example
type Device interface {
	IsEnabled() bool
	Enable()
	Disable()
	GetVolume() int
	SetVolume(volume int)
	GetChannel() int
	SetChannel(channel int)
}

type TV struct {
	enabled bool
	volume  int
	channel int
}

func NewTV() *TV {
	return &TV{volume: 30, channel: 1}
}

func (t *TV) IsEnabled() bool    { return t.enabled }
func (t *TV) Enable()            { t.enabled = true; fmt.Println("TV ON") }
func (t *TV) Disable()           { t.enabled = false; fmt.Println("TV OFF") }
func (t *TV) GetVolume() int     { return t.volume }
func (t *TV) SetVolume(v int)    { t.volume = v; fmt.Printf("TV volume: %d\n", v) }
func (t *TV) GetChannel() int    { return t.channel }
func (t *TV) SetChannel(c int)   { t.channel = c; fmt.Printf("TV channel: %d\n", c) }

type RemoteControl struct {
	device Device
}

func NewRemoteControl(device Device) *RemoteControl {
	return &RemoteControl{device: device}
}

func (r *RemoteControl) TogglePower() {
	if r.device.IsEnabled() {
		r.device.Disable()
	} else {
		r.device.Enable()
	}
}

func (r *RemoteControl) VolumeUp() {
	r.device.SetVolume(r.device.GetVolume() + 10)
}

func (r *RemoteControl) VolumeDown() {
	r.device.SetVolume(r.device.GetVolume() - 10)
}

type AdvancedRemote struct {
	*RemoteControl
}

func NewAdvancedRemote(device Device) *AdvancedRemote {
	return &AdvancedRemote{NewRemoteControl(device)}
}

func (r *AdvancedRemote) Mute() {
	r.device.SetVolume(0)
}

func main() {
	// Shape rendering
	vectorRenderer := &VectorRenderer{}
	rasterRenderer := &RasterRenderer{}

	circle1 := NewCircle(vectorRenderer, 5, 10, 20)
	circle2 := NewCircle(rasterRenderer, 5, 10, 20)

	fmt.Println(circle1.Draw())
	fmt.Println(circle2.Draw())

	// Device control
	fmt.Println("\n=== Device Control ===")
	tv := NewTV()
	remote := NewAdvancedRemote(tv)

	remote.TogglePower()
	remote.VolumeUp()
	remote.Mute()
}
```

## Structure

<div style="display: flex; justify-content: center; gap: 4rem; margin: 2rem 0; font-family: system-ui, sans-serif; flex-wrap: wrap;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 1.25rem 2rem; color: white; text-align: center; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
      <div style="font-weight: 700; font-size: 1.1rem;">Abstraction</div>
      <div style="font-size: 0.8rem; opacity: 0.8;">+ implementation</div>
    </div>
    <div style="color: #667eea; font-size: 1.25rem;">↓ extends</div>
    <div style="background: #1e3a5f; border: 2px solid #4ecdc4; border-radius: 10px; padding: 1rem 1.5rem; color: #4ecdc4; font-weight: 600;">RefinedAbstraction</div>
  </div>
  <div style="display: flex; align-items: flex-start; padding-top: 1.5rem;">
    <div style="color: #f093fb; font-size: 1.5rem; transform: rotate(0deg);">───────→</div>
    <div style="position: absolute; margin-left: 2rem; margin-top: -1rem; font-size: 0.75rem; color: #a0aec0;">has-a</div>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); border-radius: 12px; padding: 1.25rem 2rem; color: white; text-align: center; box-shadow: 0 4px 15px rgba(17, 153, 142, 0.3);">
      <div style="font-weight: 700; font-size: 1.1rem;">Implementation</div>
      <div style="font-size: 0.8rem; opacity: 0.8;">interface</div>
    </div>
    <div style="color: #38ef7d; font-size: 1.25rem;">↓ implements</div>
    <div style="display: flex; gap: 1rem;">
      <div style="background: #2d3748; border: 2px solid #38ef7d; border-radius: 8px; padding: 0.75rem 1rem; color: #38ef7d; font-size: 0.9rem;">ConcreteImplA</div>
      <div style="background: #2d3748; border: 2px solid #38ef7d; border-radius: 8px; padding: 0.75rem 1rem; color: #38ef7d; font-size: 0.9rem;">ConcreteImplB</div>
    </div>
  </div>
</div>

## Best Practices

1. **Identify dimensions** - Find the independent axes of variation
2. **Composition over inheritance** - Bridge uses composition
3. **Program to interfaces** - Keep abstraction and implementation separate
4. **Consider factory** - Use factory to create proper combinations

## Related Patterns

- [Adapter](/topic/design-patterns/adapter) - Makes interfaces compatible
- [Strategy](/topic/design-patterns/strategy) - Similar but for algorithms
- [Abstract Factory](/topic/design-patterns/abstract-factory) - Create bridge objects
