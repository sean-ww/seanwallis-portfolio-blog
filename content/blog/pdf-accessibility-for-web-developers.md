---
title: "PDF Accessibility for Web Developers"
date: 2019-06-03T18:43:06Z
cover: "/media/posts/pdf-accessibility-for-web-developers/pdf-accessibility-cover.jpg"
tweet: "PDF Accessibility for Web Developers"
---

The Portable Document Format (PDF) is used throughout the web and beyond. Created in the 1990s by Adobe, it provides a platform independent method of accessing documents across a wide range of devices. Regardless of software, hardware and operating system: PDF layouts, text, fonts, colours and graphics should all remain the same. Which all sounds very accessible, but is it?

Unfortunately PDFs are not by default accessible to everyone, yet with the right content and a tagged structure they can be greatly improved if opened with the correct software.

## What is a tagged structure?

A tagged PDF is a stylised use of the PDF format that contains extra hidden structure types and attributes that optimise the reading experience of those who use screen readers or other types of assistive technology. Even a standard user benefits from tagged PDFs being more searchable, easier to extract data from and possible to convert to other formats.

Tagged PDFs can be produced using software (such as Acrobat Pro), but we’ll focus on the challenge facing web developers, and the typical approaches a web developer might take.

## The HTML to Canvas Approach

With HTML to Canvas we are converting our front-end HTML to an image, which is essentially just like taking a screenshot. That image is then placed within a PDF. Then just like with a web page, if sections of your PDF are text within an image, they will not be read correctly by most assistive technology. However this approach could well be acceptable for solutions that are just going to be printed, where the document itself does not need to be accessible.

## The Untagged PDF

For the most part developers will be using an existing library in order to generate PDF documents. Such libraries will allow you to add things like text, tables, images and even forms. [mPDF](https://mpdf.github.io/what-else-can-i-do/pdf-a1-b-compliance.html) is an example of a library that even allows you to explicitly produce structured (tagged) documents. However the support they offer is not from an accessibility perspective, and it is not possible to add all the required attributes you might need for a truly accessible document.

### PDF Generator Libraries

Below are some of the available libraries for generating PDFs (JavaScript or PHP) of which mPDF is one:

* [jsPDF](https://github.com/MrRio/jsPDF)
* [PDFKit](http://pdfkit.org/)
* [pdfmake](http://pdfmake.org)
* [TCPDF](https://tcpdf.org/)
* [Snappy](https://github.com/KnpLabs/snappy)
* [DOMPDF](https://github.com/dompdf/dompdf)
* [mPDF](https://mpdf.github.io/)
* [FPDF](http://www.fpdf.org/)

None of the above could be recommended for full accessibility support.

## The Accessible Tagged PDF

When producing PDFs we must consider many of the same things we would within a HTML document. They include things like language level, explaining abbreviations / acronyms, colour contrast or reliance on colour to convey meaning.

### Default Language and Encoding

For starters we can set the default language of the PDF by adding a [/Lang entry](https://www.w3.org/TR/WCAG20-TECHS/PDF16.html) such as `/Lang (en-US)`. Adding the default language can aid translation software or help a screen reader read the text in the correct natural language. Then like with HTML we can take this further to [specify when specific passages or phrases contain a different language](https://www.w3.org/TR/WCAG20-TECHS/PDF19.html).

```
/P % Start of marked-content sequence
BDC
  (Good morning, or in Dutch you might say, ) Tj
  /Span << /Lang (nl-Nl) >>% Start of nested marked-content sequence
 BDC
  (goedemorgen.) Tj
 EMC% End of nested marked-content sequence
EMC% End of marked-content sequence
```

The above example allows us to override the default language within the Span. Without doing so a foreign phrase would be read in the default language, and goedemorgen spoken as an English word is a long way from the correct pronunciation. You can try yourself to [listen to translations in the wrong language](https://translate.google.com/#view=home&op=translate&sl=en&tl=nl&text=goedemorgen), it does not work well! Although whilst it’s harder to understand, you may find it entertaining.

At least with the incorrect language we hear something you might be able to understand, it gets worse if you get the encoding wrong! Imagine the pronunciation of “?????” or “�����”. That’s not so user friendly. Acrobat extracts characters to Unicode text when a PDF is being read via a screen reader or when you save as text for a Braille embosser. The extraction fails if Acrobat cannot determine how to map the font to Unicode characters. In a PDF we must use fonts that can be converted to unicode text. Adobe recommend using OpenTypes typefaces. You can check for such errors by exporting your PDF to a text format and verifying the characters have mapped correctly.

### Security

PDFs have the capability to restrict content and prevent users from copying, printing, extracting, commenting or editing upon a document. Such settings can however interfere with a screen reader’s ability to read the document, because screen readers must be able to copy and extract the document text in order to convert it to speech. Therefore adding such restrictions may make your document inaccessible. However, Adobe have made it possible for recognised screen readers or trusted agents to override such settings. You can consider for yourself if you wish to enable such a feature.

### Structure

It is helpful to any user if the document follows a logical structure, but the structure becomes much more important for assistive technology where the visual layout is irrelevant. Instead we rely upon the appropriate tags and tagged structure to navigate the content. The structure should result in the correct reading order, which will be more of a consideration when it comes to columns or unusual visual design layouts. Where relevant we can make use of chapters, headings, paragraphs and sections in order to separate content and give structure. Once more, just as with HTML, our [headings](https://www.w3.org/TR/WCAG20-TECHS/PDF9.html) should not skip levels. So we start at H1, then H2, and so on.

It is also important to consider context. If your document is a single page, you have very different structural requirements from a 100 page document. For instance, for larger documents you may make use of bookmarks to toggle between select parts of the document, or you may find value in adding footnotes. All of which can be tagged appropriately and become navigable.

### Tables

Tables are much like their HTML counter parts with a /Table tag, optional /THead, /TBody and /TFoot tags, /TR table rows and then nested inside are the /TH header cells or /TD cells. What must be considered is that there should be no missing cells (or at least to have the correct ColSpan or RowSpan to compensate) and you always enter a character within empty table cells (although the character may be visible or hidden). This is necessary to maintain the order for speech synthesisers.

### Images

When adding images we have to consider the purpose of the image. Is it just a background image or purely decorative? In which case we apply the [/Artifact](https://www.w3.org/TR/WCAG20-TECHS/PDF4.html) tag in order to ignore the image. Then for the remaining images, they should all be informative. Each informative image should use a descriptive [alternative text](https://www.w3.org/TR/WCAG20-TECHS/PDF13.html) in order to inform the user, without the reliance on viewing the image.

### Forms

Each form should be created with a logical tab order in order for a user to navigate the form using a keyboard. Each field should also make use of a label that is explicitly associated with the corresponding field. Tooltips can also be used to provide descriptive text about the field. The tooltips can be read by screen readers. It should be noted that List boxes give accessibility issues for keyboard users and hence should be avoided. Also, for all radio buttons it is important to ensure that the name and tooltip values are the same for every button in the group. The tooltip should also be succinct as it will be read for each option in the group. Lastly an effort should be made to identify [required fields](https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/PDF5.html). This can be done by incorporating the information into the label such as ‘My Field (Required)’, or if you wish to be more subtle, an asterisk could be used with a legend entry indicating ‘* = required field’.


### Testing PDF Accessibility

[Adobe Pro](https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html#check_accessibility_of_PDFs) provides both accessibility checking and fixing built into it’s paid software. Although the European Internet Inclusion Initiative (EIII) also provide a freely available tool for checking the accessibility of a PDF document at: [http://checkers.eiii.eu/en/pdfcheck/](http://checkers.eiii.eu/en/pdfcheck/). The checker also ties in to the Web Content Accessibility Guidelines ([WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)) A, AA, and AAA ratings whilst providing useful explanation and links around the results.

### PDF Generator Services

As with the PDF generator libraries, there are also a variety of services available to generate PDFs for web developers. Of those sampled, it’s just the [PDFreactor](https://www.pdfreactor.com/) service that gets an honorable mention. Their [accessibility example](https://www.pdfreactor.com/product/samples/accessibility/accessibility.pdf) tested very well on JAWS, NVDA and via the EIII tool. It just suffered one drawback on Mac’s VoiceOver where the table cells where reading as blank, although that could be attributed to VoiceOver’s PDF support.

## Not using PDFs

Even after accounting for all the considerations to produce an accessible tagged PDF will your PDF then be accessible to everyone?

Perhaps not. Tagged PDFs are not necessarily much use to assistive technology when opened directly in the browser, they rely on the user opening them in a suitable PDF reader. That then presents another hurdle for the user to overcome.

It’s good to question whether PDFs are the right thing to use at all, or to consider if alternative solutions can be made available. Perhaps the content could be sent in email format, or remain on a web page that could still be printed for instance.

Then consider browser plugins, user’s may have their own plugins that assist their usage specifically within the browser, such as translation services, colour enhancement tools and so on. None of which are available if you get sent to a PDF.

## Further Reading

The [Web Content Accessibility Guidelines 2.0](https://www.w3.org/TR/WCAG-TECHS/pdf.html) can provide more depth on the subject.

This post was also published on [enrise.com](https://enrise.com/2019/06/pdf-accessibility-for-web-developers/)
