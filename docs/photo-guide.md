# MERIDIA — photo guide

The site shows illustrations until real photos exist. Add photos as files and they appear
automatically on the next build (the GitHub Pages deploy runs the build for you).

## Where files go

| Photo | Path | Used for |
|---|---|---|
| Packshot (piece alone) | `public/products/<slug>/<colour>-1.jpg` | Product card, first gallery image |
| Worn photo | `public/products/<slug>/<colour>-2.jpg` | Card on hover, gallery |
| More views | `public/products/<slug>/<colour>-3.jpg`, `-4.jpg` … | Gallery |
| Campaign | `public/editorial/1-studio.jpg`, `public/editorial/2-interior.jpg` | Homepage campaign panels |

- **Format:** JPG or WebP, portrait **4:5**, at least **1600 × 2000 px**, under ~600 KB each.
- A colour with no photos keeps its illustration, so you can add photos one at a time.

### Slugs and colour names

| Product | Slug | Colours (file prefix) |
|---|---|---|
| Portofino Striped Polo | `portofino-striped-polo` | `navy`, `cream`, `olive` |
| Amalfi Striped Linen Shirt | `amalfi-striped-linen-shirt` | `sky`, `sand`, `navy` |
| Sorrento Linen Sweater | `sorrento-linen-sweater` | `cream`, `sand`, `navy`, `olive` |
| Riviera Cotton Cap | `riviera-cotton-cap` | `navy`, `cream`, `olive`, `chocolate` |
| Capri Braided Bracelet | `capri-braided-bracelet` | `chocolate`, `navy`, `olive` |

Example: `public/products/portofino-striped-polo/navy-2.jpg`

## Before you publish

- Use photos you own or have the rights to: your own shoot (with signed model releases)
  or an AI image tool whose terms allow commercial use.
- **Do not** use other brands' campaign images, and keep other brands' logos or products
  (books, bags, watches with visible branding) out of frame.
- AI images: check every image closely. Stripes, collars, buttons and hands are often wrong.
  Regenerate until the garment matches the product exactly.

## Prompt pack (AI image tools)

Combine one **setting**, one **outfit** and the **style line**. Write prompts in English;
most tools follow English best. Ask for a 4:5 portrait.

### Settings (inspired by the references you liked)

**A · Terracotta studio**
> Full-body editorial fashion photograph. The model sits relaxed on a mid-century wooden lounge
> chair with a cane seat, one leg crossed, in front of a hand-painted terracotta / burnt-orange
> canvas backdrop that continues onto the floor. Soft directional studio light from the left,
> gentle shadows.

**B · Warm walnut interior**
> Waist-up editorial portrait. The model stands in front of a walnut shelving wall with warm
> LED strip lighting under each shelf, a few ceramic vases and plain unbranded books, one hand
> in the trouser pocket, looking at the camera. Warm evening light, shallow depth of field.

### Outfits (describe the piece exactly)

**Portofino Striped Polo** (navy)
> wearing a short-sleeved knitted cotton polo with horizontal navy and cream stripes about 1 cm
> wide, a flat-knit collar and a two-button mother-of-pearl placket, regular fit, untucked;
> sand-coloured cotton chinos and white leather sneakers.

**Amalfi Striped Linen Shirt** (white with light-blue stripe)
> wearing a washed white linen shirt with fine vertical light-blue pinstripes, a French collar
> and one chest pocket, sleeves rolled once, top button open; navy linen trousers and tan suede
> loafers.

**Sorrento Linen Sweater** (cream)
> wearing a cream open-knit linen-cotton crewneck sweater with ribbed collar, cuffs and hem,
> slightly relaxed fit; light striped linen trousers.
> Variant: *the cream sweater draped over the shoulders with the sleeves loosely knotted on the
> chest, over the white-and-light-blue striped linen shirt.*

**Riviera Cotton Cap** (navy)
> wearing a navy washed-cotton six-panel baseball cap with a pre-curved peak and no logo, with
> the cream-and-navy striped polo.

**Capri Braided Bracelet** (tan)
> close-up of the wrist and hand: a hand-braided tan waxed-cord bracelet with a small square
> burnished-brass clasp engraved with a single letter M, on the wrist below a rolled linen
> shirt cuff.

### Style line (add to every prompt)
> Shot on 50 mm, natural skin texture, subtle film grain, quiet-luxury menswear campaign,
> European, timeless. No text, no logos, no brand names anywhere in the image.

### Packshots (`-1.jpg`)
> Studio packshot of [piece description], neatly laid flat / on an invisible mannequin, centred,
> on a warm off-white seamless background (#F4EFE6), soft even light, no props, no text.

## Sending photos instead

You can also send the images in the chat with the product and colour for each one, and they can
be added to the right folders for you.
