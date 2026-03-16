---
title: "Web Accessibility For The Blind And Visually Impaired"
date: 2019-02-27T18:43:06Z
cover: "/media/posts/web-accessibility-for-the-blind-and-visually-impaired/experience-cover.jpg"
tweet: "Web Accessibility For The Blind And Visually Impaired"
---

According to the [World Health Organisation](https://www.who.int/en/news-room/fact-sheets/detail/blindness-and-visual-impairment) around 1.3 billion people live with some form of vision impairment. Of those, 217 million have moderate to severe vision impairment, and 36 million people are blind. Whilst those most severe cases are low proportionally, they are not small numbers. Within the context of developing for the web, they are people that should not be forgotten. They too should have the independence to navigate content, shop online and engage with the world.

Try to read this page with your eyes closed, or even navigate to another page. How would you do it? Imagine trying to buy your groceries if you were severely visually impaired or blind. I bet you’d like some help with that. If you were visually impaired and walking to the shops, you might make use of tactile paving (textured ground surfaces that are there to assist pedestrians who are visually impaired). Perhaps braille would assist you when entering your pin number on a keypad. Well for the web we have assistive technology too. You can feel where you are on your keyboard for instance, to enable you to type without needing to look at the keys. You may make use of a screen reader that will convert what’s on screen to navigable content that can be read back to the user. Some of the most widely used screen readers are JAWS, NVDA and for Apple VoiceOver. Such technologies however rely on well designed web pages that give the correct structure, and where necessary, additional information to be utilised by assistive technology.

At Enrise we are currently working with the Nijmegen municipality in order to produce standardised accessible components for all of their related sites. We focus on building upon the [WAI-ARIA best practices](https://www.w3.org/TR/wai-aria-practices/) and working alongside accessibility experts and blind users. Then within our development process we learn to navigate pages from the perspective of a visually impaired or blind user, whilst testing on the most widely used screen readers.

## A dark experience

![4 images from the blind experience in Nijmegen. A view from the outside. A developer trying an interactive experience. Some video screens and a bucket of white canes.](/media/posts/web-accessibility-for-the-blind-and-visually-impaired/experience.png)

Most recently our development team visited the [MuZIEum](https://muzieum.nl/) in Nijmegen, and took part in a [dark experience](https://muzieum.nl/ons-aanbod/donkerbelevingen). As a team we navigated our way through many day to day activities in complete darkness, led by a blind tour guide. It was a humbling and challenging experience, in which we were able to appreciate how relatively small things we do can make their lives so much easier, safer and more enjoyable.

## Getting Technical

### Applying an Accessible Character Limit

Let’s pick just one example that provides a challenge to blind users. Applying a character limit to a textarea. All modern browsers support adding a maxlength attribute to a textarea field. The maxlength value will then prevent users from entering more characters in the field above the value you set. But what happens with a screen reader? Let’s take both JAWS and NVDA (the two most widely used screen readers on Windows). Both screen readers will not inform you when the max length has been reached, they will continue to read out the keys that are being pressed, therefore giving the impression to the user that they can continue typing. In the meantime, what is being typed is lost. You may then leave the field without knowing your input was lost. You could then refocus on the field and have the screen reader read the content back to you. Only then would you discover your text had been truncated.

```
<div class="example-form">
    <label
        for="my-textarea"
        id="my-textarea-count"
    >
        My Textarea
    </label>
    <textarea
        id="my-textarea"
        class="form-control"
        placeholder="Please enter text..."
        maxlength="100"
    ></textarea>
</div>
```

One solution for developers is to include a character count. Typically character counts are displayed under the textarea and provide a visual aid to users to show how many characters are remaining to be typed. Some screen readers can then make use of a character count if you make an association between your textarea and the count via the aria-describedby attribute. In addition to aria-describedby, you can also add aria-live to your count element (containing the character count). The aria-live attribute will then indicate to screen readers that the content is dynamic and that it will be updating. A further consideration could be to inform the user of the character limit within the field label. The field label is very important when it comes to accessibility and all screen readers will look at the label and read it’s contents to the user. So the best thing to do is to let a blind user know there is a limit via the label before they start typing, and then prompt the screen reader to tell the user how many character remain as they type. Via JavaScript you may go a step further by changing the assertiveness of the aria-live label to provide more frequent (assertive) updates via the screen reader, as the user gets closer to the character limit.

```
<div class="example-form">
    <label
        for="my-textarea"
        id="my-textarea-count"
        aria-live="polite"
        aria-atomic="true"
    >
        My Textarea 
        <span class="character-count-start">(</span>
        <span class="character-count-number">100</span>
        <span class="character-count-end"> characters remaining)</span>
    </label>
    <textarea
        id="my-textarea"
        class="form-control"
        placeholder="Please enter text..."
        maxlength="100"
        aria-describedby="my-textarea-count"
    ></textarea>
</div>
```

This is just one of the many technical challenges we face when considering accessibility. We will post more on the subject in the coming months.

This post was also published on [enrise.com](https://enrise.com/2019/02/web-accessibility-for-the-blind-and-visually-impaired/)
