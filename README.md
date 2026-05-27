# Front End UI developed with React, NextJS, TypeScript and Motion to consume the [Azure AI Vision API](https://github.com/DarrenDaviesGitHub/AzureAIVision)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
## Front end UI
<img width="646" height="527" alt="image" src="https://github.com/user-attachments/assets/0d8474bb-5477-4a23-98f4-7218d6dc4a41" />


<img width="728" height="422" alt="image" src="https://github.com/user-attachments/assets/ba518266-2697-4078-b202-bb1944321d54" />


## Example analysis of the following image:

<img width="1161" height="639" alt="image" src="https://github.com/user-attachments/assets/a644bc2b-13f5-4fe6-9041-6d04483ea563" />

## Result (JSON response from Azure AI Vision API and Azure Cognitive Services).

```json
{
  "caption": null,
  "metadata": {
    "height": "1278",
    "width": "2322"
  },
  "readResult": {
    "blocks": [
      {
        "lines": [
          {
            "words": [
              {
                "text": "Stack",
                "confidence": 0.993
              },
              {
                "text": "Overflow",
                "confidence": 0.994
              }
            ]
          },
          {
            "words": [
              {
                "text": "Q",
                "boundingPolygon": [
                  {
                    "x": 716,
                    "y": 26
                  },
                  {
                    "x": 727,
                    "y": 25
                  },
                  {
                    "x": 726,
                    "y": 47
                  },
                  {
                    "x": 714,
                    "y": 47
                  }
                ],
                "confidence": 0.571
              },
              {
                "text": "user:1280410",
                "boundingPolygon": [
                  {
                    "x": 750,
                    "y": 25
                  },
                  {
                    "x": 866,
                    "y": 23
                  },
                  {
                    "x": 866,
                    "y": 46
                  },
                  {
                    "x": 749,
                    "y": 47
                  }
                ],
                "confidence": 0.959
              }
            ]
          },
          {
            "words": [
              {
                "text": "Darren",
                "boundingPolygon": [
                  {
                    "x": 559,
                    "y": 119
                  },
                  {
                    "x": 697,
                    "y": 120
                  },
                  {
                    "x": 696,
                    "y": 158
                  },
                  {
                    "x": 557,
                    "y": 158
                  }
                ],
                "confidence": 0.994
              }
            ]
          }
        ]
      }
    ]
  },
  "...": "Additional fields omitted for README.md"
}
```
## Additional

Ensure that you have AzureAIVision API running and then Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The Azure AI Vision API must be configured to connect to Azure Cognitive Services (Vision) for this to extract the uploaded file or URL.
