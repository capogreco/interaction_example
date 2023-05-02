// get rid of default margin
document.body.style.margin   = 0

// get rid of scrollbars
document.body.style.overflow = `hidden`

// TAU is nicer than PI for trig
const TAU = Math.PI * 2

// get canvas element & assign to 'cnv'
const cnv = document.getElementById ("cnv_id")

// define function for resizing canvas
function resize_canvas () {

   // resize canvas to = viewport
   cnv.width = innerWidth
   cnv.height = innerHeight
}

// assign to .onresize property of window
window.onresize = resize_canvas

// initialise canvas size
resize_canvas ()

// get canvas context & assign to 'ctx'
const ctx = cnv.getContext (`2d`)

// empty array for square objects to go in
const squuares = []

// assign to 'mouse_pos' a newly instantiated vector
const mouse_pos = new Vector (0, 0)

// whenever the pointer moves
cnv.onpointermove = pointer_event => {

   // update the x & y properties of 'mouse_pos' to
   // reflect the x & y properties of the pointer
   mouse_pos.x = pointer_event.x
   mouse_pos.y = pointer_event.y   
}

// whenever there is a touch or mouse click
cnv.onpointerdown = pointer_event => {

   // add an object to the squaares array, in which
   squuares.push ({

      // the position = the x & y coordinates of the pointer
      p : new Vector (pointer_event.x, pointer_event.y),

      // the velocity = random direction w magnitude of 18
      v : vector_from_angle (Math.random () * TAU, 18)
   }) 
}

// kick off the recursive animation sequence
requestAnimationFrame (draw_frame)


// define the recursive animation sequence
function draw_frame () {

   // draw a turquoise background
   ctx.fillStyle = `turquoise`
   ctx.fillRect (0, 0, cnv.width, cnv.height)

   // for each square in the 'squuares' array
   squuares.forEach (s => {

      // random angle for nudge
      const nudge_angle = Math.random () * TAU

      // random magnitude for nudge
      const nudge_mag = Math.random () * 8

      // create nudge vector
      const nudge = vector_from_angle (nudge_angle, nudge_mag)

      // nudge the square's position
      s.p.add (nudge)

      // acceleration: start with a clone of 'mouse_pos'
      const acc = mouse_pos.clone ()

      // subtract the position of the square
      acc.subtract (s.p)

      // set magnitude to 1
      acc.set_mag (1)

      // add acceleration to the square's velocity
      s.v.add (acc)

      // square's velocity is > 18, reduce to 18
      if (s.v.mag () > 18) s.v.set_mag (18)

      // add velocity to the square's position
      s.p.add (s.v)

      // draw a pink square at the square's position
      ctx.fillStyle = `deeppink`
      ctx.fillRect (s.p.x - 10, s.p.y - 10, 20, 20)   
   })

   // call the next frame
   requestAnimationFrame (draw_frame)
}



