# Swift Latest Documentation - Retrieved from Context7 MCP

This documentation was retrieved using the Context7 MCP tool on 6/12/2025, 6:46:55 AM (Asia/Shanghai, UTC+8:00).

## Source Information

- **Library ID**: `/swiftlang/swift`
- **Description**: The Swift Programming Language
- **Code Snippets**: 4003
- **Trust Score**: 8.8

---

## Embedded Swift Language Feature Support Matrix

This table details the current support status for various Swift language features within the experimental Embedded Swift environment. It specifies which features are fully supported, intentionally unsupported long-term, or not yet supported, highlighting key limitations and design decisions.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/EmbeddedSwift/EmbeddedSwiftStatus.md

| **Language Feature**                    | **Currently Supported In Embedded Swift**                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| _Anything not listed below_             | Yes                                                                                                                     |
| Library Evolution (resilience)          | No, intentionally unsupported long-term                                                                                 |
| Objective-C interoperability            | No, intentionally unsupported long-term                                                                                 |
| Non-WMO builds                          | No, intentionally unsupported long-term (WMO should be used)                                                            |
| Existentials (values of protocol types) | Only class-bound existentials (for protocols derived from AnyObject) are supported                                      |
| Any                                     | No, currently disallowed                                                                                                |
| AnyObject                               | Yes                                                                                                                     |
| Metatypes                               | No, currently only allowed as unused arguments (type hints)                                                             |
| Untyped throwing                        | No, intentionally unsupported long-term (typed throwing should be used instead)                                         |
| Weak references, unowned references     | No                                                                                                                      |
| Non-final generic class methods         | No, intentionally unsupported long-term, see <[Embedded Swift -- Non-final generic methods](NonFinalGenericMethods.md)> |
| Parameter packs (variadic generics)     | No, not yet supported                                                                                                   |

---

## Embedded Swift Non-Standard Library Feature Support

Outlines the compatibility of non-standard library Swift features like concurrency, interop with C/C++/ObjC, and library evolution within Embedded Swift.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/EmbeddedSwift/EmbeddedSwiftStatus.md

```
Synchronization module: Partial (only Atomic types, no Mutex)
Swift Concurrency: Partial, experimental (basics of actors and tasks work in single-threaded concurrency mode)
C interop: Yes
C++ interop: Yes
ObjC interop: No, intentionally unsupported long-term
Library Evolution: No, intentionally unsupported long-term
```

---

## Embedded Swift Standard Library Feature Support

Details the support status of various Swift standard library features in Embedded Swift, including dynamic containers, protocols, conversion utilities, and reflection capabilities.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/EmbeddedSwift/EmbeddedSwiftStatus.md

```
Array (dynamic heap-allocated container): Yes
Array slices: Yes
assert, precondition, fatalError: Partial, only StaticStrings can be used as a failure message
Bool, Integer types, Float types: Yes
Codable, Encodable, Decodable: No
Collection + related protocols: Yes
Collection algorithms (sort, reverse): Yes
CustomStringConvertible, CustomDebugStringConvertible: Yes, except those that require reflection (e.g. Array's .description)
Dictionary (dynamic heap-allocated container): Yes
Floating-point conversion to string: No
Floating-point parsing: No
FixedWidthInteger + related protocols: Yes
Hashable, Equatable, Comparable protocols: Yes
InputStream, OutputStream: No
Integer conversion to string: Yes
Integer parsing: Yes
KeyPaths: Partial (only compile-time constant key paths to stored properties supported, only usable in MemoryLayout and UnsafePointer APIs)
Lazy collections: Yes
ManagedBuffer: Yes
Mirror (runtime reflection): No, intentionally unsupported long-term
Objective-C bridging: No, intentionally unsupported long-term
Optional: Yes
print / debugPrint: Partial (only String, string interpolation, StaticStrings, integers, pointers and booleans, and custom types that are CustomStringConvertible)
Range, ClosedRange, Stride: Yes
Result: Yes
Set (dynamic heap-allocated container): Yes
SIMD types: Yes
StaticString: Yes
String (dynamic): Yes
String interpolations: Partial (only strings, integers, booleans, and custom types that are CustomStringConvertible can be interpolated)
Unicode: Yes
Unsafe[Mutable][Raw][Buffer]Pointer: Yes
VarArgs: No
```

---

## Experimental Features and Compiler Options

### Adding Swift Compiler Options and Experimental Features

This extensive snippet adds numerous compile options specifically for Swift language targets. It includes standard flags like `-explicit-module-build` and `-strict-memory-safety`, along with a long list of experimental features and frontend flags to enable advanced Swift language capabilities and optimizations.

**Source**: https://github.com/swiftlang/swift/blob/main/Runtimes/Supplemental/Synchronization/CMakeLists.txt

```cmake
add_compile_options(
  $<$<COMPILE_LANGUAGE:Swift>:-explicit-module-build>
  $<$<COMPILE_LANGUAGE:Swift>:-nostdlibimport>
  $<$<COMPILE_LANGUAGE:Swift>:-enable-builtin-module>
  $<$<COMPILE_LANGUAGE:Swift>:-strict-memory-safety>
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature NoncopyableGenerics2>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature SuppressedAssociatedTypes>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature SE427NoInferenceOnExtension>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature NonescapableTypes>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature LifetimeDependence>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature InoutLifetimeDependence>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature LifetimeDependenceMutableAccessors>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-upcoming-feature MemberImportVisibility>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature RawLayout>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature StaticExclusiveOnly>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-enable-experimental-feature Extern>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-Xfrontend -enforce-exclusivity=unchecked>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-Xfrontend -target-min-inlining-version -Xfrontend min>"
  "$<$<COMPILE_LANGUAGE:Swift>:SHELL:-Xfrontend -enable-lexical-lifetimes=false>"
  "$<$<AND:$<BOOL:${${PROJECT_NAME}_ENABLE_LIBRARY_EVOLUTION}>,$<COMPILE_LANGUAGE:Swift>>:-enable-library-evolution>"
  "$<$<AND:$<BOOL:${${PROJECT_NAME}_ENABLE_PRESPECIALIZATION}>,$<COMPILE_LANGUAGE:Swift>>:SHELL:-Xfrontend -prespecialize-generic-metadata>")
```

### Enabling Multiple Experimental Swift Features

This snippet adds a series of experimental feature flags to `swift_stdlib_compile_flags`, including `Macros`, `FreestandingMacros`, `Extern`, `BitwiseCopyable`, `ValueGenerics`, `AddressableParameters`, `AddressableTypes`, and `AllowUnsafeAttribute`. It also enforces strict memory safety.

**Source**: https://github.com/swiftlang/swift/blob/main/stdlib/public/core/CMakeLists.txt

```cmake
list(APPEND swift_stdlib_compile_flags "-enable-experimental-feature" "Macros")
list(APPEND swift_stdlib_compile_flags "-enable-experimental-feature" "FreestandingMacros")
list(APPEND swift_stdlib_compile_compile_flags "-enable-experimental-feature" "Extern")
list(APPEND swift_stdlib_compile_flags "-enable-experimental-feature" "BitwiseCopyable")
list(APPEND swift_stdlib_compile_flags "-enable-experimental-feature" "ValueGenerics")
list(APPEND swift_stdlib_compile_flags "-enable-experimental-feature" "AddressableParameters")
list(APPEND swift_stdlib_compile_flags "-enable-experimental-feature" "AddressableTypes")
list(APPEND swift_stdlib_compile_flags "-enable-experimental-feature" "AllowUnsafeAttribute")
list(APPEND swift_stdlib_compile_flags "-strict-memory-safety")
```

---

## Concurrency Features

### NonisolatedNonsendingByDefault Feature

Shell command enables the migration process for the `NonisolatedNonsendingByDefault` upcoming feature in Swift. When executed, it provides fix-its that automatically add the `@concurrent` attribute to existing nonisolated async functions and closures, ensuring current async semantics are preserved.

**Source**: https://github.com/swiftlang/swift/blob/main/userdocs/diagnostics/nonisolated-nonsending-by-default.md

```sh
-enable-upcoming-feature NonisolatedNonsendingByDefault:migrate
```

### Swift: Explicit `nonisolated(nonsending)` Before Feature Enablement

This Swift example illustrates how to achieve the `nonisolated(nonsending)` semantics (running on the caller's actor) before the `NonisolatedNonsendingByDefault` feature is enabled. In this scenario, `nonisolated(nonsending)` must be explicitly applied, and `@concurrent` becomes the default for functions that should always switch off the actor.

**Source**: https://github.com/swiftlang/swift/blob/main/userdocs/diagnostics/nonisolated-nonsending-by-default.md

```swift
struct S: Sendable {
  func performSync() {}

  nonisolated(nonsending)
  func performAsync() async {}

  // `@concurrent` is the default
  func alwaysSwitch() async {}
}
```

### Configure Swift Concurrency Runtime Flags

Appends experimental features and strict memory safety flags to the Swift concurrency runtime build configuration. These flags enable features like 'IsolatedAny' and 'AllowUnsafeAttribute' and enforce memory safety during compilation.

**Source**: https://github.com/swiftlang/swift/blob/main/stdlib/public/Concurrency/CMakeLists.txt

```cmake
list(APPEND SWIFT_RUNTIME_CONCURRENCY_SWIFT_FLAGS
  "-enable-experimental-feature"
  "IsolatedAny"
  )

list(APPEND SWIFT_RUNTIME_CONCURRENCY_SWIFT_FLAGS "-strict-memory-safety")
list(APPEND SWIFT_RUNTIME_CONCURRENCY_SWIFT_FLAGS "-enable-experimental-feature" "AllowUnsafeAttribute")
```

---

## Memory Safety and Debug Information

### Flag Unsafe Language Features: `unowned(unsafe)` in Swift

Shows how the direct use of unsafe language features like `unowned(unsafe)` variables is identified as memory-unsafe by the strict memory safety checks.

**Source**: https://github.com/swiftlang/swift/blob/main/userdocs/diagnostics/strict-memory-safety.md

```swift
unowned(unsafe) var parentNode: TreeNode<T>
```

### Updating Variable Locations with Debug Values in Swift SIL

This SIL snippet demonstrates how `debug_value` instructions are used to track changes in a variable's value and its associated debug location. The first `debug_value` defines the initial state of variable 'a', while the second updates its value and the instruction's location, crucially maintaining the original declaration location and scope for debugging purposes. This reflects how a variable assignment in source code is represented in SIL.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/HowToUpdateDebugInfo.md

```sil
%0 = integer_literal $Int, 2
debug_value %0 : $Int, var, name "a", loc "a.swift":2:5, scope 2
%2 = integer_literal $Int, 3
debug_value %2 : $Int, var, (name "a", loc "a.swift":2:5, scope 2), loc "a.swift":3:3, scope 2
```

### Swift Source Code for Variable Reassignment

This is a simple Swift source code example demonstrating the declaration and subsequent reassignment of an integer variable 'a'. This code serves as the high-level representation for the corresponding SIL debug information updates shown in the previous snippet, illustrating how source-level operations map to SIL instructions.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/HowToUpdateDebugInfo.md

```swift
var a = 2
a = 3
```

---

## Standard Library Updates

### Swift \_\_VaListBuilder API Variable Changes

Details modifications to variables within the `__VaListBuilder` type, including new API additions without `@available` annotations, removals, and significant type changes with corresponding mangled name updates.

**Source**: https://github.com/swiftlang/swift/blob/main/test/api-digester/Inputs/stability-stdlib-abi-without-asserts-arm64.txt

```
__VaListBuilder.count:
  Status: New API
  Details: Without '@available', added to a non-resilient type

__VaListBuilder.fpRegistersUsed:
  Status: Removed

__VaListBuilder.gpRegistersUsed:
  Status: Removed

__VaListBuilder.header:
  Status: Removed

__VaListBuilder.requiredAlignmentInBytes:
  Status: New API
  Details: Without '@available', added to a non-resilient type

__VaListBuilder.storage:
  Status: Declared Type Change
  From: Swift.ContiguousArray<Swift.Int>
  To: Swift.UnsafeMutablePointer<Swift.Int>?
  Mangled Name Change:
    From: 'Swift.__VaListBuilder.storage : Swift.ContiguousArray<Swift.Int>'
    To: 'Swift.Optional<Swift.UnsafeMutablePointer<Swift.Int>>'
```

### Swift New \_\_VaListBuilder APIs

This section introduces new APIs related to \_\_VaListBuilder in Swift, which are currently not marked with @available attributes. These include functions for storage allocation, appending words, deallocation, and querying size/alignment, as well as a new 'allocated' variable.

**Source**: https://github.com/swiftlang/swift/blob/main/test/api-digester/Inputs/stability-stdlib-abi-without-asserts-arm64.txt

```
New __VaListBuilder APIs:
- Func __VaListBuilder.allocStorage(wordCount:)
- Func __VaListBuilder.appendWords(_:)
- Func __VaListBuilder.deallocStorage(wordCount:storage:)
- Func __VaListBuilder.rawSizeAndAlignment(_:)
- Var __VaListBuilder.allocated (new API, added to a non-resilient type)
```

---

## Availability and Library Evolution

### Implementing Per-Library Availability Checks in Swift

This snippet demonstrates how Swift's `@available` and `#available` syntax could be adapted for per-library version checking. It shows a class declared with a minimum library version and a function using a conditional check to adapt behavior based on the available library version, crucial for backward-deployment scenarios.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/LibraryEvolutionManifesto.md

```swift
// Client code
@available(Magician 1.5)
class CrystalBallView : MagicView { /*...*/ }

func scareMySiblings() {
  if #available(Magician 1.2) {
    summonDemons()
  } else {
    print("BOO!!")
  }
}
```

### Using SwiftStdlib Availability Macros

This example illustrates the recommended practice of using `SwiftStdlib` availability macros instead of explicitly listing OS version numbers. The `SwiftStdlib` macro simplifies maintenance and reduces the risk of errors, as it maps to the correct OS versions for all ABI-stable platforms.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/StandardLibraryProgrammersManual.md

```swift
extension String {
  // 😵‍💫👎
  @available(macOS 10.15.4, iOS 13.4, watchOS 6.2, tvOS 13.4, *)
  public func fiddle() { ... }

  // 😎👍
  @available(SwiftStdlib 5.2, *)
  public func fiddle() { ... }
}
```

### Marking Future APIs with SwiftStdlib Placeholder

This snippet demonstrates the correct way to mark APIs under development that haven't shipped yet. Instead of explicitly using `9999` for each OS, the `SwiftStdlib` macro with a future version (e.g., `SwiftStdlib 6.3`) should be used. This approach allows for easier updates when the actual OS versions are determined.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/StandardLibraryProgrammersManual.md

```swift
// 😵‍💫👎
@available(macOS 9999, iOS 9999, watchOS 9999, tvOS 9999, *)
public struct FutureFeature {
  ...
}

// 😎👍
@available(SwiftStdlib 6.3, *) // Or whatever
public struct FutureFeature {
  ...
}
```

---

## Generics and Type System

### Extending Array with Concrete Same-Type Requirement in Swift

This snippet demonstrates how to extend `Array` where its `Element` type is concretely `String`. It shows a `makeSentence` function that operates on an array of strings, illustrating a highly-requested feature for constrained extensions.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/GenericsManifesto.md

```swift
extension Array where Element == String {
  func makeSentence() -> String {
    // uppercase first string, concatenate with spaces, add a period, whatever
  }
}
```

### Defining Nested Generic Types in Swift

This snippet demonstrates the syntax for defining a generic type (Y) nested within another generic type (X). This feature allows for more organized and encapsulated generic structures, improving the expressiveness and modularity of Swift code.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/GenericsManifesto.md

```swift
struct X<T> {
  struct Y<U> { }
}
```

### Defining a MultiArray with Generic Value Parameters in Swift

This Swift snippet demonstrates a proposed feature for generic value parameters, allowing a `MultiArray` struct to specify its number of dimensions (`Dimensions`) as a generic integer value. This enables compile-time enforcement of array dimensions, enhancing type safety and potentially supporting fixed-length arrays or dimensional analysis libraries. The `subscript` ensures the number of provided indices matches the `Dimensions` parameter.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/GenericsManifesto.md

```swift
struct MultiArray<T, let Dimensions: Int> { // specify the number of dimensions to the array
  subscript (indices: Int...) -> T {
    get {
      require(indices.count == Dimensions)
      // ...
    }
}
```

### Proposed Syntax for Named Generic Parameters in Swift

This snippet illustrates a proposed syntax for named generic parameters in Swift, allowing generic arguments to be specified with labels. Instead of relying on positional arguments like `Dictionary<String, Int>`, this syntax explicitly labels `Key` as `String` and `Value` as `Int`. This feature would be particularly useful if Swift were to introduce default generic arguments, enabling selective argument specification.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/GenericsManifesto.md

```swift
var d: Dictionary<Key: String, Value: Int>
```

### Defining a Generic Function in Swift

This Swift snippet defines a simple generic function `f` that takes a single parameter `t` of a generic type `T`. In current Swift, the type `T` is always inferred from the argument or context. This definition serves as the basis for discussing the proposed feature of explicitly specifying type arguments for generic functions.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/GenericsManifesto.md

```swift
func f<T>(t: T)
```

### Explicitly Specializing a Generic Function in Swift

This Swift snippet demonstrates a proposed syntax for explicitly specializing a generic function `f` with a specific type argument, `Int`. If implemented, this would allow `x` to be assigned the type `(Int) -> Void` directly, bypassing type inference and providing more control over generic function instantiation. This feature is noted as "Not in scope for Swift 4."

**Source**: https://github.com/swiftlang/swift/blob/main/docs/GenericsManifesto.md

```swift
let x = f<Int> // x has type (Int) -> Void
```

---

## Differentiable Programming

### Implementing Gradient Descent for Podcast Model in Swift

This pseudocode snippet illustrates the application of gradient descent to optimize the `PodcastSpeedModel`. It iteratively updates the model parameters by calculating the gradient of the `meanError` function with respect to the model and adjusting the model in the direction that decreases the error. The `gradient` function is a placeholder for a differentiable programming feature that computes the derivative.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/DifferentiableProgramming.md

```swift
var model = PodcastModel()
let observations = storage.observations()
for _ in 0..<1000 {
    // The language differentiates `meanError` to get a "gradient", which is a value indicating
    // how to change `model` in order to decrease the value of `meanError`.
    let gradient = gradient(at: model) { meanError(for: $0, observations) }

    // Change `model` in the direction that decreased the value of `meanError`.
    model -= 0.01 * gradient
}
```

---

## Build System and Development Tools

### Installing and Using sccache with Swift Build Script

This snippet demonstrates how to install `sccache` using Homebrew and then integrate it into the Swift build process by passing the `--sccache` flag to `build-script`. `sccache` provides automatic caching for C and C++ build artifacts, significantly reducing compilation times for cold builds.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/DevelopmentTips.md

```shell
$ brew install sccache
$ ./swift/utils/build-script MY_ARGS --sccache
```

### Compiling Swift in Whole-Module Optimization Mode

This command compiles a Swift module in whole-module optimization (WMO) mode. A single frontend subprocess reads and compiles all files in the module at once. WMO enables module-wide optimizations and avoids quadratic parsing overhead but sacrifices incremental compilation and may exploit parallelism less effectively in early stages.

**Source**: https://github.com/swiftlang/swift/blob/main/docs/CompilerPerformance.md

```shell
swiftc -wmo *.swift
```

### Building Swift Benchmarks for iOS, watchOS, and tvOS using build-script

This shell command extends the default Swift benchmark compilation to include iOS, watchOS, and tvOS platforms. It uses the `build-script` utility to compile the benchmarks, placing the resulting binaries in the `benchmark/bin` directory, separate from the macOS binaries.

**Source**: https://github.com/swiftlang/swift/blob/main/benchmark/README.md

```shell
swift/utils/build-script --ios --watchos --tvos
```

---

## API Changes and Compatibility

### Protocol Conformance and Inheritance Updates

This section documents changes in protocol conformances for classes and structs, as well as modifications to protocol inheritance hierarchies. Adding or removing conformances and inherited protocols can significantly alter type capabilities and API surface.

**Source**: https://github.com/swiftlang/swift/blob/main/test/api-digester/Outputs/Cake-abi.txt

```
Class C7 has added a conformance to an existing protocol P1
Class SuperClassChange has added a conformance to an existing protocol P1
Enum IceKind has removed conformance to BitwiseCopyable
Enum IceKind has removed conformance to Sendable
Enum IceKind has removed conformance to SendableMetatype
Protocol P3 has added inherited protocol P4
Protocol P3 has removed inherited protocol P2
Struct fixedLayoutStruct has added a conformance to an existing protocol P2
Struct fixedLayoutStruct has removed conformance to P1
```

### Class Inheritance and Initializer Changes

This section covers modifications to class inheritance hierarchies, such as changes in superclasses, and updates to designated initializers. These changes can impact subclassing behavior and object construction patterns.

**Source**: https://github.com/swiftlang/swift/blob/main/test/api-digester/Outputs/Cake-abi.txt

```
Class SubGenericClass has changed its super class from cake.GenericClass<any cake.P1> to cake.GenericClass<any cake.P2>
Class SuperClassRemoval has removed its super class cake.C3
Constructor AddingNewDesignatedInit.init(_:) has been added as a designated initializer to an open class
Constructor ClassWithMissingDesignatedInits.init() has been added as a designated initializer to an open class
```

---

## Summary

This documentation represents the latest state of Swift development as of December 2025, showing active development in:

1. **Embedded Swift** - A new experimental environment for resource-constrained devices
2. **Advanced Memory Safety** - Strict memory safety checks and lifetime management
3. **Concurrency Improvements** - Enhanced actor isolation and async/await semantics
4. **Experimental Features** - Numerous cutting-edge language features in development
5. **Standard Library Evolution** - New APIs and improved existing functionality
6. **Build System Enhancements** - Better tooling and development experience
7. **Cross-Platform Support** - Expanded platform coverage and deployment options

The Swift language continues to evolve rapidly with a strong focus on safety, performance, and developer productivity while maintaining backward compatibility where possible.
