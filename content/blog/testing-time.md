---
title: "Testing Time"
date: 2017-11-02T20:31:06Z
tweet: "Unit testing with built-in PHP functions"
---

Sometimes when unit testing PHP code, we run into things that are difficult to mock. This post will introduce how you can mock built-in php functions such as time() and mt_rand().

## Mocking time()

Let's take the below example:
```php
namespace Example\Namespace;

function displayGreeting()
{
    $time = time();
    $hour = date("g", $time);
    $meridiem = date("A", $time);
    if ($meridiem == "AM") {
        return 'Good Morning';
    }
    if ($hour <= 6 || $hour == 12) {
        return 'Good Afternoon';
    }
    return 'Good Evening';
}
```
In order to fully test our display greeting function we need to be able to manipulate the time element, without having to change any system settings.<!--more-->

We could just pass in the time as a dependency and mock that. However, by overriding built-in functions within a namespace we can avoid this:

```php
namespace Example\Namespace;

class DisplayGreetingTest extends \PHPUnit_Framework_TestCase
{
    use \phpmock\phpunit\PHPMock;

    /**
     * @param string $timeString     The time value hh:mm.
     * @param string $expectedResult The expected result.
     *
     * @dataProvider providerTestDisplayGreeting
     */
    public function testDisplayGreeting($timeString, $expectedResult)
    {
        // Mock time
        $time = $this->getFunctionMock(__NAMESPACE__, "time");
        $time->expects($this->once())->willReturn(strtotime($timeString));

        $result = displayGreeting();
        $this->assertEquals($expectedResult, $result);
    }

    public function providerTestDisplayGreeting()
    {
        return array(
            'Good Morning' => array(
                '00:00',
                'Good Morning'
            ),
            'Good Morning' => array(
                '11:59',
                'Good Morning'
            ),
            'Good Afternoon' => array(
                '12:00',
                'Good Afternoon'
            ),
            'Good Afternoon' => array(
                '17:59',
                'Good Afternoon'
            ),
            'Good Evening' => array(
                '18:00',
                'Good Evening'
            ),
            'Good Evening' => array(
                '23:59',
                'Good Evening'
            )
        );
    }
}
```

In the above example we can make use of the [php-mock/php-mock-phpunit](https://github.com/php-mock/php-mock-phpunit) to get a function mock, and then alter what the function returns in each of our test provider test cases.

We can then apply the same idea to other built-in php functions.

## Mocking mt_rand()

Let's look at another example:
```php
namespace Example\Namespace;

function generateRandomString($randomStringLength = 20)
{
    $randomString = '';
    $possibleCharacters = '2346789bcdfghjkmnpqrtvwxyzBCDFGHJKLMNPQRTVWXYZ';

    $iteration = 0;
    while ($iteration < $randomStringLength) {
        $character = substr($possibleCharacters, mt_rand(0, $randomStringLength - 1), 1);
        if (!strstr($randomString, $character)) {
            $randomString .= $character;
            $iteration++;
        }
    }

    return $randomString;
}
```

The above function is using mt_rand to select characters at random from a possible character list. However, in order to test assertions, we need to make the random element deterministic.

```php
namespace Example\Namespace;

class GenerateRandomStringTest extends \PHPUnit_Framework_TestCase
{
    use \phpmock\phpunit\PHPMock;

    public function testGenerateRandomString()
    {
        // Mock mt_rand
        $mt_rand = $this->getFunctionMock(__NAMESPACE__, "mt_rand");
        $i = 0;
        while ($i < 20) {
            $mt_rand->expects($this->at($i))->willReturn($i);
            $i++;
        }

        $result = generateRandomString();
        $expectedResult = '2346789bcdfghjkmnpqr';
        $this->assertEquals($expectedResult, $result);
    }
}
```

As before, we can get a mock of the function and then control what it returns each time it is called. The above test could then be expanded to test different patterns of random numbers, or different lengths of string.
