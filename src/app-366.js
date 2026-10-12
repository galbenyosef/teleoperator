// app 366 — items
// Lines 182564-183081 of readable/app.pretty.js (statement-aligned).
var qyt = "https://www.openstreetmap.org/copyright",
  Ym = {
    "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
    "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
    "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
    "CC BY-SA 2.5": "https://creativecommons.org/licenses/by-sa/2.5/",
    "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
    "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
    CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
    ODbL: "https://opendatacommons.org/licenses/odbl/1-0/",
    PDDL: "https://opendatacommons.org/licenses/pddl/1-0/",
    OFL: "https://openfontlicense.org/",
    MIT: "https://opensource.org/license/mit",
    "Apache-2.0": "https://www.apache.org/licenses/LICENSE-2.0",
    ISC: "https://opensource.org/license/isc-license-txt",
    "BSL-1.0": "https://www.boost.org/LICENSE_1_0.txt",
    "Public domain":
      "https://www.usgs.gov/information-policy-and-instructions/copyrights-and-credits",
  },
  Xr = (i) => "https://commons.wikimedia.org/wiki/File:" + i,
  Kr = (i, t) => `https://freesound.org/people/${i}/sounds/${t}/`,
  jyt = [
    {
      h: "Made by",
      items: [
        [
          "mindblown games",
          "Design, code, art direction, cars, city and sound",
          [["mindblown.ai", "https://mindblown.ai"]],
        ],
        [
          "Built with Claude Code",
          "Written together with Anthropic's Claude Code",
          [["claude.com/claude-code", "https://claude.com/claude-code"]],
        ],
        [
          "Played on mindblown.ai",
          "Rooms, accounts, the garage's inventory cars and the leaderboard run on the mindblown platform",
          [["mindblown.ai", "https://mindblown.ai"]],
        ],
      ],
    },
    {
      h: "Inspiration",
      items: [
        ["Shikhar", "Spider-Man inspiration", []],
        [
          "APEX Heat City",
          "The sister game across the bay, and the engine and road sounds it shared",
          [["apex-city.mindblown.ai", "https://apex-city.mindblown.ai"]],
        ],
      ],
    },
    {
      h: "Map data",
      items: [
        [
          "\xA9 OpenStreetMap contributors",
          "Streets, buildings, parks, coastline, rail lines, piers (via the Overpass API). The data is available under the Open Database License (ODbL) 1.0; the game's baked map is a derived database under the same licence.",
          [
            ["openstreetmap.org/copyright", qyt],
            ["ODbL", Ym.ODbL],
          ],
        ],
        [
          "U.S. Geological Survey (USGS), 3D Elevation Program (3DEP)",
          "The terrain: 1/3 arc-second bare-earth elevation from The National Map. Public domain.",
          [
            [
              "The National Map",
              "https://www.usgs.gov/programs/national-geospatial-program/national-map",
            ],
            ["3DEP", "https://www.usgs.gov/3d-elevation-program"],
          ],
        ],
        [
          "DataSF: Street Tree List",
          "Every street tree's place, species and size (San Francisco Public Works' inventory). Open Data Commons PDDL.",
          [
            [
              "data.sfgov.org",
              "https://data.sfgov.org/City-Infrastructure/Street-Tree-List/tkzw-k3nq",
            ],
            ["PDDL", Ym.PDDL],
          ],
        ],
      ],
    },
    {
      h: "Reference photography",
      note: "From Wikimedia Commons; used as modelling references for the freeways, tunnels and the cable-car turnaround (not shipped in the game).",
      items: [
        [
          "SF Cable Car 22 at Market Street turnaround",
          "Evan0512",
          [
            [
              "Commons",
              Xr("SF_Cable_Car_22_at_Market_Street_turnaround_20250920.jpg"),
            ],
            ["CC BY 4.0"],
          ],
        ],
        [
          "Stockton Street Tunnel, San Francisco",
          "Ilkka Simomaa (KFP)",
          [
            [
              "Commons",
              Xr("Stockton_Street_Tunnel,_San_Francisco_2021-11-16.jpg"),
            ],
            ["CC BY 4.0"],
          ],
        ],
        [
          "South portal of the Stockton Tunnel at night",
          "Dllu",
          [
            [
              "Commons",
              Xr(
                "South_portal_of_the_Stockton_Tunnel,_San_Francisco_at_night_dllu.jpg",
              ),
            ],
            ["CC BY-SA 4.0"],
          ],
        ],
        [
          "Central Freeway, San Francisco",
          "Kitchen (Flickr)",
          [
            ["Commons", Xr("Central_Freeway,_San_Francisco.jpg")],
            ["CC BY 2.0"],
          ],
        ],
        [
          "Interstate 80 western end",
          "Coolcaesar",
          [["Commons", Xr("Interstate80westernend.jpg")], ["CC BY-SA 3.0"]],
        ],
        [
          "San Francisco: Octavia Boulevard",
          "Octoferret",
          [
            ["Commons", Xr("San_Francisco-Octavia_Boulevard.jpg")],
            ["CC BY-SA 2.5"],
          ],
        ],
        [
          "I-80 Bay Bridge approach",
          "Mark (Flickr)",
          [["Commons", Xr("I-80_Bay_Bridge_approach.jpg")], ["CC BY-SA 2.0"]],
        ],
        [
          "Bay Bridge: Rincon Hill Anchorage",
          "Cindysu8",
          [
            [
              "Commons",
              Xr(
                "San_Francisco--Oakland_Bay_Bridge_-_Rincon_Hill_Anchorage.jpg",
              ),
            ],
            ["CC BY-SA 4.0"],
          ],
        ],
        [
          "Bay Bridge: Rincon Hill Abutment Looking West",
          "Cindysu8",
          [
            [
              "Commons",
              Xr(
                "San_Francisco--Oakland_Bay_Bridge_-_Rincon_Hill_Abutment_Looking_West.jpg",
              ),
            ],
            ["CC BY-SA 4.0"],
          ],
        ],
        [
          "Caltrain tracks under the I-280 viaduct in Mission Bay",
          "Pi.1415926535",
          [
            [
              "Commons",
              Xr(
                "Caltrain_tracks_under_I-280_viaduct_in_Mission_Bay,_September_2018.JPG",
              ),
            ],
            ["CC BY-SA 3.0"],
          ],
        ],
        [
          "I-280 ramp over Mariposa Street",
          "Pi.1415926535",
          [
            [
              "Commons",
              Xr("I-280_ramp_over_Mariposa_Street,_February_2021.jpg"),
            ],
            ["CC BY-SA 4.0"],
          ],
        ],
        [
          "Stub of westbound King Street",
          "Pi.1415926535",
          [
            ["Commons", Xr("Stub_of_westbound_King_Street,_April_2018.JPG")],
            ["CC BY-SA 3.0"],
          ],
        ],
        [
          "Selby Street under I-280",
          "Pi.1415926535",
          [
            ["Commons", Xr("Selby_Street_under_I-280_(2),_April_2021.jpg")],
            ["CC BY-SA 4.0"],
          ],
        ],
        [
          "I-280 viaduct over Islais Creek Division",
          "Pi.1415926535",
          [
            [
              "Commons",
              Xr("I-280_viaduct_over_Islais_Creek_Division,_June_2018.JPG"),
            ],
            ["CC BY-SA 3.0"],
          ],
        ],
        [
          "The Hairball from the west",
          "Pi.1415926535",
          [
            ["Commons", Xr("The_Hairball_from_the_west,_August_2020.JPG")],
            ["CC BY-SA 4.0"],
          ],
        ],
        [
          "San Francisco Bayshore Freeway, Route 101",
          "Tony Webster",
          [
            [
              "Commons",
              Xr("San_Francisco_Bayshore_Freeway_Route_101_6015052908.jpg"),
            ],
            ["CC BY-SA 4.0"],
          ],
        ],
      ],
    },
    {
      h: "Sound",
      items: [
        [
          'Siren wail: "SS2000_wail_seamless"',
          "ThePeasantJoe on Freesound",
          [["Freesound", Kr("ThePeasantJoe", 800708)], ["CC0"]],
        ],
        [
          'Siren yelp and chirp: "Whelen Yelp.wav"',
          "Jefflix on Freesound",
          [["Freesound", Kr("Jefflix", 157866)], ["CC0"]],
        ],
        [
          'Air horn: "Whelen Horn.wav"',
          "Jefflix on Freesound",
          [["Freesound", Kr("Jefflix", 157869)], ["CC0"]],
        ],
        [
          'Police PA: "MISC_Police_PA_Officer_Speaking_001.wav"',
          "conleec on Freesound",
          [["Freesound", Kr("conleec", 159749)], ["CC0"]],
        ],
        [
          'Radio chirp: "Police Radio Chirp"',
          "jimmefer on Freesound",
          [["Freesound", Kr("jimmefer", 825989)], ["CC0"]],
        ],
        [
          'Helicopter overhead: "Helicopter overhead pass pretty good"',
          "TRP on Freesound",
          [["Freesound", Kr("TRP", 573941)], ["CC0"]],
        ],
        [
          'Helicopter close by: "Small Helicopter Takes Off"',
          "senorstudy on Freesound",
          [["Freesound", Kr("senorstudy", 172649)], ["CC0"]],
        ],
        [
          'Flat-six idle: "S07-11 1972 Porsche in fast; idle; stop"',
          "craigsmith on Freesound",
          [["Freesound", Kr("craigsmith", 675268)], ["CC0"]],
        ],
        [
          'Flat-six pull: "porsche_911.wav"',
          "mharo on Freesound",
          [["Freesound", Kr("mharo", 55727)], ["CC0"]],
        ],
        [
          'Flat-six overrun: "Porsche.MP3"',
          "mmplisskin on Freesound",
          [["Freesound", Kr("mmplisskin", 90404)], ["CC0"]],
        ],
        [
          'V12: "Lambo idle and rev.mp3"',
          "cheesepuff on Freesound",
          [["Freesound", Kr("cheesepuff", 112075)], ["CC0"]],
        ],
        [
          'Diesel: "4WD Engine & Rev.wav"',
          "Alex_hears_things on Freesound",
          [["Freesound", Kr("Alex_hears_things", 379914)], ["CC0"]],
        ],
        [
          'Diesel, top end: "3008gtrevving.wav"',
          "Mihacappy on Freesound",
          [["Freesound", Kr("Mihacappy", 865222)], ["CC0"]],
        ],
        [
          'Small engine: "2CV 1.aif", "2CV 2.aif"',
          "beskhu on Freesound",
          [
            ["Freesound", Kr("beskhu", 273899)],
            ["Freesound", Kr("beskhu", 273898)],
            ["CC0"],
          ],
        ],
        [
          'Small engine pulling: "2CV.wav"',
          "svenne2000 on Freesound",
          [["Freesound", Kr("svenne2000", 395840)], ["CC0"]],
        ],
        [
          "Engine, tyre, road and impact sounds",
          "From APEX Heat City's sound set",
          [["apex-city.mindblown.ai", "https://apex-city.mindblown.ai"]],
        ],
        [
          "City ambience, effects, voices, reverbs and the radio's music",
          "Generated with ElevenLabs",
          [["elevenlabs.io", "https://elevenlabs.io"]],
        ],
      ],
    },
    {
      h: "Cars and 3D",
      items: [
        [
          "Ferrari 458 model",
          "By vicent091036 on Sketchfab, via the three.js examples (webgl_materials_car)",
          [
            ["Sketchfab", "https://sketchfab.com/vicent091036"],
            [
              "three.js example",
              "https://threejs.org/examples/#webgl_materials_car",
            ],
          ],
        ],
        [
          "Waymo (Jaguar I-PACE) and Tesla Cybercab",
          "Modelled against reference views made with OpenAI gpt-image from players' photos; the Cybercab's mesh by Hunyuan3D on fal.ai, refit in Blender",
          [["fal.ai", "https://fal.ai"]],
        ],
        [
          "Tesla Cybertruck and Corvette ZR1X",
          "Scripted in Blender from published dimensions, with Wikimedia Commons photos as references",
          [["Blender", "https://www.blender.org"]],
        ],
        [
          "Traffic, parked cars, buses and cable cars",
          "Generated with Hunyuan3D (fal.ai), simplified with meshoptimizer",
          [],
        ],
        [
          "Textures: facades, ground, foliage, landmarks, street furniture, billboards and murals",
          "Generated with OpenAI gpt-image (directly and on fal.ai); every billboard brand is invented",
          [["openai.com", "https://openai.com"]],
        ],
        ["R-Evolution", "A tribute to Marco Cochrane's sculpture (2015)", []],
        [
          "Licence-plate emoji",
          "Twemoji 1f92f. Copyright 2020 Twitter, Inc and other contributors; graphics licensed under CC BY 4.0",
          [["Twemoji", "https://github.com/jdecked/twemoji"], ["CC BY 4.0"]],
        ],
      ],
    },
    {
      h: "Software",
      items: [
        [
          "three.js",
          "The renderer's foundation; the sky (Preetham) and water shaders ported from its examples. MIT.",
          [["threejs.org", "https://threejs.org"], ["MIT"]],
        ],
        [
          "meshoptimizer",
          "Arseny Kapoulkine. Mesh simplification for the reflection and car LODs. MIT.",
          [["GitHub", "https://github.com/zeux/meshoptimizer"], ["MIT"]],
        ],
        [
          "esbuild",
          "Evan Wallace. The bundler. MIT.",
          [["esbuild.github.io", "https://esbuild.github.io"], ["MIT"]],
        ],
        [
          "glTF Transform",
          "Don McCurdy. The car models' processing. MIT.",
          [["gltf-transform.dev", "https://gltf-transform.dev"], ["MIT"]],
        ],
        [
          "sharp",
          "Image processing in the asset tools. Apache 2.0.",
          [
            ["sharp.pixelplumbing.com", "https://sharp.pixelplumbing.com"],
            ["Apache-2.0"],
          ],
        ],
        [
          "Clipper (clipper-lib) and earcut",
          "Polygon clipping and triangulation in the city bake. Boost Software License; ISC (Mapbox).",
          [
            ["clipper-lib", "https://www.npmjs.com/package/clipper-lib"],
            ["earcut", "https://github.com/mapbox/earcut"],
          ],
        ],
        [
          "Blender",
          "Modelling and baking. GPL.",
          [["blender.org", "https://www.blender.org"]],
        ],
        [
          "Playwright",
          "Microsoft. The browser tests. Apache 2.0.",
          [["playwright.dev", "https://playwright.dev"], ["Apache-2.0"]],
        ],
        [
          "Remotion",
          "The trailer. Remotion License.",
          [["remotion.dev", "https://www.remotion.dev"]],
        ],
      ],
    },
    {
      h: "Fonts",
      note: "All four under the SIL Open Font License 1.1.",
      items: [
        [
          "Archivo",
          "Omnibus-Type. Copyright The Archivo Project Authors",
          [
            ["GitHub", "https://github.com/Omnibus-Type/Archivo"],
            ["OFL", Ym.OFL],
          ],
        ],
        [
          "JetBrains Mono",
          "Copyright 2020 The JetBrains Mono Project Authors",
          [
            ["GitHub", "https://github.com/JetBrains/JetBrainsMono"],
            ["OFL", Ym.OFL],
          ],
        ],
        [
          "Dancing Script",
          "Pablo Impallari. Copyright 2016 The Dancing Script Project Authors (licence plates)",
          [
            ["GitHub", "https://github.com/googlefonts/DancingScript"],
            ["OFL", Ym.OFL],
          ],
        ],
        [
          "Oswald",
          "Vernon Adams. Copyright 2016 The Oswald Project Authors (licence plates)",
          [
            ["GitHub", "https://github.com/googlefonts/OswaldFont"],
            ["OFL", Ym.OFL],
          ],
        ],
      ],
    },
  ],
  Vyt =
    "All trademarks, vehicle names, liveries, landmark and business names are the property of their respective owners. This game is not affiliated with, sponsored or endorsed by any of them. San Francisco's street layout comes from OpenStreetMap; the city itself is rebuilt, not photographed.",
  $yt = `
.cr { font-family: var(--font); color: var(--ink); }
.cr-hero { margin: 4px 0 14px; padding: 18px 18px 16px; border-radius: var(--r-md); background: linear-gradient(135deg, rgba(63,214,198,.14), rgba(255,90,31,.08)); border: 1px solid var(--line); }
.cr-hero b { display: block; font: var(--fw-black) var(--fs-xl)/1.1 var(--font); font-stretch: var(--wide); letter-spacing: .02em; }
.cr-hero span { display: block; margin-top: 6px; font: var(--fw-reg) 13px/1.45 var(--font); color: var(--ink-2); }
.cr h3, #pause .cr h3 { margin: 22px 0 8px; font: var(--fw-black) var(--fs-xs)/1.2 var(--font); letter-spacing: var(--ls-eyebrow); text-transform: uppercase; color: var(--c-level); }
.cr .cr-note { margin: -2px 0 8px; font: 400 12px/1.45 var(--font); color: var(--ink-3); }
.cr ul { list-style: none; margin: 0; padding: 0; border-radius: var(--r-md); background: rgba(255,255,255,.04); overflow: hidden; }
.cr li { padding: 10px 14px; } .cr li + li { border-top: 1px solid var(--line); }
.cr li b { display: block; font: var(--fw-semi) 14px/1.3 var(--font); color: var(--ink); overflow-wrap: anywhere; }
.cr li span { display: block; margin-top: 2px; font: 400 12.5px/1.4 var(--font); color: var(--ink-2); }
.cr li .ln { display: flex; flex-wrap: wrap; gap: 4px 12px; margin-top: 4px; }
.cr a { color: var(--c-level); font: var(--fw-semi) 12px/1.4 var(--font-mono); text-decoration: none; overflow-wrap: anywhere; }
.cr a:hover, .cr a:focus-visible { text-decoration: underline; }
.cr .cr-disc { margin: 22px 0 4px; padding: 12px 14px; border-radius: var(--r-md); border: 1px solid var(--line); font: 400 12px/1.5 var(--font); color: var(--ink-3); }
#credits { position: fixed; inset: 0; z-index: 40; display: none; place-items: center; background: rgba(0,0,0,.62); pointer-events: auto; }
#credits.on { display: grid; }
#credits .cr-card { display: flex; flex-direction: column; width: min(720px, calc(100vw - 32px)); height: min(680px, calc(100vh - 32px)); background: #16181b; border: 1px solid rgba(255,255,255,.1); border-radius: var(--r-lg); box-shadow: 0 24px 80px rgba(0,0,0,.6); overflow: hidden; text-align: left; }
#credits .cr-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 12px; border-bottom: 1px solid var(--line); }
#credits .cr-head h2 { margin: 0; font: var(--fw-bold) var(--fs-xl) var(--font); letter-spacing: .005em; text-transform: none; }
#credits .cr-x { flex: none; width: 34px; height: 34px; border-radius: 50%; border: 0; background: rgba(255,255,255,.08); color: var(--ink); font: 400 20px/1 var(--font); cursor: pointer; }
#credits .cr-x:hover { background: rgba(255,255,255,.16); }
#credits .cr-body { flex: 1 1 auto; overflow-y: auto; padding: 8px 20px 24px; overscroll-behavior: contain; }
#creditsLink { position: absolute; right: calc(var(--sr) + 18px); bottom: calc(var(--sb) + 14px); z-index: 2; padding: 6px 10px; border: 0; border-radius: var(--r-pill); background: rgba(9,11,15,.42); color: rgba(243,244,241,.78); font: var(--fw-semi) 11px var(--font-mono); letter-spacing: .14em; text-transform: uppercase; cursor: pointer; -webkit-tap-highlight-color: transparent; }
#creditsLink:hover, #creditsLink:focus-visible { color: #fff; background: rgba(9,11,15,.7); outline: none; }
@media (max-width: 520px), (max-height: 460px) { #credits .cr-head { padding: 12px 16px 10px; } #credits .cr-body { padding: 6px 16px 20px; } .cr-hero b { font-size: var(--fs-lg); } }
`,
  Ap = (i) =>
    String(i).replace(
      /[&<>"]/g,
      (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t],
    ),
  Xyt = ([i, t]) =>
    `<a href="${Ap(t || Ym[i])}" target="_blank" rel="noopener noreferrer">${Ap(i)}</a>`;
