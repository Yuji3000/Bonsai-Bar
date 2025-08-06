<div align="center">

<img src="assets/BonsaiBarInLineWhite.png" alt="Homepage large" class="center" width="600" height="auto"></div>



![Shopify](https://img.shields.io/badge/shopify-7AB55C.svg?style=for-the-badge&logo=shopify&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Table of Contents
- [Developer Resources](#developer-resources)
- [Commands](#commands)

---
### Developer Resources and Links

- [Admin version of Shopify store](https://bonsai-bar-dev.myshopify.com/admin)
- [Offical Shopify Docs](https://shopify.dev/docs)
- [Awesome Shopify](https://github.com/julionc/awesome-shopify/blob/main/readme.md#community)
<br>
Resources for tips, docs, headless etc.


## Commands

To Login and start server:
``` bash
shopify theme dev --store=bonsai-bar-dev.myshopify.com
```

### How to push a local branch via Shopify CLI to Shopify Admin theme library
1. Create a new duplicate of a theme in the theme library
2. Run 
``` bash
  shopify theme push -t "<name of theme>"
```
3. In your terminal you should see a message similar to this

```
  The theme 'Copy of Bonsai-Bar/main' (#1111111111) was pushed successfully. 
```

with links to view and customize the theme.
<br><br>
Note: may take a few minutes for changes to appear in theme library
