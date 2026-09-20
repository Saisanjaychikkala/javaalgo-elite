// Top 20 FAANG Core Java Interview Questions, Answers & Code Examples

export const javaInterviewQA = [
  {
    id: 'hashcode-equals-contract',
    question: 'Why must you ALWAYS override hashCode() if you override equals()?',
    category: 'Collections & Contracts',
    difficulty: 'High Frequency',
    shortAnswer: 'If two objects are equal according to equals(), they MUST return the exact same hashCode(). Otherwise, HashMaps and HashSets will lose and corrupt your objects.',
    detailedExplanation: `In Java, the **Hash Contract** states:
1. If \`o1.equals(o2)\` is \`true\`, then \`o1.hashCode() == o2.hashCode()\` MUST be \`true\`.
2. If two objects have the same hashCode, they do NOT necessarily have to be equal (hash collision).

**What happens if you break this rule?**
When you insert a key into a \`HashMap\`, it uses \`key.hashCode()\` to choose which bucket to store it in. If you later search for the exact same logical key using an equal object with a different default hashCode (derived from its memory address), the HashMap looks in the **wrong bucket** and returns \`null\`!`,
    codeSnippet: `class Employee {
    int id;
    String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee emp = (Employee) o;
        return this.id == emp.id && Objects.equals(this.name, emp.name);
    }

    // ⚡ MANDATORY: Must override hashCode too!
    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}`
  },
  {
    id: 'string-immutability',
    question: 'Why is String immutable in Java?',
    category: 'Core Java',
    difficulty: 'High Frequency',
    shortAnswer: 'For Security, Thread-Safety, String Pool memory efficiency, and HashCode caching.',
    detailedExplanation: `James Gosling designed \`String\` to be immutable for 4 foundational reasons:
1. **Security**: Strings carry database credentials, network URLs, and file paths. If mutable, an unauthorized thread could alter a verified network address before execution.
2. **Thread-Safety**: Because internal character arrays cannot change, Strings are inherently thread-safe and can be shared across 100 threads with zero locking overhead.
3. **String Constant Pool**: Reusing identical string literals in heap memory saves immense RAM. If Strings were mutable, changing one literal would corrupt all other references!
4. **HashCode Caching**: The hash code of a String is calculated once lazily and cached. This makes \`String\` the fastest and most reliable key in HashMaps.`,
    codeSnippet: `String s1 = "Java";
String s2 = s1.concat("Algo"); // Returns a NEW String!

System.out.println(s1); // Still "Java" (Immutable!)
System.out.println(s2); // "JavaAlgo"`
  },
  {
    id: 'equals-vs-double-equals',
    question: 'What is the exact difference between == and .equals()?',
    category: 'Core Java',
    difficulty: 'Fundamentals',
    shortAnswer: '== compares memory reference addresses (identity). .equals() compares logical values (equivalence).',
    detailedExplanation: `1. **== Operator**: Checks if two references point to the exact same physical byte address on the Heap.
2. **.equals() Method**: Inherited from \`java.lang.Object\`. By default, \`Object.equals()\` does \`this == obj\` (reference comparison). Classes like \`String\`, \`Integer\`, and \`List\` override \`.equals()\` to compare internal contents character-by-character or value-by-value.

**The Integer Cache Gotcha**:
\`Integer a = 127, b = 127; a == b\` is \`true\` because the JVM caches integers from -128 to 127.
\`Integer c = 128, d = 128; c == d\` is \`false\` because they are separate heap objects! Always use \`.equals()\`.`,
    codeSnippet: `String a = new String("test");
String b = new String("test");

System.out.println(a == b);      // FALSE (Different heap addresses!)
System.out.println(a.equals(b));  // TRUE  (Identical contents!)`
  },
  {
    id: 'static-method-overriding',
    question: 'Can we override a static method in Java?',
    category: 'OOP Architecture',
    difficulty: 'Tricky',
    shortAnswer: 'No! Static methods cannot be overridden. Defining the same static method in a subclass is called Method Hiding.',
    detailedExplanation: `Method overriding relies on **Dynamic Method Dispatch** (runtime polymorphism via the JVM virtual method table \`vtable\`), which depends on the actual runtime instance on the Heap.

Static methods belong to the **Class**, not any instance. The compiler binds static method calls at compile time based on the **declared reference type**, not the runtime object.`,
    codeSnippet: `class Parent {
    static void show() { System.out.println("Parent"); }
}

class Child extends Parent {
    static void show() { System.out.println("Child"); } // Method Hiding!
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show(); // PRINTS "Parent"! (Resolved by declared type Parent)
    }
}`
  },
  {
    id: 'interface-multiple-inheritance',
    question: 'Can an interface extend multiple interfaces in Java?',
    category: 'OOP Architecture',
    difficulty: 'Medium',
    shortAnswer: 'Yes! An interface can extend multiple interfaces using commas: interface C extends A, B.',
    detailedExplanation: `While Java classes are strictly limited to single inheritance (\`class Child extends Parent\`) to avoid state collisions, **interfaces do not hold instance state**. Therefore, an interface can combine contracts from multiple parent interfaces.

In Java 8+, if two parent interfaces provide conflicting \`default\` methods with the exact same signature, the compiler forces the implementing class to explicitly override and resolve the conflict.`,
    codeSnippet: `interface Printable { void print(); }
interface Serializable { void serialize(); }

// Valid: Multiple inheritance of interfaces
interface Document extends Printable, Serializable {
    void edit();
}`
  },
  {
    id: 'shallow-vs-deep-copy',
    question: 'What is the difference between Shallow Copy and Deep Copy?',
    category: 'Object Mechanics',
    difficulty: 'Medium',
    shortAnswer: 'Shallow copy copies fields and primitive values, but duplicates reference pointers (nested objects are shared). Deep copy recursively duplicates all nested objects in memory.',
    detailedExplanation: `If an object contains nested objects (e.g. an \`ArrayList\` or another object):
- **Shallow Copy**: The outer object is cloned, but its internal fields still point to the original nested objects. Modifying a nested object through the clone alters the original!
- **Deep Copy**: The outer object AND all child objects are recursively instantiated as fresh copies on the Heap. The two copies are 100% independent.`,
    codeSnippet: `// Shallow Copy:
Person clone = new Person(original.name, original.addressList); 
// clone.addressList and original.addressList point to SAME heap list!

// Deep Copy:
Person deepClone = new Person(original.name, new ArrayList<>(original.addressList));`
  },
  {
    id: 'final-finally-finalize',
    question: 'What is the difference between final, finally, and finalize()?',
    category: 'Core Java',
    difficulty: 'High Frequency',
    shortAnswer: 'final is a modifier keyword (constants, non-extensible classes, un-overridable methods). finally is an exception cleanup block. finalize() is an obsolete Garbage Collection hook.',
    detailedExplanation: `1. **final**:
   - Variable: Value cannot be reassigned (constant).
   - Method: Cannot be overridden by subclasses.
   - Class: Cannot be inherited (e.g., \`public final class String\`).
2. **finally**: A block following \`try-catch\` that ALWAYS executes (even if an exception is thrown or a \`return\` statement is hit), used for closing sockets/streams.
3. **finalize()**: A method in \`java.lang.Object\` historically called before an object was garbage collected. It was deprecated in Java 9 and removed/disabled in modern Java because it was unpredictable and caused resource leaks.`,
    codeSnippet: `final int MAX = 100; // Cannot change

try {
    // Risky code
} catch (Exception e) {
    // Handle
} finally {
    // Guaranteed to execute!
}`
  },
  {
    id: 'pass-by-value-proof',
    question: 'Is Java pass-by-value or pass-by-reference?',
    category: 'JVM & Memory',
    difficulty: 'High Frequency',
    shortAnswer: 'Java is STRICTLY pass-by-value. Always and without exception.',
    detailedExplanation: `When you pass an object to a method, Java does NOT pass the object itself, nor does it pass a reference-by-reference (like C++ \`int& x\`).

Java passes the **value of the pointer address**!
- Because the address is copied, you can mutate the fields of the object: \`param.val = 99\` modifies the object on the Heap.
- BUT if you reassign the reference: \`param = new Node()\`, it only overwrites the local copy of the pointer in the current stack frame. The caller's reference remains unchanged!`,
    codeSnippet: `void swap(Point p1, Point p2) {
    Point temp = p1;
    p1 = p2;
    p2 = temp;
} // Swapping local pointer copies does NOTHING to the caller's points!`
  },
  {
    id: 'comparable-vs-comparator',
    question: 'What is the difference between Comparable and Comparator?',
    category: 'Collections & Sorting',
    difficulty: 'High Frequency',
    shortAnswer: 'Comparable defines natural ordering inside the class (compareTo). Comparator defines external custom sorting strategies (compare) via lambdas.',
    detailedExplanation: `| Feature | Comparable | Comparator |
| :--- | :--- | :--- |
| **Package** | \`java.lang\` | \`java.util\` |
| **Method** | \`int compareTo(T o)\` | \`int compare(T o1, T o2)\` |
| **Location** | Inside the class definition | External separate class or lambda |
| **Flexibility** | Exactly ONE natural order | Unlimited dynamic sorting variations |`,
    codeSnippet: `// Comparable: Natural order
class Player implements Comparable<Player> {
    int score;
    public int compareTo(Player o) {
        return Integer.compare(this.score, o.score);
    }
}

// Comparator: Dynamic external strategy
Comparator<Player> byScoreDesc = (p1, p2) -> Integer.compare(p2.score, p1.score);`
  },
  {
    id: 'fail-fast-vs-fail-safe',
    question: 'What is the difference between Fail-Fast and Fail-Safe Iterators?',
    category: 'Collections & Concurrency',
    difficulty: 'Medium',
    shortAnswer: 'Fail-Fast throws ConcurrentModificationException immediately upon concurrent change. Fail-Safe iterates over a copy without throwing exceptions.',
    detailedExplanation: `1. **Fail-Fast** (\`ArrayList\`, \`HashMap\`, \`HashSet\`):
   - Uses an internal counter \`modCount\`. If the collection is structurally modified during iteration (added or removed outside of the iterator's own \`remove()\` method), it throws \`ConcurrentModificationException\` immediately.
2. **Fail-Safe** (\`CopyOnWriteArrayList\`, \`ConcurrentHashMap\`):
   - Operates on a cloned snapshot of the collection. It allows modifications without throwing exceptions, but may not reflect the latest writes.`,
    codeSnippet: `List<String> list = new ArrayList<>(List.of("A", "B", "C"));
// ❌ Fail-Fast Crash:
// for (String s : list) { list.remove(s); }

// ✅ Correct way using Collection.removeIf:
list.removeIf(s -> s.equals("B"));`
  },
  {
    id: 'hashmap-internals-java8',
    question: 'How does HashMap work internally in Java 8+?',
    category: 'Collections & Internals',
    difficulty: 'High Frequency',
    shortAnswer: 'Array of buckets with linked lists. If a bucket exceeds 8 elements (TREEIFY_THRESHOLD) and capacity >= 64, it converts to a Red-Black Tree for O(log N) lookup.',
    detailedExplanation: `1. **Storage**: An array of buckets \`Node<K, V>[] table\`. Default initial capacity is 16, load factor is 0.75.
2. **Index Math**: Calculates hash using XOR high-bit folding: \`hash ^ (hash >>> 16)\`. Bucket index is \`(n - 1) & hash\`.
3. **Collision Handling**:
   - In Java 7: collisions formed a linked list ($O(N)$ worst case).
   - In Java 8+: when bucket size reaches **8** and table capacity $\ge 64$, the linked list converts to a **Balanced Red-Black Tree** (\`TreeNode\`), guaranteeing $O(\log N)$ worst-case search time against hash-collision attacks!
   - When elements drop below **6** during deletion, it untreeifies back to a linked list.`,
    codeSnippet: `// Default table size = 16, threshold for resizing = 16 * 0.75 = 12 elements.
Map<String, Integer> map = new HashMap<>(32, 0.75f);`
  },
  {
    id: 'hashmap-vs-concurrenthashmap',
    question: 'What is the difference between HashMap, Hashtable, and ConcurrentHashMap?',
    category: 'Concurrency',
    difficulty: 'High Frequency',
    shortAnswer: 'HashMap is unsynchronized. Hashtable locks the entire map with synchronized. ConcurrentHashMap uses lock striping and CAS for maximum concurrency.',
    detailedExplanation: `1. **HashMap**: Non-thread-safe. Fast, permits one \`null\` key and multiple \`null\` values.
2. **Hashtable**: Legacy Java 1.0 class. Every method has \`synchronized\`, blocking all other threads even for concurrent reads. Does not permit null keys or values.
3. **ConcurrentHashMap**: Modern high-performance concurrent map.
   - Reads are completely non-blocking.
   - Writes use fine-grained **CAS (Compare-And-Swap)** instructions and lock only the single bucket head node being modified, allowing hundreds of threads to write simultaneously to different buckets!`,
    codeSnippet: `ConcurrentMap<String, Integer> cMap = new ConcurrentHashMap<>();
cMap.put("counter", 1);
cMap.compute("counter", (k, v) -> v + 1); // Atomic update!`
  },
  {
    id: 'java-records',
    question: 'What are Java Records (Java 16+) and when should you use them?',
    category: 'Modern Java',
    difficulty: 'Medium',
    shortAnswer: 'A record is a concise, immutable data carrier class. It auto-generates constructor, getters, equals(), hashCode(), and toString() in one line.',
    detailedExplanation: `Historically, creating a simple Coordinate or DTO class in Java required 50+ lines of getters, constructors, \`equals()\`, and \`hashCode()\`.

With Java 16+ **Records**:
- The record class is implicitly \`final\` and extends \`java.lang.Record\`.
- All fields are implicitly \`private final\`.
- It automatically generates canonical constructors, accessors (e.g., \`point.x()\` instead of \`getX()\`), \`equals()\`, and \`hashCode()\`.
- **Ideal for**: LeetCode BFS coordinate states, pair objects in PriorityQueues, and API DTOs.`,
    codeSnippet: `// 1 LINE replaces 50 lines of boilerplate!
public record Point(int x, int y) {}

Point p = new Point(5, 10);
System.out.println(p.x()); // 5 (accessor)
System.out.println(p);     // Point[x=5, y=10]`
  },
  {
    id: 'callable-vs-runnable',
    question: 'What is the difference between Callable and Runnable?',
    category: 'Concurrency',
    difficulty: 'Medium',
    shortAnswer: 'Runnable cannot return a result or throw checked exceptions. Callable returns a parameterized Future<V> and can throw checked exceptions.',
    detailedExplanation: `| Feature | Runnable | Callable<V> |
| :--- | :--- | :--- |
| **Method** | \`public void run()\` | \`public V call() throws Exception\` |
| **Return Type** | \`void\` | Generic type \`V\` |
| **Exceptions** | Cannot throw checked exceptions | Can throw checked \`Exception\` |
| **Execution** | \`new Thread(runnable).start()\` | \`executorService.submit(callable)\` |`,
    codeSnippet: `// Runnable: Fire and forget
Runnable task1 = () -> System.out.println("Running");

// Callable: Computes and returns value
Callable<Integer> task2 = () -> {
    // Can do complex math and throw checked exceptions
    return 42;
};`
  },
  {
    id: 'stackoverflow-vs-outofmemory',
    question: 'What causes a StackOverflowError vs an OutOfMemoryError?',
    category: 'JVM & Memory',
    difficulty: 'High Frequency',
    shortAnswer: 'StackOverflowError occurs when method call depth exceeds thread stack size. OutOfMemoryError occurs when Heap RAM is completely exhausted.',
    detailedExplanation: `1. **StackOverflowError**:
   - Occurs in **Stack Memory**.
   - Most common cause: Infinite or excessively deep recursion without a proper base case.
   - Each method call pushes a new Stack Frame. When the allocated thread stack (usually 1 MB) is exhausted, the JVM crashes.
2. **OutOfMemoryError (OOM)**:
   - Occurs in **Heap Memory** (or Metaspace).
   - Most common cause: Memory leaks where live references prevent the Garbage Collector from freeing unused objects (e.g. adding items continuously to a \`static List\`).`,
    codeSnippet: `// StackOverflowError:
void recurse() { recurse(); }

// OutOfMemoryError:
List<byte[]> leak = new ArrayList<>();
while (true) leak.add(new byte[1024 * 1024]); // 1MB chunks until heap full`
  },
  {
    id: 'diamond-problem',
    question: 'What is the Diamond Problem and how does Java handle it?',
    category: 'OOP Architecture',
    difficulty: 'Medium',
    shortAnswer: 'Multiple inheritance ambiguity where a class inherits identical methods from two parent paths. Java bans multiple class inheritance and requires explicit resolution for interfaces.',
    detailedExplanation: `If Class D inherits from Class B and Class C, and both B and C override a method from Class A: which method should Class D inherit? This ambiguity is called the **Diamond Problem**.

**How Java Solves It**:
1. Java classes can only \`extend\` ONE class.
2. For interfaces with conflicting Java 8 \`default\` methods, the Java compiler raises a compile error and forces the implementing class to explicitly override the method and specify: \`InterfaceA.super.doSomething();\`.`,
    codeSnippet: `interface A {
    default void hello() { System.out.println("A"); }
}
interface B {
    default void hello() { System.out.println("B"); }
}

class C implements A, B {
    // ⚡ Must override and resolve conflict:
    @Override
    public void hello() {
        A.super.hello(); // Explicitly choose A's default method
    }
}`
  },
  {
    id: 'abstract-class-vs-interface',
    question: 'What is the difference between an Abstract Class and an Interface in Java 17+?',
    category: 'OOP Architecture',
    difficulty: 'High Frequency',
    shortAnswer: 'Abstract classes have instance state and constructors. Interfaces define behavioral contracts with default/static methods and support multiple implementation.',
    detailedExplanation: `| Aspect | Abstract Class | Interface |
| :--- | :--- | :--- |
| **Constructors** | Yes (called via \`super()\`) | NO constructors |
| **State / Fields** | Can have instance variables with any visibility | Only \`public static final\` constants |
| **Multiple Inheritance** | A class can extend only ONE class | A class can implement MULTIPLE interfaces |
| **Default Methods** | Standard concrete methods | \`default\` methods (since Java 8) |
| **Primary Purpose** | Code reuse for closely related classes | Decoupling behavior across unrelated classes |`,
    codeSnippet: `abstract class Animal {
    String name; // Instance state
    Animal(String name) { this.name = name; } // Constructor
    abstract void makeSound();
}

interface Flyable {
    void fly(); // Pure behavioral contract
}`
  },
  {
    id: 'garbage-collection-roots',
    question: 'How does the Java Garbage Collector know an object is dead?',
    category: 'JVM & Memory',
    difficulty: 'Advanced',
    shortAnswer: 'Through Reachability Analysis starting from GC Roots. If an object cannot be reached by traversing references from GC Roots, it is dead and eligible for collection.',
    detailedExplanation: `Java does **NOT** use reference counting (which fails on circular references like Node A -> Node B -> Node A).

Instead, modern JVMs use **Tracing Reachability Analysis**:
1. It identifies **GC Roots**:
   - Active thread stack local variables and parameter references.
   - Static variables in loaded classes.
   - JNI (Java Native Interface) native references.
2. The GC traverses the reference graph starting from all GC Roots.
3. Any object that cannot be reached through this graph traversal is marked as **unreachable** (dead), and will be cleared during the next GC cycle.`,
    codeSnippet: `// Node A and Node B point to each other (Circular Reference)
Node a = new Node();
Node b = new Node();
a.next = b;
b.prev = a;

a = null;
b = null;
// Neither node is reachable from any Stack variable (GC Root)!
// BOTH are collected by the JVM, despite pointing to each other!`
  },
  {
    id: 'pecs-rule-generics',
    question: 'What is the PECS rule in Java Generics?',
    category: 'Type System',
    difficulty: 'Advanced',
    shortAnswer: 'PECS stands for Producer Extends, Consumer Super. Use ? extends T to read; use ? super T to write.',
    detailedExplanation: `When designing reusable generic APIs with wildcards:
1. **Producer Extends (\`? extends T\`)**:
   - If the collection **produces** items for you to read, use \`? extends T\`.
   - You can safely read items as type \`T\`.
   - You CANNOT add any items into this collection (except \`null\`) because the compiler cannot guarantee the exact subtype!
2. **Consumer Super (\`? super T\`)**:
   - If the collection **consumes** items you write into it, use \`? super T\`.
   - You can safely add items of type \`T\` (or subtypes of \`T\`).
   - You cannot safely read items as anything more specific than \`Object\`.`,
    codeSnippet: `// Producer: Reading numbers from list
public double sumOfList(List<? extends Number> list) {
    double sum = 0.0;
    for (Number n : list) sum += n.doubleValue(); // Safe read
    // list.add(10); // COMPILE ERROR! Cannot add to a producer
    return sum;
}

// Consumer: Writing integers into list
public void addNumbers(List<? super Integer> list) {
    list.add(1); // Safe write!
    list.add(2);
}`
  },
  {
    id: 'memory-leaks-in-java',
    question: 'Can memory leaks happen in Java despite automatic Garbage Collection?',
    category: 'JVM & Memory',
    difficulty: 'High Frequency',
    shortAnswer: 'Yes! A memory leak occurs when unused objects remain reachable from a GC Root (like static collections or unclosed resources), preventing collection.',
    detailedExplanation: `The Garbage Collector can only collect objects that are **unreachable**. If your program maintains an unnecessary live reference to an object you will never use again, the JVM cannot collect it!

**Top 4 Common Memory Leaks in Java**:
1. **Static Collections**: Storing objects in a \`static List\` or \`static Map\` that is never cleared. Since \`static\` variables live in Metaspace as GC Roots, everything inside them stays in Heap memory forever.
2. **Unclosed System Resources**: Database connections, sockets, and file streams that aren't wrapped in \`try-with-resources\`.
3. **Non-Static Inner Classes**: Holding a hidden reference to an outer enclosing class instance.
4. **Listeners / Callbacks**: Registering event listeners without deregistering them when objects are destroyed.`,
    codeSnippet: `// ❌ CLASSIC MEMORY LEAK:
public class CacheLeak {
    private static final List<byte[]> cache = new ArrayList<>();

    public void process() {
        cache.add(new byte[1024 * 1024]); // Static list grows forever until OOM!
    }
}`
  },
  {
    id: 'checked-vs-unchecked-exceptions',
    question: 'What is the difference between Checked and Unchecked Exceptions? When do you use each?',
    category: 'Core Java',
    difficulty: 'High Frequency',
    shortAnswer: 'Checked exceptions are compile-time enforced (must be caught or declared); Unchecked exceptions (RuntimeException subclasses) are programming errors discovered at runtime.',
    detailedExplanation: `Java's exception hierarchy splits under \`java.lang.Throwable\`:

**Checked Exceptions** (inherit from \`Exception\`, NOT \`RuntimeException\`):
- Compiler FORCES you to handle them: use \`try-catch\` or declare \`throws\`.
- Represent recoverable external conditions: file not found, network failure, database timeout.
- Examples: \`IOException\`, \`SQLException\`, \`FileNotFoundException\`, \`ClassNotFoundException\`.
- Use when: the caller can reasonably recover (retry the network call, prompt user for a different file).

**Unchecked Exceptions** (inherit from \`RuntimeException\`):
- NOT checked by the compiler. No need to catch or declare.
- Represent programming bugs: null dereference, invalid array index, bad type cast.
- Examples: \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`, \`IllegalArgumentException\`, \`ClassCastException\`.
- Use when: it's a programming error that should NEVER happen if code is correct.

**The Rule of Thumb**: If the caller can reasonably recover → checked. If it's a bug in the code → unchecked (RuntimeException).`,
    codeSnippet: `// CHECKED: IOException — caller must handle it
public String readFile(String path) throws IOException {
    // Compiler enforces handling!
    return Files.readString(Path.of(path));
}

// UNCHECKED: IllegalArgumentException — programming error
public void setAge(int age) {
    if (age < 0) throw new IllegalArgumentException("Age cannot be negative: " + age);
    this.age = age;
}`
  },
  {
    id: 'java8-streams-collectors',
    question: 'Explain Java 8 Streams — what makes them powerful and what are their key operations?',
    category: 'Java 8+ Modern Features',
    difficulty: 'High Frequency',
    shortAnswer: 'Streams are lazy, functional pipelines over data sources that compose map/filter/reduce operations without modifying the source, and evaluate only when a terminal operation is called.',
    detailedExplanation: `A **Stream** is NOT a data structure — it's a PIPELINE of operations applied to a source (Collection, array, I/O).

**3 Phases of Every Stream Pipeline:**
1. **Source**: \`list.stream()\`, \`Arrays.stream(arr)\`, \`Stream.of(...)\`
2. **Intermediate Operations** (lazy — return a new Stream, not evaluated yet):
   - \`filter(Predicate)\` — keep elements matching condition
   - \`map(Function)\` — transform each element
   - \`flatMap(Function)\` — transform + flatten nested streams
   - \`sorted()\`, \`distinct()\`, \`limit(n)\`, \`peek()\`
3. **Terminal Operations** (trigger execution of the entire pipeline):
   - \`collect(Collectors.toList())\` — gather results
   - \`forEach(action)\`, \`count()\`, \`findFirst()\`, \`anyMatch()\`
   - \`reduce(identity, BinaryOperator)\` — fold into single value

**Why lazy evaluation?**: If you chain \`filter + map + findFirst\` on 1 million elements, the stream stops as soon as it finds the FIRST match. Without laziness, it would filter all 1M first.`,
    codeSnippet: `List<Employee> employees = List.of(...);

// Find top 3 salaries of engineers in decreasing order
List<Double> top3Salaries = employees.stream()
    .filter(e -> "Engineering".equals(e.getDepartment()))    // Intermediate (lazy)
    .mapToDouble(Employee::getSalary)                        // Intermediate (lazy)
    .boxed()
    .sorted(Comparator.reverseOrder())                       // Intermediate (lazy)
    .limit(3)                                                // Intermediate (lazy)
    .collect(Collectors.toList());                           // Terminal → triggers pipeline!

// Group employees by department
Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));`
  },
  {
    id: 'comparable-vs-comparator',
    question: 'What is the difference between Comparable and Comparator? When do you use each?',
    category: 'Collections & Contracts',
    difficulty: 'High Frequency',
    shortAnswer: 'Comparable defines a class\'s single natural ordering via compareTo() inside the class. Comparator is an external, pluggable sorting strategy that can define multiple different orderings without modifying the class.',
    detailedExplanation: `**Comparable<T>** (implements inside the class):
- Method: \`int compareTo(T other)\`
- Returns: negative (this < other), 0 (equal), positive (this > other)
- Use when: there's ONE obvious natural order for the class (e.g., Integer naturally orders by value).
- Affects: \`Collections.sort(list)\`, \`TreeSet\`, \`TreeMap\` default behavior.

**Comparator<T>** (external pluggable strategy):
- Method: \`int compare(T a, T b)\`
- A functional interface → can be written as a Lambda!
- Use when: you need MULTIPLE orderings, or you CAN'T modify the class (library class), or the natural order isn't right for your use case.
- Affected: \`Collections.sort(list, comparator)\`, \`PriorityQueue(comparator)\`, \`TreeMap(comparator)\`

**Comparator API (Java 8+):**
- \`Comparator.comparing(Employee::getSalary)\`
- \`.thenComparing(Employee::getName)\`
- \`.reversed()\``,
    codeSnippet: `// Comparable: Natural ordering by ID (inside class)
class Employee implements Comparable<Employee> {
    int id; String name; double salary;
    
    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.id, other.id); // Natural: by ID
    }
}

// Comparator: Custom/external orderings (outside class)
Comparator<Employee> bySalaryDesc = Comparator
    .comparingDouble(Employee::getSalary)
    .reversed();

Comparator<Employee> byNameThenSalary = Comparator
    .comparing(Employee::getName)
    .thenComparingDouble(Employee::getSalary);

// Usage
employees.sort(bySalaryDesc);
PriorityQueue<Employee> pq = new PriorityQueue<>(bySalaryDesc);`
  },
  {
    id: 'synchronized-vs-reentrantlock',
    question: 'What is the difference between synchronized and ReentrantLock? Why use ReentrantLock?',
    category: 'Concurrency & Multithreading',
    difficulty: 'Advanced',
    shortAnswer: 'synchronized is simple, implicit mutual exclusion built into the JVM. ReentrantLock is explicit, more flexible, and supports timed locking, interruptible locking, tryLock(), and multiple condition variables.',
    detailedExplanation: `**synchronized** (intrinsic lock / monitor):
- Built into every Java object.
- Simplest way to achieve mutual exclusion — no imports needed.
- Lock released automatically when block exits (even on exception).
- Limitations: Cannot try to acquire without blocking, cannot interrupt a waiting thread, only ONE condition variable per lock (wait/notify), cannot be acquired across methods.

**ReentrantLock** (\`java.util.concurrent.locks\`):
- Must call \`lock()\` and ALWAYS \`unlock()\` in a finally block.
- **Extra powers**:
  - \`tryLock()\` — attempt to acquire without blocking; returns boolean immediately.
  - \`tryLock(time, unit)\` — attempt for a limited time, then give up.
  - \`lockInterruptibly()\` — thread waiting for lock can be interrupted.
  - **Multiple Condition Variables**: \`lock.newCondition()\` — create separate queues for producers and consumers (like a full buffer vs empty buffer condition).
  - \`lock.isHeldByCurrentThread()\` — introspection.

**Use ReentrantLock when**: you need timed/interruptible locking, tryLock, or multiple conditions. Use \`synchronized\` for simple cases — it's cleaner and JVM-optimized.`,
    codeSnippet: `// synchronized — simple but limited
public synchronized void increment() {
    count++;
}

// ReentrantLock — powerful and flexible
private final ReentrantLock lock = new ReentrantLock();
private final Condition notFull  = lock.newCondition();
private final Condition notEmpty = lock.newCondition();

public void put(T item) throws InterruptedException {
    lock.lock(); // Must unlock in finally!
    try {
        while (buffer.size() == capacity) notFull.await();
        buffer.add(item);
        notEmpty.signal(); // Wake up one consumer
    } finally {
        lock.unlock(); // ALWAYS release in finally
    }
}`
  },
  {
    id: 'functional-interfaces',
    question: 'What are the 4 core Functional Interfaces in Java 8? When do you use each?',
    category: 'Java 8+ Modern Features',
    difficulty: 'Medium',
    shortAnswer: 'Supplier<T> (produces), Consumer<T> (consumes), Predicate<T> (tests condition → boolean), Function<T, R> (transforms). These are the building blocks of all lambda and stream operations.',
    detailedExplanation: `Java 8 introduced \`java.util.function\` package with functional interfaces (interfaces with exactly one abstract method — @FunctionalInterface).

**The Big 4:**

1. **\`Supplier<T>\`** — Takes NO input, produces output.
   - Method: \`T get()\`
   - Use: Lazy evaluation, factory methods, default value generators.
   - Example: \`() -> new ArrayList<>()\`

2. **\`Consumer<T>\`** — Takes input, produces NO output (void). Side effects.
   - Method: \`void accept(T t)\`
   - Use: \`forEach\`, logging, saving to database.
   - Example: \`employee -> System.out.println(employee.getName())\`

3. **\`Predicate<T>\`** — Takes input, returns \`boolean\`.
   - Method: \`boolean test(T t)\`
   - Use: \`filter()\` in streams, validation rules.
   - Example: \`employee -> employee.getSalary() > 100_000\`

4. **\`Function<T, R>\`** — Takes input of type T, returns output of type R.
   - Method: \`R apply(T t)\`
   - Use: \`map()\` in streams, data transformation.
   - Example: \`employee -> employee.getName().toUpperCase()\``,
    codeSnippet: `// Supplier: creates a new ArrayList lazily
Supplier<List<String>> listFactory = ArrayList::new;
List<String> list = listFactory.get();

// Consumer: logs each order
Consumer<Order> logger = order -> System.out.println("Processing: " + order.getId());
orders.forEach(logger);

// Predicate: filter high-value customers
Predicate<Customer> isVIP = customer -> customer.getTotalSpend() > 10_000;
List<Customer> vips = customers.stream().filter(isVIP).collect(Collectors.toList());

// Function: extract names from employees
Function<Employee, String> nameExtractor = Employee::getName;
List<String> names = employees.stream().map(nameExtractor).collect(Collectors.toList());`
  },
  {
    id: 'thread-local',
    question: 'What is ThreadLocal? What problem does it solve?',
    category: 'Concurrency & Multithreading',
    difficulty: 'Advanced',
    shortAnswer: 'ThreadLocal provides each thread with its own independent copy of a variable, avoiding shared state and synchronization overhead. Used for per-request context in web servers (user session, database connections, transaction IDs).',
    detailedExplanation: `**The Problem**: In a web server with 100 concurrent threads, you need each request to carry its own context (e.g., logged-in user ID, database connection, locale). If you use a shared variable, threads corrupt each other's data. If you pass the context as a parameter through every method call, the code becomes unwieldy.

**ThreadLocal<T>** provides a per-thread storage slot. When thread A reads \`threadLocal.get()\`, it gets A's value. When thread B reads it, it gets B's value. Completely isolated.

**How it works internally**: The JVM maintains a \`ThreadLocalMap\` inside each \`Thread\` object. The \`ThreadLocal\` instance is just a key that maps to the thread-local value stored in that map.

**Critical Warning**: ThreadLocal variables in a Thread Pool (like Tomcat's servlet thread pool) are DANGEROUS! Threads are reused across requests. You MUST call \`remove()\` after each request, or the previous request's data leaks into the next request on the same thread!

**Real use cases**:
- Spring's \`TransactionSynchronizationManager\` (per-thread DB transaction)
- SLF4J's MDC (Mapped Diagnostic Context — add request ID to every log line)
- JDBC connection holders in a web application`,
    codeSnippet: `public class RequestContext {
    // Each thread gets its own copy of the current user
    private static final ThreadLocal<User> CURRENT_USER = new ThreadLocal<>();

    public static void setUser(User user) { CURRENT_USER.set(user); }
    public static User getUser() { return CURRENT_USER.get(); }

    // CRITICAL: Always remove after request to prevent leaks in thread pools!
    public static void clear() { CURRENT_USER.remove(); }
}

// In servlet/filter:
try {
    RequestContext.setUser(authenticatedUser);
    processRequest(); // All method calls can read CURRENT_USER
} finally {
    RequestContext.clear(); // MUST clean up before thread returns to pool
}`
  },
  {
    id: 'singleton-pattern',
    question: 'How do you implement a thread-safe Singleton in Java? What are the pitfalls?',
    category: 'Design Patterns',
    difficulty: 'High Frequency',
    shortAnswer: 'The best thread-safe Singleton uses the "Enum Singleton" or "Bill Pugh Initialization-on-Demand Holder" pattern. Double-checked locking requires volatile. Simple synchronized getInstance() works but is slow.',
    detailedExplanation: `A **Singleton** ensures only ONE instance of a class exists in the JVM. 4 implementation approaches:

1. **Eager Initialization** (thread-safe, simple):
   - Instance created at class load time. Thread-safe by class loader guarantee.
   - Disadvantage: Created even if never used (wasteful for expensive resources).

2. **Synchronized getInstance()** (thread-safe, slow):
   - \`synchronized\` keyword on \`getInstance()\` method.
   - Problem: Every call acquires the lock, even after initialization. Huge performance cost under contention.

3. **Double-Checked Locking (DCL) + volatile** (thread-safe, fast):
   - Check null twice: once without lock (fast path), once with lock (slow path).
   - The \`volatile\` keyword is MANDATORY to prevent instruction reordering. Without it, a partially constructed object can be seen by another thread!

4. **Bill Pugh / Initialization-on-Demand Holder** (Best for most cases):
   - Inner static class holds the instance. Class is loaded lazily on first \`getInstance()\` call.
   - Thread-safe by JVM class-loading guarantee. No synchronized needed. Zero overhead after creation.

5. **Enum Singleton** (Absolutely safe, prevents reflection/serialization attacks):
   - Java enums are always singleton by design. Serialization-safe out of the box. Cannot be broken by reflection.`,
    codeSnippet: `// ✅ BEST OPTION 1: Bill Pugh Holder Pattern
public class DatabaseConnection {
    private DatabaseConnection() {} // Private constructor

    private static class Holder {
        // Loaded ONLY when getInstance() is first called (lazy)
        private static final DatabaseConnection INSTANCE = new DatabaseConnection();
    }

    public static DatabaseConnection getInstance() {
        return Holder.INSTANCE; // No sync needed! Thread-safe by class loader
    }
}

// ✅ BEST OPTION 2: Enum Singleton (Joshua Bloch recommendation)
public enum AppConfig {
    INSTANCE;
    // Cannot be broken by reflection, serialization, or clone()
    public String getDatabaseUrl() { return "jdbc:postgresql://..."; }
}

// Usage:
DatabaseConnection conn = DatabaseConnection.getInstance();
AppConfig config = AppConfig.INSTANCE;`
  },
  {
    id: 'optional-api',
    question: 'How do you properly use Optional<T> in Java? What should you NEVER do with it?',
    category: 'Java 8+ Modern Features',
    difficulty: 'Medium',
    shortAnswer: 'Use Optional as a return type for methods that might not find a value. Use orElse/orElseGet/orElseThrow to extract values. NEVER use Optional.get() without isPresent() — NEVER store Optional in fields or pass as parameters.',
    detailedExplanation: `**What is Optional?**: A container object that may or may not contain a non-null value. It makes the "no result" case EXPLICIT in the API contract rather than implicitly returning null.

**Creating Optional:**
- \`Optional.of(value)\` — wraps a non-null value (throws NPE if null passed!)
- \`Optional.ofNullable(value)\` — wraps a value that might be null
- \`Optional.empty()\` — explicitly empty

**Extracting Values (the RIGHT way):**
- \`orElse(default)\` — return value or a default
- \`orElseGet(Supplier)\` — return value or compute a default lazily
- \`orElseThrow(ExceptionSupplier)\` — return value or throw
- \`ifPresent(Consumer)\` — execute only if present
- \`map(Function)\` — transform the value inside Optional (stays wrapped)
- \`flatMap(Function)\` — when transformation also returns Optional

**Common Mistakes (NEVER do these):**
1. \`optional.get()\` without checking \`optional.isPresent()\` first → defeats the purpose, still throws \`NoSuchElementException\`
2. Storing Optional in instance fields → wastes memory, Optional is not serializable
3. Passing Optional as a method parameter → caller still needs to handle null Optional
4. Using Optional for Collections — just return empty collection instead`,
    codeSnippet: `// Repository returns Optional — makes "not found" explicit
public Optional<User> findById(int id) {
    return userRepository.stream()
        .filter(u -> u.getId() == id)
        .findFirst();
}

// ❌ WRONG: Back to NPE territory
User user = findById(42).get(); // NoSuchElementException if empty!

// ✅ RIGHT: Provide default
User user = findById(42).orElse(User.GUEST);

// ✅ RIGHT: Throw business exception
User user = findById(42)
    .orElseThrow(() -> new UserNotFoundException("User 42 not found"));

// ✅ RIGHT: Chain transformations safely
String email = findById(42)
    .map(User::getContact)
    .map(Contact::getEmail)
    .orElse("no-email@default.com");`
  }
];
