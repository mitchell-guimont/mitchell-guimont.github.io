var space;

function generateStars() {
  var colors = [
    "#60bbff", "#55ff4f", "#ff5151", "#e8ff6f", "#ff65e1"
  ];

  space = new CanvasSpace("canvas", "#212529" ).display();
  var form = new Form( space );

  // Elements
  var pts = [];
  var center = space.size.$divide(1.8);
  var angle = -(window.innerWidth * 0.5);
  var count = window.innerWidth * 0.05;
  if (count > 150) count = 150;
  var line = new Line(0, angle).to(space.size.x, 0);
  var mouse = center.clone();

  var r = Math.min(space.size.x, space.size.y) * 1;
  for (var i=0; i<count; i++) {
    var p = new Vector( Math.random()*r-Math.random()*r, Math.random()*r-Math.random()*r );
    p.moveBy( center ).rotate2D( i*Math.PI/count, center);
    p.brightness = 0.1
    pts.push( p );
  }

  // Canvas
  space.add({
    animate: function(time, fps, context) {
      for (var i=0; i<pts.length; i++) {
        // Rotate the points slowly
        var pt = pts[i];

        pt.rotate2D( Const.one_degree / 40, center);
        form.stroke( false ).fill( colors[i % 5] ).point(pt, 1);

        // Get line from pt to the mouse line
        var ln = new Line( pt ).to( line.getPerpendicularFromPoint(pt));

        // Opacity of line derived from distance to the line
        var distFromMouse = Math.abs(ln.getDistanceFromPoint(mouse))

        if (distFromMouse < 50) {
          if (pts[i].brightness < 0.3) pts[i].brightness += 0.015
        } else {
          if (pts[i].brightness > 0.1) pts[i].brightness -= 0.01
        }

        var color = "rgba(255,255,255," + pts[i].brightness +")"
        form.stroke(color).fill( true ).line(ln);
      }
    },

    onMouseAction: function(type, x, y, evt) {
      if (type=="move") {
        mouse.set(x,y);
      }
    },

    onTouchAction: function(type, x, y, evt) {
      this.onMouseAction(type, x, y);
    }
  });

  space.bindMouse();
  space.play();
}

generateStars();

$(window).resize(function(){
  if (space) {
    space.removeAll();
  }

  $('canvas').remove();
  generateStars();
});