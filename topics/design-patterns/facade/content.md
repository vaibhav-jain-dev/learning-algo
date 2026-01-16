# Facade Pattern

## Overview

The Facade pattern provides a simplified interface to a complex subsystem. It defines a higher-level interface that makes the subsystem easier to use by hiding its complexity.

## Key Concepts

### When to Use

- Simplify complex APIs or libraries
- Decouple client from subsystem components
- Layer your subsystems
- Provide entry points to each level

### Structure

<div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; margin: 2rem 0; font-family: system-ui, sans-serif;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 1rem 2rem; color: white; text-align: center; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
    <div style="font-weight: 700; font-size: 1.1rem;">Client</div>
  </div>
  <div style="color: #667eea; font-size: 1.25rem;">↓</div>
  <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); border-radius: 12px; padding: 1.25rem 2rem; color: white; text-align: center; box-shadow: 0 4px 15px rgba(17, 153, 142, 0.3);">
    <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem;">Facade</div>
    <div style="font-size: 0.85rem; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 0.5rem;">+ simpleOperation()</div>
  </div>
  <div style="color: #38ef7d; font-size: 1.25rem;">↓ uses</div>
  <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
    <div style="background: #2d3748; border: 2px solid #4ecdc4; border-radius: 8px; padding: 0.75rem 1.25rem; color: #4ecdc4; font-size: 0.9rem; text-align: center;">SubsystemA</div>
    <div style="background: #2d3748; border: 2px solid #f093fb; border-radius: 8px; padding: 0.75rem 1.25rem; color: #f093fb; font-size: 0.9rem; text-align: center;">SubsystemB</div>
    <div style="background: #2d3748; border: 2px solid #ffd93d; border-radius: 8px; padding: 0.75rem 1.25rem; color: #ffd93d; font-size: 0.9rem; text-align: center;">SubsystemC</div>
  </div>
</div>

## Implementation

### Python - Video Conversion Facade

```python
class VideoFile:
    def __init__(self, filename: str):
        self.filename = filename
        self.codec = self._detect_codec()

    def _detect_codec(self) -> str:
        ext = self.filename.split('.')[-1]
        codecs = {'mp4': 'h264', 'avi': 'mpeg4', 'mkv': 'vp9'}
        return codecs.get(ext, 'unknown')


class CodecFactory:
    @staticmethod
    def get_codec(format: str):
        codecs = {
            'mp4': MPEG4Codec(),
            'h264': H264Codec(),
            'vp9': VP9Codec()
        }
        return codecs.get(format)


class MPEG4Codec:
    def decode(self, data: bytes) -> bytes:
        print("Decoding MPEG4...")
        return data

    def encode(self, data: bytes) -> bytes:
        print("Encoding to MPEG4...")
        return data


class H264Codec:
    def decode(self, data: bytes) -> bytes:
        print("Decoding H264...")
        return data

    def encode(self, data: bytes) -> bytes:
        print("Encoding to H264...")
        return data


class VP9Codec:
    def decode(self, data: bytes) -> bytes:
        print("Decoding VP9...")
        return data

    def encode(self, data: bytes) -> bytes:
        print("Encoding to VP9...")
        return data


class AudioMixer:
    def extract(self, video: VideoFile) -> bytes:
        print(f"Extracting audio from {video.filename}")
        return b"audio_data"

    def mix(self, audio: bytes, format: str) -> bytes:
        print(f"Mixing audio to {format}")
        return audio


class BitrateReader:
    @staticmethod
    def read(filename: str, codec) -> bytes:
        print(f"Reading {filename} with {codec.__class__.__name__}")
        return b"video_data"

    @staticmethod
    def convert(data: bytes, codec) -> bytes:
        print(f"Converting with {codec.__class__.__name__}")
        return data


class VideoConversionFacade:
    """Facade that hides the complexity of video conversion"""

    def convert(self, filename: str, target_format: str) -> str:
        print(f"\n=== Converting {filename} to {target_format} ===")

        # Load video file
        video = VideoFile(filename)
        print(f"Detected codec: {video.codec}")

        # Get source codec and decode
        source_codec = CodecFactory.get_codec(video.codec)
        raw_data = BitrateReader.read(filename, source_codec)
        decoded = source_codec.decode(raw_data)

        # Extract and process audio
        audio_mixer = AudioMixer()
        audio = audio_mixer.extract(video)
        audio = audio_mixer.mix(audio, target_format)

        # Get target codec and encode
        target_codec = CodecFactory.get_codec(target_format)
        encoded = target_codec.encode(decoded)

        # Generate output filename
        output = filename.rsplit('.', 1)[0] + '.' + target_format
        print(f"Conversion complete: {output}")

        return output


# Usage - Simple interface hiding complex operations
converter = VideoConversionFacade()
converter.convert("movie.avi", "mp4")
converter.convert("lecture.mkv", "h264")
```

### Go - Order Processing Facade

```go
package main

import (
	"fmt"
	"time"
)

// Subsystem components

type InventoryService struct{}

func (i *InventoryService) CheckStock(productID string, quantity int) bool {
	fmt.Printf("Checking stock for %s: %d units\n", productID, quantity)
	return true
}

func (i *InventoryService) ReserveStock(productID string, quantity int) bool {
	fmt.Printf("Reserving %d units of %s\n", quantity, productID)
	return true
}

func (i *InventoryService) ReleaseStock(productID string, quantity int) {
	fmt.Printf("Releasing %d units of %s\n", quantity, productID)
}

type PaymentService struct{}

func (p *PaymentService) ValidateCard(cardNumber string) bool {
	fmt.Printf("Validating card: ****%s\n", cardNumber[len(cardNumber)-4:])
	return true
}

func (p *PaymentService) Charge(cardNumber string, amount float64) (string, error) {
	fmt.Printf("Charging $%.2f to card ****%s\n", amount, cardNumber[len(cardNumber)-4:])
	return fmt.Sprintf("TXN-%d", time.Now().Unix()), nil
}

func (p *PaymentService) Refund(transactionID string) error {
	fmt.Printf("Refunding transaction: %s\n", transactionID)
	return nil
}

type ShippingService struct{}

func (s *ShippingService) CalculateCost(address string, weight float64) float64 {
	fmt.Printf("Calculating shipping for %.2f kg to %s\n", weight, address)
	return 5.99
}

func (s *ShippingService) CreateLabel(address string) string {
	label := fmt.Sprintf("SHIP-%d", time.Now().Unix())
	fmt.Printf("Creating shipping label: %s\n", label)
	return label
}

type NotificationService struct{}

func (n *NotificationService) SendOrderConfirmation(email string, orderID string) {
	fmt.Printf("Sending confirmation to %s for order %s\n", email, orderID)
}

func (n *NotificationService) SendShippingNotification(email string, trackingNumber string) {
	fmt.Printf("Sending shipping notification to %s: %s\n", email, trackingNumber)
}

// Order data structures

type OrderItem struct {
	ProductID string
	Quantity  int
	Price     float64
	Weight    float64
}

type Order struct {
	ID         string
	CustomerID string
	Email      string
	Address    string
	CardNumber string
	Items      []OrderItem
}

// Facade

type OrderFacade struct {
	inventory    *InventoryService
	payment      *PaymentService
	shipping     *ShippingService
	notification *NotificationService
}

func NewOrderFacade() *OrderFacade {
	return &OrderFacade{
		inventory:    &InventoryService{},
		payment:      &PaymentService{},
		shipping:     &ShippingService{},
		notification: &NotificationService{},
	}
}

func (f *OrderFacade) PlaceOrder(order Order) (string, error) {
	fmt.Println("\n=== Processing Order ===")

	// Step 1: Check and reserve inventory
	for _, item := range order.Items {
		if !f.inventory.CheckStock(item.ProductID, item.Quantity) {
			return "", fmt.Errorf("insufficient stock for %s", item.ProductID)
		}
	}

	for _, item := range order.Items {
		f.inventory.ReserveStock(item.ProductID, item.Quantity)
	}

	// Step 2: Calculate total
	var total float64
	var totalWeight float64
	for _, item := range order.Items {
		total += item.Price * float64(item.Quantity)
		totalWeight += item.Weight * float64(item.Quantity)
	}

	// Step 3: Calculate shipping
	shippingCost := f.shipping.CalculateCost(order.Address, totalWeight)
	total += shippingCost

	// Step 4: Process payment
	if !f.payment.ValidateCard(order.CardNumber) {
		f.releaseInventory(order)
		return "", fmt.Errorf("invalid card")
	}

	txnID, err := f.payment.Charge(order.CardNumber, total)
	if err != nil {
		f.releaseInventory(order)
		return "", err
	}

	// Step 5: Create shipping label
	trackingNumber := f.shipping.CreateLabel(order.Address)

	// Step 6: Send notifications
	f.notification.SendOrderConfirmation(order.Email, order.ID)
	f.notification.SendShippingNotification(order.Email, trackingNumber)

	fmt.Printf("\nOrder %s completed! Transaction: %s, Tracking: %s\n",
		order.ID, txnID, trackingNumber)

	return txnID, nil
}

func (f *OrderFacade) CancelOrder(order Order, transactionID string) error {
	fmt.Println("\n=== Canceling Order ===")

	// Release inventory
	f.releaseInventory(order)

	// Process refund
	return f.payment.Refund(transactionID)
}

func (f *OrderFacade) releaseInventory(order Order) {
	for _, item := range order.Items {
		f.inventory.ReleaseStock(item.ProductID, item.Quantity)
	}
}

func main() {
	facade := NewOrderFacade()

	order := Order{
		ID:         "ORD-001",
		CustomerID: "CUST-123",
		Email:      "customer@example.com",
		Address:    "123 Main St, City, State 12345",
		CardNumber: "4111111111111111",
		Items: []OrderItem{
			{ProductID: "PROD-A", Quantity: 2, Price: 29.99, Weight: 0.5},
			{ProductID: "PROD-B", Quantity: 1, Price: 49.99, Weight: 1.0},
		},
	}

	txnID, err := facade.PlaceOrder(order)
	if err != nil {
		fmt.Printf("Order failed: %v\n", err)
		return
	}

	fmt.Println("\n--- Simulating cancellation ---")
	facade.CancelOrder(order, txnID)
}
```

### Python - Cloud Service Facade

```python
from dataclasses import dataclass
from typing import List, Dict, Optional
import json

# Complex subsystems

class EC2Client:
    def create_instance(self, instance_type: str, ami_id: str) -> str:
        print(f"Creating EC2 instance: {instance_type}, AMI: {ami_id}")
        return "i-1234567890"

    def start_instance(self, instance_id: str) -> None:
        print(f"Starting instance: {instance_id}")

    def stop_instance(self, instance_id: str) -> None:
        print(f"Stopping instance: {instance_id}")

    def terminate_instance(self, instance_id: str) -> None:
        print(f"Terminating instance: {instance_id}")


class S3Client:
    def create_bucket(self, name: str) -> str:
        print(f"Creating S3 bucket: {name}")
        return f"arn:aws:s3:::{name}"

    def upload_object(self, bucket: str, key: str, data: bytes) -> None:
        print(f"Uploading to s3://{bucket}/{key}")

    def delete_bucket(self, name: str) -> None:
        print(f"Deleting S3 bucket: {name}")


class RDSClient:
    def create_database(self, identifier: str, engine: str, size: str) -> str:
        print(f"Creating RDS database: {identifier} ({engine}, {size})")
        return f"arn:aws:rds:::db/{identifier}"

    def delete_database(self, identifier: str) -> None:
        print(f"Deleting RDS database: {identifier}")


class VPCClient:
    def create_vpc(self, cidr: str) -> str:
        print(f"Creating VPC with CIDR: {cidr}")
        return "vpc-12345"

    def create_subnet(self, vpc_id: str, cidr: str) -> str:
        print(f"Creating subnet in {vpc_id}: {cidr}")
        return "subnet-12345"

    def create_security_group(self, vpc_id: str, name: str) -> str:
        print(f"Creating security group: {name}")
        return "sg-12345"


class Route53Client:
    def create_hosted_zone(self, domain: str) -> str:
        print(f"Creating hosted zone: {domain}")
        return "Z1234567890"

    def create_record(self, zone_id: str, name: str, target: str) -> None:
        print(f"Creating DNS record: {name} -> {target}")


@dataclass
class InfrastructureConfig:
    name: str
    region: str
    instance_type: str
    database_engine: str
    domain: Optional[str] = None


class CloudInfrastructureFacade:
    """Simplified interface for deploying cloud infrastructure"""

    def __init__(self):
        self.ec2 = EC2Client()
        self.s3 = S3Client()
        self.rds = RDSClient()
        self.vpc = VPCClient()
        self.route53 = Route53Client()
        self.resources: Dict[str, List[str]] = {}

    def deploy_web_application(self, config: InfrastructureConfig) -> Dict[str, str]:
        """Deploy complete web application infrastructure"""
        print(f"\n=== Deploying {config.name} ===\n")

        resources = {}

        # 1. Network setup
        vpc_id = self.vpc.create_vpc("10.0.0.0/16")
        resources['vpc'] = vpc_id

        public_subnet = self.vpc.create_subnet(vpc_id, "10.0.1.0/24")
        private_subnet = self.vpc.create_subnet(vpc_id, "10.0.2.0/24")
        resources['subnets'] = [public_subnet, private_subnet]

        sg_id = self.vpc.create_security_group(vpc_id, f"{config.name}-sg")
        resources['security_group'] = sg_id

        # 2. Storage
        bucket_name = f"{config.name}-assets"
        bucket_arn = self.s3.create_bucket(bucket_name)
        resources['s3_bucket'] = bucket_arn

        # 3. Database
        db_arn = self.rds.create_database(
            f"{config.name}-db",
            config.database_engine,
            "db.t3.medium"
        )
        resources['database'] = db_arn

        # 4. Compute
        instance_id = self.ec2.create_instance(
            config.instance_type,
            "ami-12345678"
        )
        self.ec2.start_instance(instance_id)
        resources['instance'] = instance_id

        # 5. DNS (optional)
        if config.domain:
            zone_id = self.route53.create_hosted_zone(config.domain)
            self.route53.create_record(zone_id, config.domain, instance_id)
            resources['dns_zone'] = zone_id

        self.resources[config.name] = resources
        print(f"\n=== Deployment complete ===")
        return resources

    def teardown(self, name: str) -> None:
        """Remove all infrastructure for an application"""
        print(f"\n=== Tearing down {name} ===\n")

        resources = self.resources.get(name, {})

        if 'instance' in resources:
            self.ec2.stop_instance(resources['instance'])
            self.ec2.terminate_instance(resources['instance'])

        if 'database' in resources:
            db_id = resources['database'].split('/')[-1]
            self.rds.delete_database(db_id)

        if 's3_bucket' in resources:
            bucket = resources['s3_bucket'].split(':::')[-1]
            self.s3.delete_bucket(bucket)

        print(f"\n=== Teardown complete ===")


# Usage - Simple interface
cloud = CloudInfrastructureFacade()

config = InfrastructureConfig(
    name="myapp",
    region="us-east-1",
    instance_type="t3.medium",
    database_engine="postgresql",
    domain="myapp.example.com"
)

resources = cloud.deploy_web_application(config)
print(f"\nDeployed resources: {json.dumps(resources, indent=2)}")

cloud.teardown("myapp")
```

## Common Interview Questions

1. **Facade vs Adapter?**
   - Facade: Simplifies complex interface
   - Adapter: Converts incompatible interface

2. **Can a system have multiple facades?**
   - Yes, different facades for different clients
   - Layer by abstraction level

3. **Does Facade add new functionality?**
   - No, just simplifies existing functionality
   - Coordinates subsystem components

## Best Practices

1. **Don't hide everything** - Allow direct access when needed
2. **Keep facade focused** - Don't become a god object
3. **Document subsystem** - Users may need details
4. **Consider multiple facades** - For different use cases
5. **Make it optional** - Don't force facade usage

## Related Patterns

- [Adapter](/topic/design-patterns/adapter) - Interface conversion
- [Mediator](/topic/design-patterns/mediator) - Component communication
- [Abstract Factory](/topic/design-patterns/abstract-factory) - Object creation
