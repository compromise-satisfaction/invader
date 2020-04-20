enchant()

function Images(width,height){
  Load(width,height);
}

function Load(width,height){
  var game = new Core(width, height);

  game.fps = 10;
  game.onload = function(){

    var Newscene = function(){

      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "空.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Tama = new Entity();
      Tama._element = document.createElement("img");
      Tama._element.src = "りんご.gif";
      Tama.width = width/9;
      Tama.height = width/9;
      Tama.y　= -width/9;
      scene.addChild(Tama);

      Teki = [];
      j = 0;
      k = 0;

      for (var i = 0; i < 5; i++) {
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

      Tama.addEventListener("enterframe",function(){
        Tama.y -= width/9;
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

      Background.addEventListener("enterframe",function(){
        idou_E();
        for (var i = 0; i < Teki.length; i++) {
          if(Tama.x==Teki[i].x&&Tama.y==Teki[i].y){
            for (var k = 0; k < Teki.length; k++) {
              if(Teki[k].title == "爆殺") scene.removeChild(Teki[k]);
            }
            if(Teki[i].title=="敵"){
              Teki[i].title = "爆殺";
              Teki[i]._element.src = "爆発.gif";
              Tama.y　= -width/9;
              SE.play();
              Kazu--;
              Text._element.textContent = "残り" + Kazu;
              if(Kazu==0){
                var Gameclear = new Entity();
                Gameclear._element = document.createElement("img");
                Gameclear._element.src = "クリア.png";
                Gameclear.width = width;
                Gameclear.height = height;
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
          Tama.x = Kinaimodo.x;
          Tama.y = Kinaimodo.y - Tama.height;
          SE1.play();
        }
        if(game.input.down){
          game.replaceScene(Newscene());
        }
      }

      return scene;
    };
    game.replaceScene(Newscene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  game.start();
}
