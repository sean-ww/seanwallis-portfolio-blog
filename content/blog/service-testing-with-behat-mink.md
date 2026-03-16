---
title: "Acceptance Testing A Service With Behat And Mink Sessions"
date: 2017-12-04T16:35:40Z
tweet: "Acceptance Testing A Service With Behat And Mink Sessions"
---

Running automated acceptance tests are an excellent way to verify your application does exactly what it is intended to do. Each time you make changes to your application, your previous tests will always be there to give assurance that new functionality does not break anything.

In this post we'll look at how we can use Mink and Behat to simulate the interaction between a browser session and a simple service api.

For our example, we'll access all endpoints via ```https://localhost/example-api```, and any data will be returned in a JSON format.

## Fake Login

A ```/login``` endpoint will set our session and a ```/logout``` endpoint will destroy our session. Both will return a 204 when successful.

## Our New Feature

We are going to add a feature that returns data as json only once we have our fake login session:
```
Status: 200 OK
```
```json
{"simpleExample":true,"user":"anon"}
```

And when a session is not present our endpoint will return a 401 error:
```
Status: 401 UNAUTHORIZED
```

## Initial Setup

Before getting started with on our feature, we first need our simple login / logout service application. For this we'll use Slim.

So let's create an example-api directory and then composer require slim:
```
composer require slim/slim "^3.0"
```

Slim will be used to handle our routing and give our responses.

To do this, and keep our example simple, we'll create an index.php file in our project root and send all requests via that file.

If you're using Apache you can add a .htaccess file to achieve this:
```
<IfModule mod_rewrite.c>

# Turn on the engine:
RewriteEngine on

# Force https
RewriteCond %{HTTPS} !on
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}

# Use index.php
RewriteRule ^ index.php

</IfModule>

```
We're also enforcing https in the above example.

We can now add our routes and simple session to our index.php file:
```
<?php
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

require 'vendor/autoload.php';

session_start();
$app = new \Slim\App;

$app->get('/login', function (ServerRequestInterface $request, ResponseInterface $response) {
    $_SESSION["loggedIn"] = true;
    return $response->withStatus(204);
});

$app->get('/logout', function (ServerRequestInterface $request, ResponseInterface $response) {
    session_destroy();
    return $response->withStatus(204);
});

$app->run();

```
This gives us our first two endpoints.

## Putting Acceptance Tests In Place

Now that we have our starting point, let's add our dev dependencies:

We'll use Behat for acceptance testing:
```
composer require --dev behat/behat
```

Then Mink as our web browser emulator:
```
composer require --dev behat/mink
```

Next we'll add a Mink Extension that provides extra functionality we can use:
```
composer require --dev behat/mink-extension
```

And lastly, let's pick the Goutte driver which allows us to use a fast headless browser for testing.
```
composer require --dev behat/mink-goutte-driver
```

Which all together looks like this (at the time of writing):
```
{
    "require": {
        "slim/slim": "^3.0"
    },
    "require-dev": {
        "behat/behat": "^3.4",
        "behat/mink": "^1.7",
        "behat/mink-extension": "^2.3",
        "behat/mink-goutte-driver": "^1.2"
    }
}
```

Now we have everything we need, we can start to use it. We can create Behat's default test suite using:
```
vendor/bin/behat --init
```
This will create a features folder containing a bootstrap folder with a FeatureContext.php file.

We then want to update that feature context file to extend MinkContext:
```
<?php

use Behat\MinkExtension\Context\MinkContext;

/**
 * Defines application features from the specific context.
 */
class FeatureContext extends MinkContext
{
}
```

And create a behat.yml file in our project root:
```
default:
    extensions:
        Behat\MinkExtension:
          base_url: https://localhost/example-api
          goutte: ~
```
In this file we select the goutte driver and set our base url.

Now let's add some tests:
```
Feature: Login
  In order to access session data
  As a service user
  I need to be able to log in to access a session and log out after.

  Scenario: Logging in and setting the session
    Given I go to "/login"
    Then the response status code should be 204

  Scenario: Logging out and destroying the session
    Given I go to "/logout"
    Then the response status code should be 204

```
We add the above to a ```login.feature``` file inside our features directory.

The feature starts by describing a user story for our fake login session. The story is written from the perspective of the service user.

We then define two scenarios: one for logging in and one for logging out.

Now we can run Behat:
```
vendor/bin/behat
```

And we get the below response and find our feature passes:
```
Feature: Login
  In order to access session data
  As a service user
  I need to be able to log in to access a session and log out after.

  Scenario: Logging in and setting the session  # features/login.feature:6
    Given I go to "/login"                      # FeatureContext::visit()
    Then the response status code should be 204 # FeatureContext::assertResponseStatus()

  Scenario: Logging out and destroying the session # features/login.feature:10
    Given I go to "/logout"                        # FeatureContext::visit()
    Then the response status code should be 204    # FeatureContext::assertResponseStatus()

2 scenarios (2 passed)
4 steps (4 passed)
0m0.51s (14.78Mb)
```

## Adding A Data Endpoint

We are now in a position to add our data feature:
```
Feature: Access Example Data
  In order to access example data
  As a service user
  I need to be able to view data using the service when logged in.

  Scenario: I try to retrieve data when logged out
    Given I go to "/logout"
    And the response status code should be 204
    When I go to "/data"
    Then the response status code should be 401

  Scenario: I try to retrieve data when logged in
    Given I go to "/login"
    And the response status code should be 204
    When I go to "/data"
    Then the response status code should be 200
    And the response body should be
    """
    {"simpleExample":true,"user":"anon"}
    """

```
We add the above to a ```data.feature``` file inside our features directory.

The above scenarios contain a new step to check the response body, then otherwise we use the same steps as our first feature (notice the use of 'And', 'When' and 'Then' are completely interchangeable).

Now when we run Behat we should get the below:
```
>> default suite has undefined steps. Please choose the context to generate snippets:

  [0] None
  [1] FeatureContext

```
In our scenarios, each of our lines represent a step and these steps need to be defined in our featureContext.php file (or MinkContext).

So if we press 1, and then enter, Behat will generate a code snippet for us to add to our context file:
```
<?php

use Behat\MinkExtension\Context\MinkContext;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Behat\Tester\Exception\PendingException;

/**
 * Defines application features from the specific context.
 */
class FeatureContext extends MinkContext
{
    /**
     * @Then the response body should be
     */
    public function theResponseBodyShouldBe(PyStringNode $string)
    {
        throw new PendingException();
    }
}
```

If we try to run Behat again our feature should now fail. Before we make our test pass, let's complete our theResponseBodyShouldBe function:
```
<?php

use Behat\MinkExtension\Context\MinkContext;

/**
 * Defines application features from the specific context.
 */
class FeatureContext extends MinkContext
{
    /**
     * @Then the response body should be
     *
     * This method can be used to check an entire json response.
     *
     * @param string $expectedResponseBody The expected json response.
     *
     * @throws \Exception Expected response body was "%s" but got "%s".
     */
    public function theResponseBodyShouldBe($expectedResponseBody)
    {
        $responseBody = $this->getSession()->getPage()->getContent();
        if ($responseBody != $expectedResponseBody) {
            throw new \Exception(
                sprintf(
                    'Expected response body was "%s" but got "%s".',
                    $expectedResponseBody,
                    $responseBody
                )
            );
        }
    }
}
```
The above code checks the response body matches our assertion. In reality you may wish to break this down further to check for a JSON response, and then check individual parameters.

We can now add our data route to index.php:
```
<?php
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

require 'vendor/autoload.php';

session_start();
$app = new \Slim\App;

$app->get('/login', function (ServerRequestInterface $request, ResponseInterface $response) {
    $_SESSION["loggedIn"] = true;
    return $response->withStatus(204);
});

$app->get('/logout', function (ServerRequestInterface $request, ResponseInterface $response) {
    session_destroy();
    return $response->withStatus(204);
});

$app->get('/data', function (ServerRequestInterface $request, ResponseInterface $response) {
    if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"]) {
        return $response->withJson(
            [
                'simpleExample' => true,
                'user' => 'anon'
            ],
            200
        );
    }
    return $response->withStatus(401);
});

$app->run();

```
In this code we check for our fake login session and return the data, else a 401.

So this time we run our test everything should pass:
```
Feature: Access Example Data
  In order to access example data
  As a service user
  I need to be able to view data using the service when logged in.

  Scenario: I try to retrieve data when logged out # features/data.feature:6
    Given I go to "/logout"                        # FeatureContext::visit()
    And the response status code should be 204     # FeatureContext::assertResponseStatus()
    When I go to "/data"                           # FeatureContext::visit()
    Then the response status code should be 401    # FeatureContext::assertResponseStatus()

  Scenario: I try to retrieve data when logged in # features/data.feature:12
    Given I go to "/login"                        # FeatureContext::visit()
    And the response status code should be 204    # FeatureContext::assertResponseStatus()
    When I go to "/data"                          # FeatureContext::visit()
    Then the response status code should be 200   # FeatureContext::assertResponseStatus()
    And the response body should be               # FeatureContext::theResponseBodyShouldBe()
      """
      {"simpleExample":true,"user":"anon"}
      """

Feature: Login
  In order to access session data
  As a service user
  I need to be able to log in to access a session and log out after.

  Scenario: Logging in and setting the session  # features/login.feature:6
    Given I go to "/login"                      # FeatureContext::visit()
    Then the response status code should be 204 # FeatureContext::assertResponseStatus()

  Scenario: Logging out and destroying the session # features/login.feature:10
    Given I go to "/logout"                        # FeatureContext::visit()
    Then the response status code should be 204    # FeatureContext::assertResponseStatus()

4 scenarios (4 passed)
13 steps (13 passed)
0m0.66s (15.00Mb)
```

## Tagging

One final point would be to introduce tags. As you build up many tests tagging becomes especially useful.

We can add a tag to the top of our feature files, which will allow us to run those features in isolation, or in groups:
```
@data
Feature: Access Example Data
  In order to access example data
  ...
```

To execute this we add a tags parameter and define the tag:
```
vendor/bin/behat --tags @data
```
