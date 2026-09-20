// Master Core Java & OOP Deep Dive Data for Engineers & Interviewees

export const javaCoreDeepDive = [
  {
    id: 'jvm-memory-model',
    title: 'JVM Architecture, Stack vs Heap & Memory Lifecycles',
    category: 'JVM & Memory',
    icon: 'cpu',
    summary: 'How Java executes under the hood: Stack frames, Heap allocation, Pass-by-Value reality, and Garbage Collection.',
    description: 'Every Java developer must understand where their variables physically live in RAM. Misunderstanding Stack vs Heap leads to memory leaks, NullPointerExceptions, and failing technical interview questions on object passing.',
    keyTakeaways: [
      'Stack Memory: Thread-isolated, ultra-fast LIFO allocation for local primitives and object reference addresses. Destroyed automatically when methods return.',
      'Heap Memory: Shared across all threads, stores the actual object instances (`new Object()`), instance fields, and arrays. Managed by the Garbage Collector.',
      'Java is ALWAYS Strictly Pass-by-Value: For primitives, the raw value bits are copied. For objects, the 64-bit reference address is copied by value.',
      'Reassigning an object parameter inside a method (`param = new Node()`) NEVER modifies the caller reference!'
    ],
    code: `// ========================================================
// 1. STACK VS HEAP IN ACTION
// ========================================================
public class MemoryDemo {
    // Instance variable stored on HEAP inside the MemoryDemo object
    int instanceVar = 42;

    public void calculate() {
        // Local primitive stored directly in current thread's STACK frame
        int localPrimitive = 10;

        // 'list' reference pointer lives on STACK;
        // The ArrayList object itself and its elements live on HEAP!
        List<String> list = new ArrayList<>();
        list.add("JavaAlgo");

        modify(localPrimitive, list);
        // localPrimitive is STILL 10!
        // list now contains ["JavaAlgo", "Elite"]!
    }

    // ========================================================
    // 2. THE PASS-BY-VALUE PROOF (Classic FAANG Interview Trap)
    // ========================================================
    public void modify(int num, List<String> ref) {
        num = 999;          // Only changes local copy on this stack frame!
        ref.add("Elite");   // Mutates the actual object on the HEAP through the copied address!

        // TRAP: Reassigning the reference
        ref = new ArrayList<>(); // 'ref' now points to a NEW heap object
        ref.add("Ghost");        // Caller will NEVER see "Ghost"!
    }
}

// ========================================================
// 3. MEMORY VISUALIZATION:
// ========================================================
/*
  STACK MEMORY (Thread-Private, LIFO)       HEAP MEMORY (Shared, Managed by GC)
 ┌──────────────────────────────────────┐  ┌─────────────────────────────────────┐
 │ calculate() frame:                   │  │                                     │
 │  localPrimitive = 10                 │  │  ArrayList Instance [ID: 0x9A]      │
 │  list = 0x9A ────────────────────────┼──┼─> [ "JavaAlgo", "Elite" ]           │
 │                                      │  │                                     │
 │ modify() frame:                      │  │  MemoryDemo Instance                │
 │  num = 999 (copied value)            │  │   instanceVar = 42                  │
 │  ref = 0x9A (copied pointer address) │  │                                     │
 └──────────────────────────────────────┘  └─────────────────────────────────────┘
*/`
  },
  {
    id: 'classes-objects-lifecycle',
    title: 'Classes, Objects & Heap Instantiation Lifecycle',
    category: 'Object Mechanics',
    icon: 'layers',
    summary: 'What actually happens in RAM when you call `new MyClass()` step-by-step.',
    description: 'A Class is merely bytecode instructions (metadata in Metaspace). An Object is physical memory allocated on the Heap. Mastering constructor chaining, field initialization, and deep vs shallow copying is essential for production code.',
    keyTakeaways: [
      'Step 1: ClassLoader loads bytecode into Metaspace if not already present.',
      'Step 2: JVM allocates zero-filled memory on Heap for object header + fields.',
      'Step 3: Fields initialized to default zero values (`0`, `false`, `null`).',
      'Step 4: Constructor executes `super()` up to `java.lang.Object`, runs instance init blocks, then runs constructor body.',
      'Step 5: Returns memory address reference stored in the stack variable.'
    ],
    code: `// ========================================================
// 1. CLASS DEFINITION & CONSTRUCTOR CHAINING
// ========================================================
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    // Default constructor chaining via this(...)
    public TreeNode() {
        this(0); // Calls 1-arg constructor
    }

    public TreeNode(int val) {
        this(val, null, null); // Calls 3-arg constructor
    }

    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    // ========================================================
    // 2. SHALLOW COPY VS DEEP COPY
    // ========================================================
    // Shallow copy: copies pointers; sub-nodes are shared!
    public static TreeNode shallowCopy(TreeNode root) {
        if (root == null) return null;
        return new TreeNode(root.val, root.left, root.right);
    }

    // Deep copy: recursively clones independent heap nodes
    public static TreeNode deepCopy(TreeNode root) {
        if (root == null) return null;
        TreeNode copy = new TreeNode(root.val);
        copy.left = deepCopy(root.left);
        copy.right = deepCopy(root.right);
        return copy;
    }
}

// 3. OBJECT INSTANTIATION STEP-BY-STEP:
// TreeNode node = new TreeNode(10);
// 1. Allocates 24-32 bytes on Heap (16-byte object header + 4-byte int + 2 reference pointers)
// 2. val = 0, left = null, right = null (Zero-initialization)
// 3. Object constructor runs, sets val = 10
// 4. 'node' variable on current thread stack holds memory address (e.g., 0x4F10)`
  },
  {
    id: 'oop-four-pillars',
    title: 'The 4 Pillars of OOP Applied to Coding & Interviews',
    category: 'OOP Architecture',
    icon: 'sparkles',
    summary: 'Encapsulation, Inheritance, Polymorphism, and Abstraction decoded with production design patterns.',
    description: 'Interviewers do not want textbook definitions. They want to see you apply OOP to design maintainable, testable, and extensible architectures like bulletproof immutable classes and dynamic method dispatch.',
    keyTakeaways: [
      'Encapsulation: Protecting internal state. How to make a class 100% Immutable: `final` class, `private final` fields, no setters, and defensive copies of mutable fields (`List`, `Date`).',
      'Inheritance: Bounded IS-A hierarchy. Java prohibits multiple class inheritance to avoid the Diamond Problem (method collision).',
      'Polymorphism: Compile-time (Method Overloading) vs Runtime (Method Overriding via JVM virtual method table `vtable`).',
      'Abstraction: Abstract classes (shared state + partial implementation) vs Interfaces (pure behavioral contract, multi-implementation capability).'
    ],
    code: `// ========================================================
// 1. ENCAPSULATION: BULLETPROOF IMMUTABLE CLASS
// ========================================================
// Rule 1: Declare class 'final' so it cannot be subclassed
public final class ImmutableUser {
    // Rule 2: All fields private and final
    private final String username;
    private final List<String> roles;

    public ImmutableUser(String username, List<String> roles) {
        this.username = username;
        // Rule 3: DEFENSIVE COPY in constructor!
        // Never assign caller's mutable list directly!
        this.roles = new ArrayList<>(roles);
    }

    public String getUsername() { return username; }

    // Rule 4: DEFENSIVE COPY in getter!
    // Never return the mutable reference directly!
    public List<String> getRoles() {
        return Collections.unmodifiableList(roles);
    }
}

// ========================================================
// 2. ABSTRACTION & POLYMORPHISM (Strategy Pattern in Interviews)
// ========================================================
public interface EvictionStrategy<K> {
    K evictKey();
}

public class LRUEviction<K> implements EvictionStrategy<K> {
    @Override
    public K evictKey() {
        // Evict least recently used key
        return null;
    }
}

public class LFUEviction<K> implements EvictionStrategy<K> {
    @Override
    public K evictKey() {
        // Evict least frequently used key
        return null;
    }
}

// Polymorphism in action: consumer depends on the abstraction!
public class Cache<K, V> {
    private final EvictionStrategy<K> strategy;
    public Cache(EvictionStrategy<K> strategy) {
        this.strategy = strategy; // Interchangeable at runtime!
    }
}`
  },
  {
    id: 'static-metaspace',
    title: 'The `static` Keyword, Metaspace & Execution Order',
    category: 'Core Mechanics',
    icon: 'cpu',
    summary: 'Class-level variables, static blocks execution order, method hiding, and memory-leak-free static nested classes.',
    description: 'The `static` keyword binds members to the Class itself rather than any instance. Misusing static leads to concurrency bugs in multi-threaded servers and memory leaks when large collections are held statically.',
    keyTakeaways: [
      '`static` fields live in Metaspace (method area) and are shared across all instances in the JVM ClassLoader.',
      'Static methods cannot access `this` or instance fields because no instance exists when calling `ClassName.method()`.',
      'Method Hiding vs Overriding: Static methods CANNOT be overridden. If a child class defines the same static method, it merely hides the parent static method.',
      'Execution Order Puzzle: Static blocks run ONCE when class is loaded $\to$ Instance init blocks run on each `new` $\to$ Constructor body runs.'
    ],
    code: `// ========================================================
// 1. STATIC EXECUTION ORDER PUZZLE (Popular Interview Question!)
// ========================================================
public class ExecutionOrderDemo {
    // 1. Static block runs FIRST when class is loaded by JVM
    static {
        System.out.println("1. Static block executed (Once per ClassLoader)");
    }

    // 2. Instance initializer block runs on EVERY 'new' before constructor
    {
        System.out.println("2. Instance block executed (Before constructor)");
    }

    // 3. Constructor runs LAST
    public ExecutionOrderDemo() {
        System.out.println("3. Constructor executed");
    }

    public static void main(String[] args) {
        System.out.println("--- Creating Instance A ---");
        new ExecutionOrderDemo();
        System.out.println("--- Creating Instance B ---");
        new ExecutionOrderDemo();
    }
}
/* OUTPUT:
   1. Static block executed (Once per ClassLoader)
   --- Creating Instance A ---
   2. Instance block executed (Before constructor)
   3. Constructor executed
   --- Creating Instance B ---
   2. Instance block executed (Before constructor)
   3. Constructor executed
*/

// ========================================================
// 2. WHY STATIC NESTED CLASSES PREVENT MEMORY LEAKS
// ========================================================
public class Graph {
    // ❌ NON-STATIC INNER CLASS (Anti-pattern for DSA):
    // Holds a hidden implicit reference to Graph.this!
    // Prevents garbage collector from collecting Graph even if only Node is needed!
    // class Node { int id; }

    // ✅ STATIC NESTED CLASS (FAANG Standard):
    // Standalone blueprint with ZERO memory link to outer Graph instance!
    public static class Node {
        public int id;
        public List<Node> neighbors = new ArrayList<>();
        public Node(int id) { this.id = id; }
    }
}`
  },
  {
    id: 'generics-type-erasure',
    title: 'Generics & Type Erasure Demystified',
    category: 'Type System',
    icon: 'code',
    summary: 'Compile-time type safety, the PECS rule (Producer Extends, Consumer Super), and why `new T()` is illegal.',
    description: 'Generics were introduced in Java 5 to eliminate dangerous runtime `ClassCastException`s. The compiler guarantees type safety, then erases type parameters in bytecode so legacy JVMs can execute it.',
    keyTakeaways: [
      'Type Erasure: The compiler replaces `<T>` with `Object` (or its upper bound `<T extends Number>` $\to$ `Number`) and inserts synthetic type casts in bytecode.',
      'Why `new T()` or `new T[10]` is illegal: At runtime, the JVM has no idea what `T` is! It was erased during compilation.',
      'The PECS Rule: Producer Extends, Consumer Super.',
      'Use `? extends T` when your method only READS data from the collection (it produces items).',
      'Use `? super T` when your method only WRITES data into the collection (it consumes items).'
    ],
    code: `// ========================================================
// 1. GENERIC CLASS IMPLEMENTATION
// ========================================================
public class Pair<K, V> {
    private final K key;
    private final V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
}

// ========================================================
// 2. THE PECS RULE IN ACTION (Collections.copy signature)
// ========================================================
public class GenericsDemo {
    // src PRODUCES items to read -> ? extends T
    // dest CONSUMES items to write -> ? super T
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        for (int i = 0; i < src.size(); i++) {
            dest.set(i, src.get(i)); // Safe reading from src and writing to dest!
        }
    }

    public static void testPECS() {
        List<Number> numList = new ArrayList<>();
        List<Integer> intList = List.of(10, 20, 30);

        // Integer IS-A Number, so Integer extends Number:
        // copy(dest=List<Number>, src=List<Integer>) works cleanly!
        copy(numList, intList);
    }
}`
  },
  {
    id: 'string-internals-pool',
    title: 'String Internals, String Pool & StringBuilder',
    category: 'Core Mechanics',
    icon: 'sparkles',
    summary: 'The String Constant Pool, immutability rationales, and why `+` in loops creates O(N^2) memory disasters.',
    description: 'In Java, `String` is the most optimized and specialized class in the entire runtime. Understanding String interning and memory allocation prevents $O(N^2)$ algorithmic slowdowns.',
    keyTakeaways: [
      'String Constant Pool: A dedicated table in Heap memory where identical string literals (`"hello"`) are deduplicated and shared.',
      '`"cat" == "cat"` is `true` (both refer to the same pool address). `new String("cat") == "cat"` is `false` (forces a new heap object outside the pool).',
      'Why String is Immutable: Security (URLs/passwords can’t be tampered with), Thread-Safety (no lock contention), and Caching the HashCode for $O(1)$ HashMap lookups.',
      'String Concatenation in Loops: `s += "a"` creates a new String on every single iteration, copying all previous characters ($O(N^2)$ time). Always use `StringBuilder` ($O(1)$ amortized append).'
    ],
    code: `// ========================================================
// 1. STRING POOL DEMYSTIFIED
// ========================================================
public class StringInternals {
    public static void main(String[] args) {
        String s1 = "java";                   // In String Constant Pool
        String s2 = "java";                   // Reuses exact same pool object!
        String s3 = new String("java");       // Forces new heap allocation!

        System.out.println(s1 == s2);         // TRUE  (Same memory address)
        System.out.println(s1 == s3);         // FALSE (Different heap objects)
        System.out.println(s1.equals(s3));    // TRUE  (Same character sequence)

        // Manual interning moves or finds string in pool:
        String s4 = s3.intern();
        System.out.println(s1 == s4);         // TRUE!

        // ====================================================
        // 2. THE O(N^2) CONCATENATION TRAP VS STRINGBUILDER
        // ====================================================
        // ❌ BAD: O(N^2) time, allocates N strings, triggers GC pressure
        String bad = "";
        for (int i = 0; i < 1000; i++) {
            bad += i; // New String created on every loop!
        }

        // ✅ OPTIMAL: O(N) time, contiguous char/byte array buffer
        StringBuilder sb = new StringBuilder(1000); // Pre-allocate initial capacity
        for (int i = 0; i < 1000; i++) {
            sb.append(i);
        }
        String good = sb.toString();
    }
}`
  },
  {
    id: 'exceptions-architecture',
    title: 'Exception Handling Architecture & Best Practices',
    category: 'Robustness & Clean Code',
    icon: 'layers',
    summary: 'Throwable hierarchy, Checked vs Unchecked exceptions, and modern try-with-resources.',
    description: 'Exception handling ensures production systems fail gracefully instead of abruptly terminating. Knowing when to use RuntimeExceptions vs Checked Exceptions is tested in all senior engineering screens.',
    keyTakeaways: [
      'Throwable Hierarchy: `Error` (Serious JVM faults like `StackOverflowError`, `OutOfMemoryError`; do not catch!) vs `Exception` (Application-level recoverable issues).',
      'Checked Exceptions: Subclasses of `Exception` (e.g. `IOException`, `SQLException`). Enforced at compile time; must be caught or declared with `throws`.',
      'Unchecked / Runtime Exceptions: Subclasses of `RuntimeException` (e.g. `NullPointerException`, `IllegalArgumentException`). Caused by developer programming bugs; no forced `throws`.',
      'Try-With-Resources (Java 7+): Any resource implementing `AutoCloseable` is automatically closed at the end of the block, preventing file descriptor and connection leaks.'
    ],
    code: `// ========================================================
// 1. MODERN TRY-WITH-RESOURCES (Zero Leaks, Clean Code)
// ========================================================
import java.io.*;

public class ExceptionBestPractices {
    // Automatically closes reader & stream EVEN if an IOException is thrown!
    public String readFirstLine(String path) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            return br.readLine();
        } // br.close() is called automatically here!
    }

    // ========================================================
    // 2. INTERVIEW GOTCHA: NEVER SWALLOW EXCEPTIONS!
    // ========================================================
    public void processData(String input) {
        try {
            if (input == null) {
                // Throw specific unchecked exception with clear message
                throw new IllegalArgumentException("Input payload cannot be null");
            }
        } catch (IllegalArgumentException e) {
            // ❌ NEVER DO THIS: catch (Exception e) {} // Silently hides fatal bugs!
            // ✅ Always log or wrap in a custom exception:
            System.err.println("Validation failed: " + e.getMessage());
            throw e; // Re-throw to caller
        }
    }
}`
  },
  {
    id: 'garbage-collection-generations',
    title: 'Garbage Collection Generations, Mark-Sweep & G1/ZGC',
    category: 'JVM & Memory',
    icon: 'cpu',
    summary: 'Weak Generational Hypothesis, Eden, Survivor S0/S1, Tenured space, Stop-The-World (STW) pauses, and modern low-latency collectors.',
    description: 'The JVM does not scan all memory on every allocation. It relies on the Weak Generational Hypothesis: "Most objects die young." Understanding GC tuning, object promotion, and GC algorithms is expected in senior backend and FAANG interviews.',
    keyTakeaways: [
      'Weak Generational Hypothesis: 95%+ of all objects allocated in Java become unreachable shortly after creation (e.g. iterators, method-local strings).',
      'Young Generation: Split into Eden Space (~80%) and two Survivor Spaces (S0/From, S1/To, ~10% each). Minor GC runs only on Young Gen and is ultra-fast.',
      'Aging & Promotion: Objects surviving a Minor GC cycle get copied to Survivor space with age incremented. When age hits `-XX:MaxTenuringThreshold` (default 15), they promote to Old/Tenured Gen.',
      'Old Generation (Tenured): Stores long-lived objects (Spring beans, thread pools, global caches). Major/Full GC scans both Young and Old Gen, causing longer Stop-The-World pauses.',
      'Modern GC Collectors: G1GC (default since Java 9, splits heap into 2048 regions), ZGC (sub-millisecond STW pause times regardless of heap size up to 16TB), and Shenandoah.'
    ],
    code: `// ========================================================
// 1. OBJECT PROMOTION LIFECYCLE IN HEAP
// ========================================================
/*
  HEAP MEMORY ARCHITECTURE:
  ┌───────────────────────────────────────────────────────────────┐
  │                    YOUNG GENERATION                           │
  │ ┌───────────────────────────┐ ┌──────────────┐ ┌────────────┐ │
  │ │        Eden Space         │ │ Survivor S0  │ │Survivor S1 │ │
  │ │  All 'new' allocations    │ │ (From Space) │ │ (To Space) │ │
  │ └─────────────┬─────────────┘ └───────┬──────┘ └─────┬──────┘ │
  └───────────────┼───────────────────────┼──────────────┼────────┘
                  │                       │              │
                  │ Minor GC Triggered    │ Object Age++ │ Age == 15
                  ▼                       ▼              ▼
  ┌───────────────────────────────────────────────────────────────┐
  │                  OLD / TENURED GENERATION                     │
  │  Stores long-lived Singletons, DB Connection Pools, Caches    │
  └───────────────────────────────────────────────────────────────┘
  ┌───────────────────────────────────────────────────────────────┐
  │                   METASPACE (Native Memory)                   │
  │  Stores Class Bytecode, Method Metadata, Static References    │
  └───────────────────────────────────────────────────────────────┘
*/

// ========================================================
// 2. DIAGNOSING A MEMORY LEAK (Classic Interview Question)
// ========================================================
import java.util.*;

public class MemoryLeakGotcha {
    // ❌ DANGEROUS: Static collection holds strong references indefinitely!
    private static final List<byte[]> cache = new ArrayList<>();

    public static void leakyMethod() {
        // Even when caller finishes, the 1MB array CANNOT be collected
        // because the static 'cache' roots it in GC Roots!
        cache.add(new byte[1024 * 1024]);
    }

    // ✅ SOLUTION: Use WeakHashMap or clear references when done
    private static final Map<Object, byte[]> safeCache = new WeakHashMap<>();
}`
  },
  {
    id: 'modern-java-features',
    title: 'Modern Java (17+ & 21): Records, Sealed Classes & Pattern Matching',
    category: 'Modern Java Architecture',
    icon: 'sparkles',
    summary: 'Say goodbye to Lombok: Immutable Records, Sealed type hierarchies, switch pattern matching, and Virtual Threads (Project Loom).',
    description: 'Java has evolved rapidly from Java 8 to Java 17 (LTS) and Java 21 (LTS). Interviewers assess whether you write modern, idiomatic Java using algebraic data types, pattern matching, and lightweight concurrency.',
    keyTakeaways: [
      'Java Records (Java 14/16+): Pure immutable data carriers. Automatically generates `final` fields, canonical constructor, `equals()`, `hashCode()`, and `toString()`. No Lombok required!',
      'Sealed Classes & Interfaces (Java 17+): Restricts which classes can extend or implement them using `permits`. Enables closed, compiler-verified algebraic type hierarchies.',
      'Pattern Matching for `switch` & `instanceof` (Java 17/21+): Replaces clunky `if (obj instanceof String) String s = (String) obj;` with inline pattern variables and exhaustiveness checking.',
      'Virtual Threads (Project Loom, Java 21+): JVM-managed lightweight threads (~few KB of RAM vs 1MB for OS platform threads). Allows 1,000,000 concurrent threads on a standard server without reactive programming complexity!'
    ],
    code: `// ========================================================
// 1. JAVA RECORDS (Bulletproof Immutable DTOs)
// ========================================================
// Eliminates 80 lines of boilerplate getters, equals, hashCode, toString!
public record Order(String orderId, double amount, List<String> items) {
    // Compact constructor for validation (no need to repeat this.x = x):
    public Order {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }
        // Defensive copy for immutability:
        items = List.copyOf(items);
    }
}

// ========================================================
// 2. SEALED HIERARCHIES & PATTERN MATCHING SWITCH
// ========================================================
// Only approved payment types can exist in the system!
public sealed interface PaymentMethod permits CreditCard, PayPal, Crypto {}

public record CreditCard(String cardNumber, String cvv) implements PaymentMethod {}
public record PayPal(String email) implements PaymentMethod {}
public record Crypto(String walletAddress, String coin) implements PaymentMethod {}

public class PaymentProcessor {
    // Compiler verifies EXHAUSTIVENESS — no default branch needed!
    // If someone adds ApplePay to PaymentMethod, this code won't compile until handled!
    public String processPayment(PaymentMethod payment) {
        return switch (payment) {
            case CreditCard(var num, var cvv) -> "Charged card ending in " + num.substring(num.length() - 4);
            case PayPal(var email)            -> "Billed PayPal account: " + email;
            case Crypto(var wallet, var coin) -> "Transferred " + coin + " to " + wallet;
        };
    }
}

// ========================================================
// 3. VIRTUAL THREADS (Project Loom, Java 21)
// ========================================================
public class VirtualThreadDemo {
    public static void runMillionTasks() {
        // Spawns 10,000 virtual threads concurrently in milliseconds!
        // When a virtual thread blocks on DB/Network I/O, the underlying
        // OS carrier thread is unmounted and freed to execute other work!
        try (var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 10_000; i++) {
                final int id = i;
                executor.submit(() -> {
                    Thread.sleep(100); // Non-blocking to OS thread!
                    return "Result " + id;
                });
            }
        } // Executor auto-closes and awaits all tasks!
    }
}`
  },
  {
    id: 'multithreading-jmm-concurrency',
    title: 'Java Memory Model, `volatile`, Happens-Before & Concurrency',
    category: 'Concurrency & Multithreading',
    icon: 'layers',
    summary: 'CPU caches, instruction reordering, the `volatile` keyword, happens-before guarantees, and `ReentrantLock`.',
    description: 'Multi-threaded bugs are non-deterministic and can crash production servers under high load. Understanding CPU core caches, cache coherence, and Java Memory Model guarantees is essential for high-frequency trading and distributed backend roles.',
    keyTakeaways: [
      'The Visibility Problem: Each CPU core has its own L1/L2 cache. Without memory barriers, Thread B might read a stale cached variable written by Thread A.',
      '`volatile` Keyword: Guarantees visibility (all reads/writes go directly to shared main RAM) and prevents instruction reordering. It does NOT guarantee atomicity (e.g. `count++` is NOT atomic).',
      'Happens-Before Relationship: If Action A happens-before Action B, memory writes by A are guaranteed to be visible to B (e.g. unlock of monitor happens-before subsequent lock; write to `volatile` happens-before read).',
      '`synchronized` vs `ReentrantLock`: `synchronized` is block-scoped and managed by JVM; `ReentrantLock` allows interruptible locking, timed lock attempts (`tryLock()`), and fair queueing.'
    ],
    code: `// ========================================================
// 1. THE VOLATILE VISIBILITY GOTCHA
// ========================================================
public class WorkerThread implements Runnable {
    // ❌ WITHOUT volatile: Thread cache might loop forever even if flag becomes false!
    // ✅ WITH volatile: CPU cache line invalidated; immediately reads from RAM.
    private volatile boolean running = true;

    @Override
    public void run() {
        while (running) {
            // Do batch processing...
        }
        System.out.println("Worker stopped cleanly.");
    }

    public void stop() {
        this.running = false; // Immediately visible across all CPU cores!
    }
}

// ========================================================
// 2. ATOMIC VARIABLES VS SYNCHRONIZED
// ========================================================
import java.util.concurrent.atomic.AtomicInteger;

public class CounterDemo {
    // ❌ volatile int count = 0; count++; // RACE CONDITION! Read-Modify-Write is 3 ops!
    
    // ✅ OPTION A: Lock-free atomic hardware CAS (Compare-And-Swap) instruction
    private final AtomicInteger atomicCount = new AtomicInteger(0);

    public void increment() {
        atomicCount.incrementAndGet(); // Ultra-fast hardware level atomicity
    }

    public int getCount() {
        return atomicCount.get();
    }
}`
  },
  {
    id: 'completable-future-reactive',
    title: 'CompletableFuture & Non-Blocking Asynchronous Pipelines',
    category: 'Concurrency & Multithreading',
    icon: 'cpu',
    summary: 'Why `Future.get()` destroys throughput, composing asynchronous computations (`thenCompose`, `thenCombine`), thread pool isolation, and timeout fallbacks.',
    description: 'Modern backend microservices cannot afford to block operating system threads waiting on database queries and downstream REST/gRPC calls. `CompletableFuture` provides functional, monadic composition for asynchronous non-blocking programming in core Java.',
    keyTakeaways: [
      'The Blocking Future Problem: Calling `Future.get()` halts the calling thread until execution completes, wasting server resources and causing thread starvation under load.',
      'Asynchronous Chaining: `thenApply()` (map value), `thenCompose()` (flatMap to another async stage), `thenCombine()` (merge two independent concurrent futures when both finish).',
      'Thread Pool Isolation: Never run blocking I/O on `ForkJoinPool.commonPool()`! Always pass a dedicated bounded `ExecutorService` (`supplyAsync(..., customExecutor)`).',
      'Resilience & Timeouts: Handle failures gracefully with `exceptionally()`, `handle()`, and `.orTimeout(timeout, unit)` (Java 9+).'
    ],
    code: `// ========================================================
// 1. NON-BLOCKING MICROSERVICE AGGREGATOR PIPELINE
// ========================================================
import java.util.concurrent.*;

public class AsyncAggregatorService {
    // Isolated thread pool for network I/O calls
    private final ExecutorService ioPool = Executors.newFixedThreadPool(16);

    public CompletableFuture<UserDashboard> fetchDashboard(String userId) {
        // Fetch User Profile (Async Task 1)
        CompletableFuture<UserProfile> profileFuture = CompletableFuture
            .supplyAsync(() -> queryUserService(userId), ioPool)
            .orTimeout(500, TimeUnit.MILLISECONDS);

        // Fetch User Credit Balance (Async Task 2, runs concurrently!)
        CompletableFuture<CreditBalance> creditFuture = CompletableFuture
            .supplyAsync(() -> queryPaymentService(userId), ioPool)
            .orTimeout(500, TimeUnit.MILLISECONDS);

        // Fetch Recent Transactions (Async Task 3, runs concurrently!)
        CompletableFuture<List<Transaction>> txFuture = CompletableFuture
            .supplyAsync(() -> queryLedgerService(userId), ioPool)
            .orTimeout(800, TimeUnit.MILLISECONDS);

        // Merge all 3 independent futures asynchronously when ALL complete:
        return CompletableFuture.allOf(profileFuture, creditFuture, txFuture)
            .thenApply(v -> {
                // All three have completed without blocking any OS thread!
                UserProfile profile = profileFuture.join();
                CreditBalance credit = creditFuture.join();
                List<Transaction> txs = txFuture.join();
                return new UserDashboard(profile, credit, txs);
            })
            .exceptionally(ex -> {
                // Graceful degradation / fallback if a downstream service fails or times out
                System.err.println("Downstream failure: " + ex.getMessage());
                return UserDashboard.fallback(userId);
            });
    }

    private UserProfile queryUserService(String id) { return new UserProfile(id, "Sanjay"); }
    private CreditBalance queryPaymentService(String id) { return new CreditBalance(150.0); }
    private List<Transaction> queryLedgerService(String id) { return List.of(); }
}`
  },
  {
    id: 'forkjoin-workstealing',
    title: 'ForkJoinPool, Work-Stealing Algorithm & The Parallel Streams Trap',
    category: 'Concurrency & Multithreading',
    icon: 'layers',
    summary: 'Divide-and-conquer parallelism, double-ended work-stealing deques, and why calling blocking I/O inside `parallelStream()` paralyzes the JVM.',
    description: 'The `ForkJoinPool` is the engine powering Java 8+ Parallel Streams and `CompletableFuture`. Understanding work-stealing and why the shared common pool is easily poisoned is a hallmark of staff software engineering.',
    keyTakeaways: [
      'Work-Stealing Architecture: Each worker thread maintains its own double-ended queue (Deque). A thread pushes and pops subtasks from the HEAD (LIFO order for cache locality). Idle threads STEAL work from the TAIL of busy threads (FIFO order).',
      'RecursiveTask<V> vs RecursiveAction: Base case computation vs splitting work into sub-tasks via `fork()` and gathering with `join()`.',
      'The Deadly Parallel Streams Trap: `collection.parallelStream()` by default uses the shared global `ForkJoinPool.commonPool()`. If a single query blocks on HTTP or Database I/O inside a parallel stream, all worker threads lock up, starving the entire JVM application!',
      'Golden Rule: Use `parallelStream()` ONLY for CPU-bound computations with large datasets ($N > 10,000$). NEVER use it for I/O!'
    ],
    code: `// ========================================================
// 1. RECURSIVETASK DIVIDE-AND-CONQUER PARALLELISM
// ========================================================
import java.util.concurrent.*;

public class ParallelArraySum extends RecursiveTask<Long> {
    private static final int THRESHOLD = 10_000; // Granularity limit
    private final int[] arr;
    private final int start;
    private final int end;

    public ParallelArraySum(int[] arr, int start, int end) {
        this.arr = arr;
        this.start = start;
        this.end = end;
    }

    @Override
    protected Long compute() {
        // Base case: small enough to compute sequentially
        if (end - start <= THRESHOLD) {
            long sum = 0;
            for (int i = start; i < end; i++) sum += arr[i];
            return sum;
        }

        // Divide: Split array in half
        int mid = start + (end - start) / 2;
        ParallelArraySum leftTask = new ParallelArraySum(arr, start, mid);
        ParallelArraySum rightTask = new ParallelArraySum(arr, mid, end);

        // Fork left task asynchronously onto worker deque
        leftTask.fork();

        // Compute right task in CURRENT thread (avoids extra context switch!)
        long rightResult = rightTask.compute();

        // Join: await left task result and combine
        long leftResult = leftTask.join();

        return leftResult + rightResult;
    }

    // ========================================================
    // 2. THE COMMON POOL TRAP: ISOLATE BLOCKING TASKS!
    // ========================================================
    public static void safeParallelExecution() {
        int[] data = new int[1_000_000];
        // ✅ Isolated custom ForkJoinPool: cannot affect shared common pool!
        ForkJoinPool customPool = new ForkJoinPool(Runtime.getRuntime().availableProcessors());
        try {
            long total = customPool.invoke(new ParallelArraySum(data, 0, data.length));
            System.out.println("Sum: " + total);
        } finally {
            customPool.shutdown();
        }
    }
}`
  }
];
