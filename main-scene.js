import {tiny, defs} from './scenes/common.js';
import {Shape_From_File} from './scenes/obj-file-demo.js';
                                                  // Pull these names into this module's scope for convenience:
const { Vector, Vector3, vec, vec3, vec4, color, Matrix, Mat4, Light, Shape, Material, Shader, Texture, Scene,
        Canvas_Widget, Code_Widget, Text_Widget } = tiny;

    // Now we have loaded everything in the files tiny-graphics.js, tiny-graphics-widgets.js, and common.js.
    // This yielded "tiny", an object wrapping the stuff in the first two files, and "defs" for wrapping all the rest.

    // ******************** Extra step only for when executing on a local machine:  
    //                      Load any more files in your directory and copy them into "defs."
    //                      (On the web, a server should instead just pack all these as well 
    //                      as common.js into one file for you, such as "dependencies.js")

var sounds = [
 "assets/sound/circles.mp3",
 "assets/sound/heyjude.mp3",
 "assets/sound/mygirl.mp3",
 "assets/sound/neverbeentospain.mp3",
 "assets/sound/partyintheusa.mp3",
 "assets/sound/spanishflea.mp3",
 "assets/sound/sundaybest.mp3"
];

var audio = document.createElement('audio');

var music_play=0;
window.music_play = music_play;
var ketchup_move = 0;
window.ketchup_move - ketchup_move;

const jukebox_color = color(127/255, 124/255, 127/255, 255/255);
const ketchup_color = color(255/255, 0/255, 0/255, 255/255);
const mustard_color = color(255/255, 255/255, 0/255, 255/255);


window.jukebox_color = jukebox_color;
window.ketchup_color = ketchup_color;
window.mustard_color = mustard_color;

var count = 0;
var angle = 0;
var mov2 = 0
    
const Minimal_Webgl_Demo = defs.Minimal_Webgl_Demo;

// ******************** End extra step

// (Can define Main_Scene's class here)

const Additional_Scenes = [];
export { Main_Scene, Additional_Scenes, Canvas_Widget, Code_Widget, Text_Widget, defs, music_play }

class Main_Scene extends Scene
{                           // **Obj_File_Demo** show how to load a single 3D model from an OBJ file.
                            // Detailed model files can be used in place of simpler primitive-based
                            // shapes to add complexity to a scene.  Simpler primitives in your scene
                            // can just be thought of as placeholders until you find a model file
                            // that fits well.  This demo shows the jukebox model twice, with one
                            // jukebox showing off the Fake_Bump_Map effect while the other has a
                            // regular texture and Phong lighting.
    constructor() { 
        super();
        // Load the model file:
        // this.shapes = { "jukebox": new Shape_From_File( "assets/jukebox.obj" ) };
        // this.shapes = { "jukebox": new Shape_From_File( "assets/jukebox.obj" ) };
        this.shapes = {
            jukebox: new Shape_From_File( "assets/jukebox.obj" ),
            table: new Shape_From_File("assets/table.obj"),
            // plane: new defs.Square(), //used floor
            ketchup: new Shape_From_File( "assets/mustard_ketchup.obj" ),
            mustard: new Shape_From_File( "assets/mustard_ketchup.obj"),
            planeFloor: new defs.Square(), //used floor
            plane: new defs.Square(),
            menu: new Shape_From_File("assets/menu.obj"),
            coke: new defs.Square(),
            openSign: new defs.Square(),
        };
        // Don't create any DOM elements to control this scene:
        //this.widget_options = { make_controls: false };
        this.materials =
            {
                jukebox: new Material( new defs.Textured_Phong( 1 ), { color: jukebox_color, ambient: 1, diffusivity: 1, specularity: 1, texture: new Texture( "assets/pink.png" )}),
                table: new Material( new defs.Textured_Phong( 1 ), {color: color(1, 0, 0, 1)}), //color of table rn is temp red

                //KIMBERLY: adjust colors later
                floor: new Material (new defs.Phong_Shader(), {ambient: 1, diffusivity: 1, specularity: 0.5,
                    color: color(0.78, 0.8, 0.6, 1)}),
                floorTile: new Material (new defs.Textured_Phong(1), {ambient: 1, diffusivity: 1, specularity: 1, color: color(0, 0, 0, 1),
                    texture: new Texture("assets/moreChecker_1.png")}),
                // floorTile: context.get_instance(Phong_Shader).material(Color.of(0,0,0,1), {
                //     ambient: 0.5, texture: context.get_instance("assets/checkerFloor_2.jpg", false)
                // }),
                // floorTile: new Material (new defs.Phong_Shader(), {ambient: 0.5, diffusivity: 1, specularity: 0.5, color: color(0, 0, 0, 1),
                //         texture: new Texture("assets/checkerFloor_2.jpg")}),
                //KIMBERLY: change floorBumpMap coloring
                floorBumpMap: new Material (new defs.Textured_Phong(1), {ambient: 0.6, diffusivity: 1, specularity: 0.5, color: color(0, 0, 0, 1),
                    texture: new Texture("assets/floorBumpMap.png")}),
                mustard: new Material( new defs.Textured_Phong( 1 ),  { color: mustard_color,
                    ambient: 1, diffusivity: 1, specularity: 1, texture: new Texture( "assets/pink.png" ) }),
                ketchup: new Material( new defs.Textured_Phong( 1 ),  { color: ketchup_color,
                    ambient: 1, diffusivity: 1, specularity: 1, texture: new Texture( "assets/pink.png" ) }),
                // pinkWall: new Material( new defs.Textured_Phong( 1 ), { ambient: 1, diffusivity: 1, specularity: 1, color: color( 0.7, 0.5, 0.6, 1 ) }),
                // otherWall: new Material( new defs.Textured_Phong( 1 ), { ambient: 1, diffusivity: 1, specularity: 1, color: color( 0.3, 0.2, 0.5, 1 ) }),

                backWall: new Material( new defs.Textured_Phong( 1 ), { ambient: .9, color: color( 1,0,0, 1 ) }),
                leftWall: new Material( new defs.Textured_Phong( 1 ), { ambient: 1, diffusivity: 1, specularity: .5, color: color( 0, 0, 1, 1 ) }),
                rightWall: new Material( new defs.Textured_Phong( 1 ), { ambient: .9, color: color( 0,1,0, 1 ) }),
                menuFront: new Material( new defs.Textured_Phong(1), {ambient: 0.5, diffusivity: 1, specularity: 0.5, color: color(0, 0, 0, 1),
                    texture: new Texture("assets/menufront.png")}),
                menuBack: new Material( new defs.Textured_Phong(1), {ambient: 0.5, diffusivity: 1, specularity: 0.5, color: color(0, 0, 0, 1),
                    texture: new Texture("assets/menuback.png")}),

                // coke: new Material (new defs.Phong_Shader(), {ambient: 1, diffusivity: 1, specularity: 0.5,
                //     color: color(0.78, 0.8, 0.6, 1)}),
                coke: new Material( new defs.Textured_Phong(1), {ambient: 0.5, diffusivity: 1, specularity: 0.5, color: color(0, 0, 0, 1),
                    texture: new Texture("assets/coke_1.png")}),
                openSign: new Material( new defs.Textured_Phong(1), {ambient: 1, diffusivity: 1, specularity: 1, color: color(0, 0, 0, 1),
                    texture: new Texture("assets/open_door.png")}),

            };
        // this.jukebox = new Material( new defs.Textured_Phong( 1 ),  { color: color( 0.5,0.5,0.5,1 ),
        //     ambient: 1, diffusivity: 1, specularity: 1, texture: new Texture( "assets/pink.png" ) });
        // Bump mapped:
    }

    display( context, program_state ) { 
        const t = program_state.animation_time/1000;

        //camera movement
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Locate the camera here (inverted matrix).
            program_state.set_camera(Mat4.translation(0, -100,-320 ));   //overview of room view
            // program_state.set_camera(Mat4.translation(40, -8,-80 ));
            //Original camera coord: 40, -8, -80
            //0, 0, -5
          //  -1,-8,-25
        }
        
        program_state.projection_transform = Mat4.perspective( Math.PI/4, context.width/context.height, 1, 500 );
        // A spinning light to show off the bump map:
        program_state.lights = [ new Light(
            Mat4.rotation( t/300,   1,0,0 ).times( vec4( 3,2,10,1 ) ),
            color( 1,.7,.7,1 ), 100000 ) ];
        var mov = 0;
        if(window.ketchup_move == 1)
        {
            mov = 0.1*count;
            var max_move = 6.9;
            var max_move2 = 0.6;
            var max_angle = 1.6;
            if (mov > max_move) {
                mov = max_move
                angle += 0.06;
                mov2 += 0.01;
            }
            if (angle > max_angle) {
                angle = max_angle;
                mov2 = max_move2;
            }
        }
      
       

        //console.log(mov)
        count += 1.0;

        // const model_transform = Mat4.translation( 0, 3, 0 ).times(Mat4.rotation(-Math.PI/4,   0,1,0 ));
        let model_transform =
            Mat4.translation( -50, 25, -15 ).times(Mat4.rotation(-Math.PI/4,   0,1,0 ));
        model_transform = model_transform.times(Mat4.scale(10,10,10));
        this.shapes.jukebox.draw( context, program_state, model_transform, this.materials.jukebox );
        // let trJukebox = Mat4.identity();
        // trJukebox = trJukebox.times( Mat4. translation([0,3,0]));
        // trJukebox = trJukebox.times( Mat4.rotation(-Math.PI/4, 0,1,0));
        // this.shapes.jukebox.draw( context, program_state, trJukebox, this.materials.jukebox );

        let transformTable =  Mat4.translation( -10, 7, -15 ).times(Mat4.rotation(-Math.PI/12,   0,1,0 ));
        transformTable = transformTable.times(Mat4.scale(15, 15, 15));

        this.shapes.table.draw(context, program_state, transformTable, this.materials.table);
        const model_transform1 =
            // Mat4.translation( mov, 0.45, 0 )
            Mat4.translation( mov, 10, 0 )
                // .times(Mat4.rotation(0,0,1,0 ))

                // .times(Mat4.scale(0.3,0.3,0.3,1.0 )); //from chairs that Kim commented
                .times(Mat4.scale(0.7,0.7,0.7));
                //.times(Mat4.rotation(Math.PI/2,1,0,0)); //working Chair -Kim

                //from git conflict
                // .times(Mat4.scale(0.05,0.2,0.1,1.0 ))
                // .times(Mat4.rotation(Math.PI/2,1,0,0));


        const model_transform2 =
            // Mat4.translation( 2, 0.45, 0 )
            Mat4.translation( 10, 10, 0 )
                // .times(Mat4.rotation(0,0,1,0 ))

                // .times(Mat4.scale(0.3,0.3,0.3,1.0 )) //from chairs that Kim commented
                
                .times(Mat4.translation(mov2 -1,0,0 ))
                .times(Mat4.translation(0, -3.8, 0))
                .times(Mat4.rotation(-angle, 0, 0, 1))
                .times(Mat4.translation(0, 3.8, 0))
                .times(Mat4.scale(0.7,0.7,0.7));
                //.times(Mat4.rotation(Math.PI/2,1,0,0)); //working Chair -Kim

                //from git conflict
                // .times(Mat4.scale(0.05,0.2,0.1,1.0 ))
                // .times(Mat4.translation(mov2,0,0 ))
                // .times(Mat4.rotation(Math.PI/2,1,0,0));



        var v1 = model_transform1.times( vec4( 1,1,1,1 ) );
        var v2 = model_transform2.times( vec4( 1,1,1,1 ) );

        var dist = Math.sqrt( (v1[0]-v2[0])**2 + (v1[1]-v2[1])**2 + (v1[2]-v2[2])**2 );

        //if(dist>2) collision
        //console.log("####");
       // console.log(dist);

  //      console.log(music_play)


        this.shapes.ketchup.draw( context, program_state, model_transform1, this.materials.ketchup );
        this.shapes.mustard.draw( context, program_state, model_transform2, this.materials.mustard );

        
        // this.shapes.mustard.draw( context, program_state, model_transform2.times(Mat4.rotation(-angle,0,0,1 ) ), this.materials.mustard );

        var model_transform_menu_front = Mat4.identity();
        const menuAngle = Math.PI;
        // const upwardShift = Mat4.translation(-9, 12, -18);
        // model_transform = model_transform.times(upwardShift).times(changeRotationCorner);
        // model_transform = model_transform.times(Mat4.rotation(-(angle/2) + (angle/2*Math.sin(6*Math.PI*t)) , Vec.of(0, 0, 1)));
        //     this.currentAngle = 6 * Math.PI * t;

        // model_transform = model_transform.times(extendLength).times(resetRotationCorner);



        model_transform_menu_front = model_transform_menu_front.times(Mat4.translation(-9, 12, -18));
        model_transform_menu_front = model_transform_menu_front.times(Mat4.rotation(Math.PI/2, 0, 1, 0));
        model_transform_menu_front = model_transform_menu_front.times(Mat4.rotation(-Math.PI/2, 0, 0, 1));
        var model_transform_menu_back = model_transform_menu_front;
        model_transform_menu_back = model_transform_menu_back.times(Mat4.translation(0.05, 0, 0));
        model_transform_menu_back = model_transform_menu_back.times(Mat4.scale(4, 4, 4));
        //ALbert: I commented out this code for testing -Kim
       this.shapes.menu.draw(context, program_state, model_transform_menu_back, this.materials.menuBack);
        model_transform_menu_front = model_transform_menu_front.times(Mat4.translation(0, 0, -2.2));
        model_transform_menu_front = model_transform_menu_front.times(Mat4.rotation(-(menuAngle/2) + (menuAngle/2*Math.sin(Math.PI*t)) , 0, 1, 0));
        model_transform_menu_front = model_transform_menu_front.times(Mat4.translation(0, 0, 2.2));
        model_transform_menu_front = model_transform_menu_front.times(Mat4.scale(4, 4, 4));

        //ALbert: I commented out this code for testing -Kim
        this.shapes.menu.draw( context, program_state, model_transform_menu_front, this.materials.menuFront);

        //console.log("qqq")
        //console.log(window.music_play)
        if (window.music_play==1) {
             window.music_play = 2
             audio.src = sounds[Math.floor(Math.random() * sounds.length)];
             audio.loop = false;
             audio.play(); 
        } else if (window.music_play==0) {
             audio.pause();
        }

        var transformCoke = Mat4.identity();
        transformCoke = transformCoke.times(Mat4.translation(-20, 50, -99));
        transformCoke = transformCoke.times(Mat4.scale(35, 35, 35));
        this.shapes.coke.draw(context, program_state, transformCoke, this.materials.coke);

        var transformOpenSign = Mat4.identity();
        transformOpenSign = transformOpenSign.times(Mat4.translation(50, 50, -99));
        transformOpenSign = transformOpenSign.times(Mat4.scale(50, 50, 50));
        this.shapes.openSign.draw(context, program_state, transformOpenSign, this.materials.openSign);


        //TODO: NEED TO FIX TransformFloor is placed here to cover the image wrapping issue for now
        //NOTE: order matters for the floor and back wall transformations cuz of png
        //so plz don't change it thanks! -kim
        let transformFloor = Mat4.identity();
        transformFloor = transformFloor.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        transformFloor = transformFloor.times(Mat4.scale(150, 100, 0));
        this.shapes.plane.draw(context, program_state, transformFloor, this.materials.floorBumpMap);

        //Place flooring and walls
        let transformBackWall = Mat4.identity();
        transformBackWall = transformBackWall.times(Mat4.translation(0,50,-100));
        transformBackWall = transformBackWall.times(Mat4.scale(150,50,0));
        this.shapes.coke.draw(context, program_state, transformBackWall, this.materials.backWall);

        let transformLeftWall = Mat4.identity();
        transformLeftWall = transformLeftWall.times(Mat4.translation(-150,50,0));
        transformLeftWall = transformLeftWall.times(Mat4.rotation(Math.PI/2, 0,1,0));
        transformLeftWall = transformLeftWall.times(Mat4.scale(100,50,0));
        this.shapes.plane.draw(context, program_state, transformLeftWall, this.materials.leftWall);

        let transformRightWall = Mat4.identity();
        transformRightWall = transformRightWall.times(Mat4.translation(150,50,0));
        transformRightWall = transformRightWall.times(Mat4.rotation(Math.PI/2, 0,1,0));
        transformRightWall = transformRightWall.times(Mat4.scale(100,50,0));
        this.shapes.plane.draw(context, program_state, transformRightWall, this.materials.rightWall);

        let transformChecks = Mat4.identity();
        transformChecks = transformChecks.times(Mat4.translation(0, 1,0));
        transformChecks = transformChecks.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        transformChecks = transformChecks.times(Mat4.scale(150, 100, 0));
        this.shapes.planeFloor.draw(context, program_state, transformChecks, this.materials.floorTile);



    }
}

