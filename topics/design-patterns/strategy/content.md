# Strategy Pattern

## Overview

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

## Key Concepts

### When to Use

- Multiple algorithms for a specific task
- Need to switch algorithms at runtime
- Avoid conditional statements for algorithm selection
- Algorithm implementation details should be hidden

### Structure

```
┌─────────────────────────┐
│        Context          │
├─────────────────────────┤
│ - strategy: Strategy    │
├─────────────────────────┤
│ + setStrategy(strategy) │
│ + execute()             │
└───────────┬─────────────┘
            │ uses
            ▼
┌─────────────────────────┐
│       Strategy          │
├─────────────────────────┤
│ + algorithm()           │
└─────────────────────────┘
            △
    ┌───────┴───────┐
┌───┴────┐     ┌───┴────┐
│StrategyA│    │StrategyB│
└─────────┘    └─────────┘
```

## Implementation

### Python - Payment Processing

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from decimal import Decimal
from typing import Optional

@dataclass
class PaymentResult:
    success: bool
    transaction_id: Optional[str]
    message: str


class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount: Decimal) -> PaymentResult:
        pass

    @abstractmethod
    def validate(self) -> bool:
        pass


class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number: str, expiry: str, cvv: str):
        self.card_number = card_number
        self.expiry = expiry
        self.cvv = cvv

    def validate(self) -> bool:
        # Validate card number (Luhn algorithm simplified)
        return len(self.card_number) == 16 and self.card_number.isdigit()

    def pay(self, amount: Decimal) -> PaymentResult:
        if not self.validate():
            return PaymentResult(False, None, "Invalid card details")

        # Process payment (simulated)
        return PaymentResult(
            success=True,
            transaction_id=f"CC-{self.card_number[-4:]}-{amount}",
            message=f"Charged ${amount} to card ending in {self.card_number[-4:]}"
        )


class PayPalPayment(PaymentStrategy):
    def __init__(self, email: str):
        self.email = email

    def validate(self) -> bool:
        return "@" in self.email

    def pay(self, amount: Decimal) -> PaymentResult:
        if not self.validate():
            return PaymentResult(False, None, "Invalid PayPal email")

        return PaymentResult(
            success=True,
            transaction_id=f"PP-{hash(self.email)}-{amount}",
            message=f"Charged ${amount} to PayPal account {self.email}"
        )


class CryptoPayment(PaymentStrategy):
    def __init__(self, wallet_address: str, currency: str = "BTC"):
        self.wallet_address = wallet_address
        self.currency = currency

    def validate(self) -> bool:
        return len(self.wallet_address) >= 26

    def pay(self, amount: Decimal) -> PaymentResult:
        if not self.validate():
            return PaymentResult(False, None, "Invalid wallet address")

        return PaymentResult(
            success=True,
            transaction_id=f"CRYPTO-{self.wallet_address[:8]}",
            message=f"Sent {amount} {self.currency} to {self.wallet_address[:8]}..."
        )


class BankTransferPayment(PaymentStrategy):
    def __init__(self, account_number: str, routing_number: str):
        self.account_number = account_number
        self.routing_number = routing_number

    def validate(self) -> bool:
        return len(self.account_number) >= 8 and len(self.routing_number) == 9

    def pay(self, amount: Decimal) -> PaymentResult:
        if not self.validate():
            return PaymentResult(False, None, "Invalid bank details")

        return PaymentResult(
            success=True,
            transaction_id=f"BANK-{self.account_number[-4:]}",
            message=f"Transferred ${amount} to account ending in {self.account_number[-4:]}"
        )


# Context
class PaymentProcessor:
    def __init__(self, strategy: PaymentStrategy = None):
        self._strategy = strategy

    def set_strategy(self, strategy: PaymentStrategy):
        self._strategy = strategy

    def process_payment(self, amount: Decimal) -> PaymentResult:
        if not self._strategy:
            return PaymentResult(False, None, "No payment method selected")

        return self._strategy.pay(amount)


# Usage
processor = PaymentProcessor()

# Credit card payment
processor.set_strategy(CreditCardPayment(
    card_number="4111111111111111",
    expiry="12/25",
    cvv="123"
))
result = processor.process_payment(Decimal("99.99"))
print(result)

# Switch to PayPal
processor.set_strategy(PayPalPayment("user@example.com"))
result = processor.process_payment(Decimal("49.99"))
print(result)

# Switch to Crypto
processor.set_strategy(CryptoPayment("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"))
result = processor.process_payment(Decimal("0.005"))
print(result)
```

### Python - Compression Strategies

```python
from abc import ABC, abstractmethod
import gzip
import zlib
import lzma
from typing import bytes

class CompressionStrategy(ABC):
    @abstractmethod
    def compress(self, data: bytes) -> bytes:
        pass

    @abstractmethod
    def decompress(self, data: bytes) -> bytes:
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        pass


class GzipCompression(CompressionStrategy):
    def __init__(self, level: int = 9):
        self.level = level

    @property
    def name(self) -> str:
        return "gzip"

    def compress(self, data: bytes) -> bytes:
        return gzip.compress(data, compresslevel=self.level)

    def decompress(self, data: bytes) -> bytes:
        return gzip.decompress(data)


class ZlibCompression(CompressionStrategy):
    def __init__(self, level: int = 9):
        self.level = level

    @property
    def name(self) -> str:
        return "zlib"

    def compress(self, data: bytes) -> bytes:
        return zlib.compress(data, level=self.level)

    def decompress(self, data: bytes) -> bytes:
        return zlib.decompress(data)


class LZMACompression(CompressionStrategy):
    @property
    def name(self) -> str:
        return "lzma"

    def compress(self, data: bytes) -> bytes:
        return lzma.compress(data)

    def decompress(self, data: bytes) -> bytes:
        return lzma.decompress(data)


class NoCompression(CompressionStrategy):
    @property
    def name(self) -> str:
        return "none"

    def compress(self, data: bytes) -> bytes:
        return data

    def decompress(self, data: bytes) -> bytes:
        return data


class FileCompressor:
    def __init__(self, strategy: CompressionStrategy = None):
        self._strategy = strategy or NoCompression()

    def set_strategy(self, strategy: CompressionStrategy):
        self._strategy = strategy

    def compress_file(self, input_path: str, output_path: str):
        with open(input_path, 'rb') as f:
            data = f.read()

        compressed = self._strategy.compress(data)

        with open(output_path, 'wb') as f:
            f.write(compressed)

        ratio = len(compressed) / len(data) * 100
        print(f"Compressed using {self._strategy.name}: {len(data)} → {len(compressed)} bytes ({ratio:.1f}%)")

    def decompress_file(self, input_path: str, output_path: str):
        with open(input_path, 'rb') as f:
            data = f.read()

        decompressed = self._strategy.decompress(data)

        with open(output_path, 'wb') as f:
            f.write(decompressed)


# Usage
compressor = FileCompressor()

# Choose best compression
data = b"Hello World! " * 1000

for strategy in [GzipCompression(), ZlibCompression(), LZMACompression()]:
    compressor.set_strategy(strategy)
    compressed = strategy.compress(data)
    print(f"{strategy.name}: {len(data)} → {len(compressed)} bytes")
```

### Go - Sorting Strategies

```go
package main

import (
	"fmt"
	"sort"
)

type SortStrategy interface {
	Sort(data []int) []int
	Name() string
}

// Bubble Sort
type BubbleSort struct{}

func (b *BubbleSort) Name() string { return "Bubble Sort" }

func (b *BubbleSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)

	n := len(result)
	for i := 0; i < n-1; i++ {
		for j := 0; j < n-i-1; j++ {
			if result[j] > result[j+1] {
				result[j], result[j+1] = result[j+1], result[j]
			}
		}
	}
	return result
}

// Quick Sort
type QuickSort struct{}

func (q *QuickSort) Name() string { return "Quick Sort" }

func (q *QuickSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)
	q.quickSort(result, 0, len(result)-1)
	return result
}

func (q *QuickSort) quickSort(arr []int, low, high int) {
	if low < high {
		pi := q.partition(arr, low, high)
		q.quickSort(arr, low, pi-1)
		q.quickSort(arr, pi+1, high)
	}
}

func (q *QuickSort) partition(arr []int, low, high int) int {
	pivot := arr[high]
	i := low - 1

	for j := low; j < high; j++ {
		if arr[j] < pivot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}

// Merge Sort
type MergeSort struct{}

func (m *MergeSort) Name() string { return "Merge Sort" }

func (m *MergeSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)
	return m.mergeSort(result)
}

func (m *MergeSort) mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}

	mid := len(arr) / 2
	left := m.mergeSort(arr[:mid])
	right := m.mergeSort(arr[mid:])

	return m.merge(left, right)
}

func (m *MergeSort) merge(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0

	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	result = append(result, left[i:]...)
	result = append(result, right[j:]...)
	return result
}

// Built-in Sort
type BuiltinSort struct{}

func (b *BuiltinSort) Name() string { return "Built-in Sort" }

func (b *BuiltinSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)
	sort.Ints(result)
	return result
}

// Context
type Sorter struct {
	strategy SortStrategy
}

func NewSorter(strategy SortStrategy) *Sorter {
	return &Sorter{strategy: strategy}
}

func (s *Sorter) SetStrategy(strategy SortStrategy) {
	s.strategy = strategy
}

func (s *Sorter) Sort(data []int) []int {
	fmt.Printf("Sorting using %s\n", s.strategy.Name())
	return s.strategy.Sort(data)
}

func main() {
	data := []int{64, 34, 25, 12, 22, 11, 90}

	sorter := NewSorter(&QuickSort{})
	fmt.Println("Original:", data)
	fmt.Println("Sorted:", sorter.Sort(data))

	sorter.SetStrategy(&MergeSort{})
	fmt.Println("Sorted:", sorter.Sort(data))

	sorter.SetStrategy(&BubbleSort{})
	fmt.Println("Sorted:", sorter.Sort(data))
}
```

### Go - Discount Strategies

```go
package main

import (
	"fmt"
	"time"
)

type Order struct {
	Items      []OrderItem
	CustomerID string
	CreatedAt  time.Time
}

type OrderItem struct {
	Name     string
	Price    float64
	Quantity int
}

func (o *Order) Subtotal() float64 {
	total := 0.0
	for _, item := range o.Items {
		total += item.Price * float64(item.Quantity)
	}
	return total
}

type DiscountStrategy interface {
	Calculate(order *Order) float64
	Name() string
}

// No Discount
type NoDiscount struct{}

func (n *NoDiscount) Name() string { return "No Discount" }

func (n *NoDiscount) Calculate(order *Order) float64 {
	return 0
}

// Percentage Discount
type PercentageDiscount struct {
	Percent float64
}

func (p *PercentageDiscount) Name() string {
	return fmt.Sprintf("%.0f%% Off", p.Percent)
}

func (p *PercentageDiscount) Calculate(order *Order) float64 {
	return order.Subtotal() * (p.Percent / 100)
}

// Fixed Amount Discount
type FixedDiscount struct {
	Amount float64
}

func (f *FixedDiscount) Name() string {
	return fmt.Sprintf("$%.2f Off", f.Amount)
}

func (f *FixedDiscount) Calculate(order *Order) float64 {
	subtotal := order.Subtotal()
	if f.Amount > subtotal {
		return subtotal
	}
	return f.Amount
}

// Tiered Discount
type TieredDiscount struct {
	Tiers []struct {
		MinAmount float64
		Percent   float64
	}
}

func (t *TieredDiscount) Name() string { return "Tiered Discount" }

func (t *TieredDiscount) Calculate(order *Order) float64 {
	subtotal := order.Subtotal()
	percent := 0.0

	for _, tier := range t.Tiers {
		if subtotal >= tier.MinAmount {
			percent = tier.Percent
		}
	}

	return subtotal * (percent / 100)
}

// Buy X Get Y Free
type BuyXGetYFree struct {
	BuyCount  int
	FreeCount int
}

func (b *BuyXGetYFree) Name() string {
	return fmt.Sprintf("Buy %d Get %d Free", b.BuyCount, b.FreeCount)
}

func (b *BuyXGetYFree) Calculate(order *Order) float64 {
	discount := 0.0
	for _, item := range order.Items {
		sets := item.Quantity / (b.BuyCount + b.FreeCount)
		discount += item.Price * float64(sets*b.FreeCount)
	}
	return discount
}

// Pricing Engine
type PricingEngine struct {
	strategy DiscountStrategy
}

func NewPricingEngine(strategy DiscountStrategy) *PricingEngine {
	if strategy == nil {
		strategy = &NoDiscount{}
	}
	return &PricingEngine{strategy: strategy}
}

func (p *PricingEngine) SetStrategy(strategy DiscountStrategy) {
	p.strategy = strategy
}

func (p *PricingEngine) CalculateTotal(order *Order) float64 {
	subtotal := order.Subtotal()
	discount := p.strategy.Calculate(order)
	return subtotal - discount
}

func (p *PricingEngine) PrintReceipt(order *Order) {
	subtotal := order.Subtotal()
	discount := p.strategy.Calculate(order)
	total := subtotal - discount

	fmt.Println("===== Receipt =====")
	for _, item := range order.Items {
		fmt.Printf("%s x%d: $%.2f\n", item.Name, item.Quantity, item.Price*float64(item.Quantity))
	}
	fmt.Println("-------------------")
	fmt.Printf("Subtotal: $%.2f\n", subtotal)
	fmt.Printf("Discount (%s): -$%.2f\n", p.strategy.Name(), discount)
	fmt.Printf("Total: $%.2f\n", total)
	fmt.Println("===================")
}

func main() {
	order := &Order{
		Items: []OrderItem{
			{Name: "T-Shirt", Price: 25.00, Quantity: 3},
			{Name: "Jeans", Price: 50.00, Quantity: 2},
		},
	}

	engine := NewPricingEngine(&PercentageDiscount{Percent: 20})
	engine.PrintReceipt(order)

	engine.SetStrategy(&TieredDiscount{
		Tiers: []struct {
			MinAmount float64
			Percent   float64
		}{
			{MinAmount: 50, Percent: 5},
			{MinAmount: 100, Percent: 10},
			{MinAmount: 200, Percent: 15},
		},
	})
	engine.PrintReceipt(order)

	engine.SetStrategy(&BuyXGetYFree{BuyCount: 2, FreeCount: 1})
	engine.PrintReceipt(order)
}
```

## Common Interview Questions

1. **Strategy vs State pattern?**
   - Strategy: Algorithms are interchangeable by client
   - State: State changes automatically based on context

2. **How to select strategy at runtime?**
   - Factory pattern
   - Configuration
   - User input

3. **Strategy vs Template Method?**
   - Strategy: Composition, swap entire algorithm
   - Template: Inheritance, override specific steps

## Best Practices

1. **Single responsibility** - Each strategy does one thing
2. **Interface segregation** - Keep strategy interface minimal
3. **Prefer composition** - Inject strategy, don't inherit
4. **Consider default** - Provide a sensible default strategy
5. **Document algorithms** - Explain when to use each

## Related Patterns

- [State](/topic/design-patterns/state) - State-based behavior changes
- [Template Method](/topic/design-patterns/template-method) - Algorithm skeleton
- [Command](/topic/design-patterns/command) - Encapsulate requests
