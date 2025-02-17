import express from "express"
import fs from "fs/promises"
import path from "path"

const app = express()
const port = process.env.PORT || 3000

// フォントファイルのパスを指定
const fontPath = path.join(process.cwd(), "./font/GoogleSans-Medium.ttf")

app.get("/", async (req, res) => {
  const today = new Date()
  const day = today.getDate().toString()

  let fontBase64 = ""
  try {
    const fontBuffer = await fs.readFile(fontPath)
    fontBase64 = fontBuffer.toString("base64")
  } catch (error) {
    console.error("Error reading font file:", error)
    // フォントファイルが読み込めない場合は、システムフォントにフォールバック
  }

  const svg = `<?xml version="1.0" encoding="utf-8"?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
         viewBox="0 0 200 200" enable-background="new 0 0 200 200">
      <defs>
        <style type="text/css">
          @font-face {
            font-family: 'Google Sans';
            font-style: normal;
            font-weight: 500;
            src: url(data:font/truetype;charset=utf-8;base64,${fontBase64}) format('truetype');
          }
        </style>
      </defs>
      <g>
        <g transform="translate(3.75 3.75)">
          <!-- White background for numbers -->
          <path fill="#FFFFFF" d="M148.882,43.618l-47.368-5.263l-57.895,5.263L38.355,96.25l5.263,52.632l52.632,6.579l52.632-6.579
            l5.263-53.947L148.882,43.618z"/>
            
          <!-- Red corner -->
          <path fill="#EA4335" d="M148.882,196.25l47.368-47.368l-23.684-10.526l-23.684,10.526l-10.526,23.684L148.882,196.25z"/>
          
          <!-- Green bottom -->
          <path fill="#34A853" d="M33.092,172.566l10.526,23.684h105.263v-47.368H43.618L33.092,172.566z"/>
          
          <!-- Blue left -->
          <path fill="#4285F4" d="M12.039-3.75C3.316-3.75-3.75,3.316-3.75,12.039v136.842l23.684,10.526l23.684-10.526V43.618h105.263
            l10.526-23.684L148.882-3.75H12.039z"/>
          
          <!-- Dark green corner -->
          <path fill="#188038" d="M-3.75,148.882v31.579c0,8.724,7.066,15.789,15.789,15.789h31.579v-47.368H-3.75z"/>
          
          <!-- Yellow right -->
          <path fill="#FBBC04" d="M148.882,43.618v105.263h47.368V43.618l-23.684-10.526L148.882,43.618z"/>
          
          <!-- Dark blue corner -->
          <path fill="#1967D2" d="M196.25,43.618V12.039c0-8.724-7.066-15.789-15.789-15.789h-31.579v47.368H196.25z"/>
          
          <!-- Day number -->
          <text x="96" y="98" font-family="'Google Sans', sans-serif" font-size="90" font-weight="300" fill="#1A73E8" 
                text-anchor="middle" dominant-baseline="central">${day}</text>
        </g>
      </g>
    </svg>`

  res.setHeader("Content-Type", "image/svg+xml")
  res.setHeader("Cache-Control", "public, max-age=0")
  res.send(svg)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

