import { BLOCKS, type Document as RichTextDocument } from '@contentful/rich-text-types';

import { type ContentfulRichtext } from '@/types/misc.types';

const RICHTEXT_SHORT_SIMPLE_JSON: RichTextDocument = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          marks: [],
          data: {}
        }
      ]
    }
  ]
};

const RICHTEXT_LONG_SIMPLE_JSON: RichTextDocument = {
  "nodeType": BLOCKS.DOCUMENT,
  "data": {},
  "content": [
    {
      "nodeType": BLOCKS.HEADING_2,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Alleged Anti-Doping Rule Violations",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.HEADING_3,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "HIWU will post on its website:",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.UL_LIST,
      "data": {},
      "content": [
        {
          "nodeType": BLOCKS.LIST_ITEM,
          "data": {},
          "content": [
            {
              "nodeType": BLOCKS.PARAGRAPH,
              "data": {},
              "content": [
                {
                  "nodeType": "text",
                  "value": "Name of Covered Person(s);",
                  "marks": [],
                  "data": {}
                }
              ]
            }
          ]
        },
        {
          "nodeType": BLOCKS.LIST_ITEM,
          "data": {},
          "content": [
            {
              "nodeType": BLOCKS.PARAGRAPH,
              "data": {},
              "content": [
                {
                  "nodeType": "text",
                  "value": "Name of Covered Horse(s); and",
                  "marks": [],
                  "data": {}
                }
              ]
            }
          ]
        },
        {
          "nodeType": BLOCKS.LIST_ITEM,
          "data": {},
          "content": [
            {
              "nodeType": BLOCKS.PARAGRAPH,
              "data": {},
              "content": [
                {
                  "nodeType": "text",
                  "value": "Rule(s) allegedly violated (and Banned Substance/Method involved, if applicable).",
                  "marks": [],
                  "data": {}
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "nodeType": BLOCKS.HEADING_3,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Depending on which is earliest, public reporting will occur:",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": BLOCKS.OL_LIST,
      "data": {},
      "content": [
        {
          "nodeType": BLOCKS.LIST_ITEM,
          "data": {},
          "content": [
            {
              "nodeType": BLOCKS.PARAGRAPH,
              "data": {},
              "content": [
                {
                  "nodeType": "text",
                  "value": "After the imposition of a Provisional Suspension (if applicable).",
                  "marks": [],
                  "data": {}
                }
              ]
            }
          ]
        },
        {
          "nodeType": BLOCKS.LIST_ITEM,
          "data": {},
          "content": [
            {
              "nodeType": BLOCKS.PARAGRAPH,
              "data": {},
              "content": [
                {
                  "nodeType": "text",
                  "value": "In cases where there is an Adverse Analytical Finding (“AAF”), i.e., a positive test, after the service of an Equine Anti-Doping Notice of the A Sample positive test.",
                  "marks": [],
                  "data": {}
                }
              ]
            }
          ]
        },
        {
          "nodeType": BLOCKS.LIST_ITEM,
          "data": {},
          "content": [
            {
              "nodeType": BLOCKS.PARAGRAPH,
              "data": {},
              "content": [
                {
                  "nodeType": "text",
                  "value": "In non-AAF cases, after the service of the Charge Letter, if no Provisional Suspension has been imposed.",
                  "marks": [],
                  "data": {}
                }
              ]
            }
          ]
        },
        {
          "nodeType": BLOCKS.LIST_ITEM,
          "data": {},
          "content": [
            {
              "nodeType": BLOCKS.PARAGRAPH,
              "data": {},
              "content": [
                {
                  "nodeType": "text",
                  "value": "Following the admission of a violation by the Covered Person, if the alleged violation hasn’t already been reported pursuant to the aforementioned occurrences.",
                  "marks": [],
                  "data": {}
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "nodeType": BLOCKS.PARAGRAPH,
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "The majority of alleged Anti-Doping Rule Violations will result in the imposition of a Provisional Suspension on both the applicable Covered Person and the Covered Horse.",
          "marks": [],
          "data": {}
        }
      ]
    },
  ]
};

const RICHTEXT_WITH_IMAGE_JSON: RichTextDocument = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      "data": {},
      "content": [
        {
          "data": {},
          "marks": [],
          "value": "Embed Image",
          "nodeType": "text"
        }
      ],
      nodeType: BLOCKS.HEADING_3
    },
    {
      "data": {
        "target": {
          "sys": {
            "id": "6Nj4PW7b2tAatXWm7aFi2N",
            "type": "Link",
            "linkType": "Asset"
          },
          "title": "Placeholder Image Title",
          "url": "https://via.placeholder.com/640x360",
          "description": "Placeholder Image Description",
          "width": 640,
          "height": 360,
          "contentType": "image/png"
        },
      },
      "content": [],
      nodeType: BLOCKS.EMBEDDED_ASSET
    },
    {
      "data": {},
      "content": [
        {
          "data": {},
          "marks": [],
          "value": "",
          "nodeType": "text"
        }
      ],
      nodeType: BLOCKS.PARAGRAPH
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          marks: [],
          data: {}
        }
      ]
    }
  ]
};

export const RICHTEXT_SHORT_SIMPLE: ContentfulRichtext = {
  json: RICHTEXT_SHORT_SIMPLE_JSON
};

export const RICHTEXT_LONG_SIMPLE: ContentfulRichtext = {
  json: RICHTEXT_LONG_SIMPLE_JSON
};

export const RICHTEXT_WITH_IMAGE: ContentfulRichtext = {
  json: RICHTEXT_WITH_IMAGE_JSON
};
