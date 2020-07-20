---
date: 2020-07-19T21:50:00.000Z
draft: true
title: Functions and Higher Order Functions
---

In this inaugural post for Kotlin By Kartik we'll review some concepts functions. Functions may seem like simple structures but putting thought into thier structure and shape, that is the inputs and outputs, can lead to code that is easier to test. Additionally, the composability of functions is an important thing to consider similar to class composition in Java, which readers of [Effective Java by Joshua Bloch](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/) know the significance of.

### Functions

Let's start with a definition of function. Simply put it's a computation that has input and output. When we refer to the shape of a function we're talking about the signature of it which includes the multiple inputs the function may have as well as the result or ouput. 

So then a simple example of a Kotlin function would be an `increment` function or `square` function as you can see below. In both cases we have a function that takes a single Int as input and the output is also an Int. The last line is a look at how we would combine the functions to take the square of the incremented value. This doesn't look to bad, but as we add additional functions the code could become unreadable and harder to understand. This could be remedied with a set of local variables to store incremental progress, but maybe there is another way.

```kotlin
  fun increment(input: Int) = input + 1
  fun square(input: Int) = input * input
  square(increment(1)) // 4
```

If we consider that Kotlin allows us to add [extension functions](https://kotlinlang.org/docs/reference/extensions.html) to existing classes then we can define the `increment` and `square` functions as extensions on in the Int class. We've now changed the signature of both it take no input, using the current value stored in the Int variable instead, and output an Int as before. Once again the last line in the sample shows the composition of those two functions. We can ssee the readability is better, the code can be read left to right and the addition of other functions could be added without increasing the number of closing parentheses at the end of the statement. Additionally, we can comment the end of the line, prior to the last `.`, for debuggin purposes and still have valid code.

* Composition of functions
* Update examples to be extensions on Int and then chain them
```kotlin
	fun Int.increment() = this + 1
	fun Int.square() = this * this
	1.increment().square() //4
```

#### Take Away

Readability
Debugability
Testability

* Example: map and composition together
* Point free definition: point is the data your transforming, to program in point free style is to never refer to the data your transforming, focus on functions an composition
* [Tacit Programming](https://en.wikipedia.org/wiki/Tacit_programming)
* The map of a composition is the composition of the maps 

```kotlin
  intArrayOf(1, 2, 3).map(Int::increment).map(Int::square)
  intArrayOf(1, 2, 3).map { a -> a.increment().square() }
```

### Higher-Order Functions
* take a look at greet function from previous episode
* greet function takes two parameters (data and string)
* convert to function that takes a date and return a function that takes a string and returns a string (currying)

#### Currying
* define general curry function
* named after Haskell Curry
* invented by another mathematician
* defined flip function (flip parameters)
* zurrying, like currying but with zero argument function

#### Higher Order Functions
* take functions as input and return functions