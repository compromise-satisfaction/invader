enchant()

function Images(width,height){
  Load(width,height);
}

var Kazu_def = 108;

function Load(width,height){
  var game = new Core(width, height);

  game.fps = 10;
  game.onload = function(){

    var Newscene = function(){

      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "カットイン.gif";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Tama = new Entity();
      Tama._element = document.createElement("img");
      Tama.width = width/9;
      Tama.height = width/9;
      Tama.y　= -width/9;
      scene.addChild(Tama);

      var Item = new Entity();
      Item._element = document.createElement("img");
      Item._element.src = "写輪眼.png";
      Item.width = width/9;
      Item.height = width/9;
      Item.y　= height;
      scene.addChild(Item);

      var Tama_image = ["りんご.gif","オシリスの天空竜.gif","スマホ1.gif","トライセル.gif","学生証.png","強欲な壺.png","照準.png","調合したハーブ.png","爆弾.png","弁護士バッジ.gif"];
      var Image_i = 0;

      Teki = [];
      j = 0;
      k = 0;

      for (var i = 0; i < Kazu_def; i++) {
        Teki[i] = new Entity();
        Teki[i]._element = document.createElement("img");
        Teki[i].title = "敵";
        Teki[i]._element.src = "インベーダー.gif";
        Teki[i].width = width/9;
        Teki[i].height = width/9;
        Teki[i].x = width/9*j;
        Teki[i].y = width/9*k;
        j++;
        if(i%9==8){
          j = 0;
          k += 1;
        }
        scene.addChild(Teki[i]);
      }


      var Aka = rand(Teki.length);
      Teki[Aka]._element.src = "インベーダー赤.gif";
      Teki[Aka].title = "写輪眼";

      function rand(n) {
        return Math.floor(Math.random() * (n));
      }

      var BGM_start = 0;

      var BGM = document.createElement("audio");

      BGM.addEventListener("ended",function(e){
        BGM.currentTime = BGM_start;
        BGM.play();
      });

      Tama.addEventListener("enterframe",function(){
        Tama.y -= width/9;
        Item.y += width/18;
      })

      var Kinaimodo = new Entity();
      Kinaimodo._element = document.createElement("img");
      Kinaimodo._element.src = "飛行機.png";
      Kinaimodo.width = width/9;
      Kinaimodo.height = width/9;
      Kinaimodo.x = width/9*4;
      Kinaimodo.y = width/9*12;
      scene.addChild(Kinaimodo);

      var Kazu = Teki.length

      var Text = new Sprite();
      Text._element = document.createElement("innerHTML");
      Text._style.font  = width/20+"px monospace";
      Text._element.textContent = "残り" + Kazu;
      Text.x = width/20;
      Text.y = width/20;
      Text._style.color = "red";
      scene.addChild(Text);

      var SE = document.createElement("audio");
      SE.src = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/爆発.wav";

      var SE1 = document.createElement("audio");
      SE1.src = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/銃声.wav";

      var SE2 = document.createElement("audio");
      SE2.src = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ドウイツトミトメル.wav";

      var KANTUUSINAI = true;

      Background.addEventListener("enterframe",function(){
        idou_E();
        if(Item.x==Kinaimodo.x&&Item.y==Kinaimodo.y){
          Kinaimodo._element.src = "飛行機赤.png";
          Kinaimodo.title = "貫通";
          Item.y = height;
          SE2.play();
        }
        for (var i = 0; i < Teki.length; i++) {
          if(Tama.x==Teki[i].x&&Tama.y==Teki[i].y){
            for (var k = 0; k < Teki.length; k++) {
              if(Teki[k].title == "爆殺") scene.removeChild(Teki[k]);
            }
            if(Teki[i].title!="爆殺"){
              if(Teki[i].title=="写輪眼"){
                Item.x = Teki[i].x;
                Item.y = Teki[i].y;
              }
              Teki[i].title = "爆殺";
              Teki[i]._element.src = "爆発.gif";
              if(KANTUUSINAI) Tama.y　= -width/9;

              SE.play();
              Kazu--;
              Text._element.textContent = "残り" + Kazu;
              if(Kazu==0){
                var Gameclear = new Entity();
                Gameclear._element = document.createElement("img");
                Gameclear._element.src = "クリア.png";
                Gameclear.width = width;
                Gameclear.height = height;
                BGM_start = 1.541
                BGM.src = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/BGM/勝訴！～初めての勝利.wav";
                BGM.play();
                scene.addChild(Gameclear);
              }
            }
          }
        }
      })

      function idou_E(){
        if(game.input.left){
          if(Kinaimodo.x!=0) Kinaimodo.x -= width/9;
        }
        if(game.input.right){
          if(Kinaimodo.x!=width-Kinaimodo.width) Kinaimodo.x += width/9;
        }
        if(game.input.up&&Tama.y<0){
          if(BGM_start==0){
            BGM_start = 4.555;
            BGM.src = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/BGM/異議あり！～検事2.wav";
            BGM.play();
          }
          Tama._element.src = Tama_image[Image_i];
          Image_i++;
          if(Image_i==Tama_image.length) Image_i = 0;
          Tama.x = Kinaimodo.x;
          Tama.y = Kinaimodo.y - Tama.height;
          if(Kinaimodo.title=="貫通"&&KANTUUSINAI) KANTUUSINAI = false;
          SE1.play();
        }
        if(game.input.down){
          switch (Kazu_def) {
            case 108:
              Kazu_def = 54;
              break;
            case 54:
              Kazu_def = 5;
              break;
            case 5:
              Kazu_def = 1;
              break;
            default:
              Kazu_def = 108;
              break;
          }
          BGM.pause();
          game.replaceScene(Newscene());
        }
      }

      return scene;
    };
    game.replaceScene(Newscene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  game.start();
}
