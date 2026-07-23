// prologue.js - プロローグ「旅の始まり」
(function() {
  'use strict';

  const Flow = GameEngine.Flow;
  const Effects = GameEngine.Effects;
  const UI = GameEngine.UI;

  const PrologueScript = {
    chapterTitle: '旅の始まり',

    async start() {
      const D = Flow.showDialogue.bind(Flow);
      const C = Flow.showChoices.bind(Flow);

      // ============================================================
      //  シーン1: オープニング — 7月25日 朝
      // ============================================================
      UI.setBackground('linear-gradient(180deg, #87CEEB 0%, #e8d5b7 60%, #2d1b00 100%)');
      await Effects.fadeFromBlack(1200);

      await D('narrator', '2024年7月25日 ── 静岡県藤枝市。', { bg: 'linear-gradient(180deg, #87CEEB 0%, #e8d5b7 60%, #2d1b00 100%)' });
      await D('narrator', '夏の日差しが容赦なく照りつける朝。42歳になった幼馴染たちによる、富士登山計画が動き始めた。');
      await D('narrator', '企画したのはエディマーシー。「人生の折り返し地点に、みんなで富士山に登ろう」── そんな呼びかけだった。');
      await D('narrator', '誰も断る理由はなかった。……あの時は。');

      await Effects.fadeToBlack(800);
      await Effects.fadeFromBlack(800);

      // ============================================================
      //  シーン2: メンバー回収 — デブコーンの車
      // ============================================================
      UI.setBackground('linear-gradient(180deg, #4a90d9 0%, #87CEEB 40%, #a8c686 100%)');

      await D('narrator', '12:30 ── デブコーンの大型ワゴンが藤枝市大洲を出発した。');
      await D('debu', 'よーし、出発だ！　まずはよっちんの家に向かうぞ。', { sound: 'click' });
      await D('masahiro', '任せろ。ルートは完璧に組んである。東名で御殿場まで一気に行く。', { sound: 'click' });
      await D('nobu', '（久しぶりだな……みんなで集まるのは何年ぶりだ？）');
      await D('chiba', '豆知識だけど、富士山の登山者は年間約25万人。そのうち7〜8月が9割を占める。つまり今の時期は最も混む時期だ。');
      await D('debu', 'ちばぶ、もう始まったよ豆知識……。');

      // 選択肢1: 車内での会話
      const choice1 = await C([
        { id: 'excited', text: '「楽しみだな、富士山！」' },
        { id: 'worried', text: '「……正直、体力が心配だ」' },
        { id: 'silent', text: '（黙って窓の外を見る）' }
      ]);

      if (choice1 === 'excited') {
        await D('nobu', '楽しみだな、富士山！　42歳の挑戦ってやつだ。');
        await D('masahiro', 'そうだろ？　俺が企画した甲斐があるってもんだ。');
        await D('debu', '頂上で俺の特製カレーを振る舞ってやるよ！');
        await D('chiba', 'ちなみに富士山頂では気圧の関係で水は約88度で沸騰する。調理には注意が必要だ。');
        Flow.setFlag('mood_positive');
      } else if (choice1 === 'worried') {
        await D('nobu', '……正直、体力が心配だ。最近運動してないし。');
        await D('masahiro', '大丈夫だって。須走ルートは比較的楽な方だ。俺がペース配分も考えてある。');
        await D('chiba', '高山病のリスクは標高2500mを超えたあたりから。水分補給をこまめにすれば予防できる。');
        await D('nobu', '（マーシーは本当に何でも計画するやつだな……）');
        Flow.setFlag('mood_cautious');
      } else {
        await D('narrator', 'のぶんは黙って窓の外を眺めた。流れていく景色。見慣れた町並み。');
        await D('narrator', '言葉にならない不安が、胸の奥にわずかに芽生えていた。');
        await D('masahiro', 'おい、のぶん。ぼーっとしてんなよ。楽しい旅行なんだからさ。');
        Flow.setFlag('mood_uneasy');
      }

      // ============================================================
      //  シーン3: よっちんの家
      // ============================================================
      await D('narrator', '13:00 ── よっちんの自宅前に到着。');
      await D('debu', 'よっちーん！　迎えに来たぞー！');
      await D('narrator', '……しかし、玄関は静まり返っている。');
      await D('masahiro', '電話してみるか。');
      await D('narrator', 'マーシーがスマホを取り出し、よっちんに電話をかける。数コール後、よっちんが出た。');

      await D('narrator', '『……悪い、急に仕事が入っちまった。今回はパスさせてくれ。』', { sound: 'shock' });

      // 選択肢2: よっちんのドタキャンへの反応
      const choice2 = await C([
        { id: 'angry', text: '「マジかよ！　ふざけんなよ！」' },
        { id: 'understand', text: '「仕方ないな……残念だけど」' },
        { id: 'suspicious', text: '（……何か引っかかる）', setFlag: { suspicious_yochi_cancel: true } }
      ]);

      if (choice2 === 'angry') {
        await D('nobu', 'マジかよ！　ふざけんなよ、よっちん！　みんなで行くって言ったろ！');
        await D('debu', 'まぁまぁ、仕事なら仕方ないだろ。');
        await D('masahiro', '……ま、よっちんはそういう奴だからな。行くメンバーで楽しもうぜ。');
      } else if (choice2 === 'understand') {
        await D('nobu', '仕方ないな……残念だけど。');
        await D('chiba', '社会人だからな。急な仕事は誰にでもある。');
        await D('masahiro', 'そうだな。よっちんの分まで楽しもう。');
      } else {
        await D('nobu', '（……何か引っかかる。よっちんの声、妙に焦ってなかったか？）');
        await D('narrator', 'のぶんは違和感を覚えたが、それを口にすることはなかった。');
        await D('masahiro', '行こう。時間が押してる。');
      }

      // ============================================================
      //  シーン4: 他メンバー回収 → 御殿場駅
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #4a90d9 0%, #87CEEB 50%, #666 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', 'デブコーンの実家でちばぶとマーシーの荷物を積み込み、のぶん宅を経由して東名高速へ。');
      await D('narrator', '14:00 ── 御殿場駅南口。');
      await D('narrator', '東京から電車で来たおちぷーが、大きなリュックを背負って改札から出てきた。');
      await D('ochi', 'おーい！　久しぶりー！　東京から来たぜ！');
      await D('debu', 'おちぷー！　相変わらずだな！');
      await D('ochi', 'え、よっちんは？');
      await D('masahiro', 'ドタキャン。仕事だとさ。');
      await D('ochi', 'マジか……。まぁ、あいつらしいっちゃらしいけど。');

      // 選択肢3: おちぷーとの会話
      const choice3 = await C([
        { id: 'ask_tokyo', text: '「東京はどうだ？　元気にやってるか？」' },
        { id: 'ask_equipment', text: '「ちゃんと装備は揃えてきたか？」' },
        { id: 'observe', text: '（おちぷーの様子を観察する）', setFlag: { observed_ochi: true } }
      ]);

      if (choice3 === 'ask_tokyo') {
        await D('nobu', '東京はどうだ？　元気にやってるか？');
        await D('ochi', 'まぁぼちぼちだよ。仕事は相変わらずだけど、こうやって集まれるのは嬉しいね。');
        await D('nobu', '（……おちぷーは少し痩せた気がする）');
      } else if (choice3 === 'ask_equipment') {
        await D('nobu', 'ちゃんと装備は揃えてきたか？　山を舐めると痛い目見るぞ。');
        await D('ochi', '当然！　登山靴にレインウェア、ヘッドライトまで完璧よ！');
        await D('chiba', '豆知識。須走ルートは砂走りがあるから、スパッツは必須だ。持ってきたか？');
        await D('ochi', '……スパッツ？');
        await D('chiba', '足元に砂が入るのを防ぐやつだ。');
        await D('ochi', '……買ってない。');
        await D('debu', 'おちぷーらしいなぁ。');
      } else {
        await D('narrator', 'のぶんはおちぷーを注意深く観察した。');
        await D('nobu', '（リュックがやけに大きい。一泊二日にしては荷物が多くないか……？）');
        await D('nobu', '（いや、東京から来てるんだ。それくらい普通か）');
        await D('narrator', 'しかし、おちぷーのリュックのサイドポケットに、見慣れない紙片が挟まっているのが一瞬だけ見えた。');
        Flow.setFlag('saw_ochi_paper');
      }

      // ============================================================
      //  シーン5: 芦ノ湖遊船
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #4169E1 0%, #87CEEB 30%, #228B22 80%, #1a5c1a 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '15:35 ── 箱根・芦ノ湖。観光遊船に乗り込む一行。');
      await D('narrator', '湖面に反射する午後の日差しが眩しい。風が気持ちいい。');
      await D('debu', 'おお〜！　これは最高だな！　ビール飲みてぇ！');
      await D('chiba', '芦ノ湖の最大水深は約43.5m。箱根カルデラの中にある堰止湖だ。');
      await D('masahiro', '写真撮ろうぜ、みんなで。');
      await D('ochi', 'いいね！　はいチーズ！');

      // 選択肢4: 遊船での行動
      const choice4 = await C([
        { id: 'enjoy', text: '景色を楽しむ' },
        { id: 'talk_masahiro', text: 'マーシーと話す', setFlag: { talked_masahiro_boat: true } },
        { id: 'explore_ship', text: '船内を探索する' }
      ]);

      if (choice4 === 'enjoy') {
        await D('narrator', 'のぶんはデッキの手すりにもたれ、湖と山々の景色に見入った。');
        await D('nobu', '（こういう時間、大事にしないとな……）');
        await D('narrator', '富士山が遠くに見える。明日、あの頂を目指す。');
        await D('nobu', '（……でも、なぜだろう。嫌な予感が消えない）');
      } else if (choice4 === 'talk_masahiro') {
        await D('narrator', 'のぶんはマーシーの隣に立った。');
        await D('nobu', 'マーシー、この旅行、企画してくれてありがとな。');
        await D('masahiro', '……ん？　ああ、いやいや。俺も楽しみにしてたからさ。');
        await D('nobu', '（マーシーの表情が一瞬曇ったように見えた。気のせいか……？）');
        await D('masahiro', '……なぁ、のぶん。俺たち、もう42だろ。');
        await D('nobu', 'ああ。');
        await D('masahiro', 'いつまでもこうやって集まれるとは限らないよな。だから……今回は特別なんだ。');
        await D('nobu', '（「特別」……か。妙な言い方だな）');
        Flow.setFlag('masahiro_special_comment');
      } else {
        await D('narrator', 'のぶんは何気なく船内を歩き回った。');
        await D('narrator', '売店の横を通りかかった時、床に小さな金属片が落ちているのに気づいた。');

        // 選択肢5: 金属片を拾うか
        const choice4b = await C([
          { id: 'pick_up', text: '拾って確認する', addItem: { name: '謎の金属片', icon: '🔩', desc: '船の床で見つけた小さな金属片' } },
          { id: 'ignore', text: '気にせず通り過ぎる' }
        ]);

        if (choice4b === 'pick_up') {
          await D('nobu', '（何だこれ……カラビナの破片か？　誰かが落としたのかもな）');
          await D('narrator', 'のぶんはそれをポケットにしまった。');
          Flow.setFlag('found_metal_piece');
        } else {
          await D('narrator', 'のぶんはそれを踏み越えて先へ進んだ。');
        }
      }

      // ============================================================
      //  シーン6: スーパーでの買い出し
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #f5e6ca 0%, #e8d5b7 50%, #c4a882 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '16:30 ── 御殿場市内のスーパーマーケット。');
      await D('narrator', '登山用の食料と、今夜キャンプ場で食べる夕食の材料を買い込む。');
      await D('debu', '任せろ！　俺がメニューを決めてやる！　今夜はBBQだ！');
      await D('chiba', '登山食は高カロリーかつ軽量なものがいい。ようかん、ナッツ、ドライフルーツあたりが定番だ。');
      await D('ochi', '俺、酒買ってくるわ！');
      await D('masahiro', '飲みすぎるなよ。明日4時起きだからな。');

      // 選択肢6: スーパーでの行動
      const choice5 = await C([
        { id: 'help_debu', text: 'デブコーンの買い出しを手伝う' },
        { id: 'buy_own', text: '自分用の装備を買い足す', addItem: { name: '予備の水', icon: '💧', desc: '500mlの水。いざという時に' } },
        { id: 'follow_ochi', text: 'おちぷーについていく', setFlag: { followed_ochi_store: true } }
      ]);

      if (choice5 === 'help_debu') {
        await D('narrator', 'のぶんはデブコーンと一緒にBBQの材料を選んだ。');
        await D('debu', '肉は厚切りに限る！　あと、俺の秘伝のタレの材料も買わないと。');
        await D('nobu', '秘伝のタレ？');
        await D('debu', 'ふふふ……企業秘密だ。ただし、食った奴は必ず「うまい」と言う。保証する。');
        await D('nobu', '（デブコーンの料理は確かにうまい。……ただ、たまに腹を壊すんだよな）');
        Flow.setFlag('helped_debu_shopping');
      } else if (choice5 === 'buy_own') {
        await D('narrator', 'のぶんは登山用品コーナーで予備の水とエネルギーバーを購入した。');
        await D('nobu', '（備えあれば憂いなし、だ）');
      } else {
        await D('narrator', 'のぶんはさりげなくおちぷーの後をつけた。');
        await D('narrator', 'おちぷーは酒コーナーに向かうと思いきや、一度外に出てスマホで電話をかけていた。');
        await D('nobu', '（誰に電話してるんだ……？）');
        await D('narrator', '近づこうとしたが、おちぷーが振り返ったので、のぶんは慌てて離れた。');
        await D('ochi', 'あ、のぶん。どうした？');
        await D('nobu', 'いや、酒のおすすめ聞こうと思って。');
        await D('ochi', 'あー、任せとけ！　今夜は飲むぞー！');
        await D('nobu', '（……今の電話、誰にかけてたんだ？）');
      }

      // ============================================================
      //  シーン7: キャンプ場到着
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #FF6B35 0%, #D4426D 30%, #1a0a2e 70%, #0d0d1a 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '17:00 ── 乙女森林公園 第2キャンプ場。');
      await D('narrator', '夕焼けに染まる御殿場。木々に囲まれたキャンプ場に、一行は到着した。');
      await D('debu', 'チェックイン完了！　ロッジはあっちだ。荷物を降ろすぞ！');
      await D('narrator', '大きなロッジに5人分の荷物が運び込まれる。');
      await D('masahiro', 'よし、部屋割りだけど……寝袋で雑魚寝でいいよな？');
      await D('chiba', 'ロッジは広いから問題ないだろう。ちなみに乙女森林公園は標高約600m。今夜は涼しく眠れるはずだ。');

      // 選択肢7: ロッジでの場所選び
      const choice6 = await C([
        { id: 'near_door', text: '出入口の近くに陣取る', setFlag: { slept_near_door: true } },
        { id: 'near_window', text: '窓際に陣取る', setFlag: { slept_near_window: true } },
        { id: 'center', text: '真ん中に陣取る' }
      ]);

      if (choice6 === 'near_door') {
        await D('nobu', '俺はドアの近くでいいよ。トイレに行きやすいし。');
        await D('masahiro', '了解。じゃあ俺は奥にするわ。');
        await D('narrator', '（出入口の近くを選んだことが、後に重要な意味を持つことになる）');
      } else if (choice6 === 'near_window') {
        await D('nobu', '窓際がいいな。朝日で目が覚めそうだし。');
        await D('ochi', 'じゃあ俺もその隣！');
        await D('narrator', '窓の外は深い森が広がっている。夜になれば、何も見えないほどの闇に包まれるだろう。');
      } else {
        await D('nobu', '真ん中で。');
        await D('debu', 'いいねぇ、守られてる感じだな！');
        await D('nobu', '……そういう意味じゃない。');
      }

      // ============================================================
      //  シーン8: BBQ & 夕食
      // ============================================================
      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #1a0a2e 0%, #0d0d1a 50%, #000 100%)');
      await Effects.fadeFromBlack(500);

      await D('narrator', '18:30 ── BBQ開始。');
      await D('narrator', '炭火の匂いが森に漂い、肉が焼ける音が響く。ビールの缶が次々と空いていく。');
      await D('debu', 'はい、まずは乾杯！　明日の富士登山の成功を祈って！');
      await D('narrator', '「「「 かんぱーい！ 」」」');
      await D('ochi', 'うめぇ！　やっぱ外で飲むビールは最高だな！');
      await D('chiba', 'ちなみに、アルコールは高山病のリスクを高める。明日のことを考えると、ほどほどにした方がいい。');
      await D('debu', 'そう言いながらちばぶ、もう2本目じゃねぇか。');
      await D('chiba', '……知識と実践は別だ。');

      await D('narrator', 'デブコーンが秘伝のタレをかけた肉を焼き上げる。');
      await D('debu', 'さぁ、俺特製のスペシャルBBQ、食え食え！');

      // 選択肢8: デブコーンの料理を食べるか
      const choice7 = await C([
        { id: 'eat', text: 'もりもり食べる', setFlag: { ate_debu_bbq: true } },
        { id: 'taste', text: '少しだけ食べる', setFlag: { tasted_debu_bbq: true } },
        { id: 'refuse', text: '「腹の調子が悪い」と断る', setFlag: { refused_debu_bbq: true } }
      ]);

      if (choice7 === 'eat') {
        await D('nobu', 'うまそう！　いただきます！');
        await D('narrator', '……確かにうまい。だが、タレに何か独特の風味が混ざっている。');
        await D('nobu', 'デブコーン、このタレ何入れてる？');
        await D('debu', '企業秘密だって言ったろ？　ま、特別なスパイスだ。体にいいぞ。');
        await D('nobu', '（……体にいい、か）');
      } else if (choice7 === 'taste') {
        await D('nobu', '一切れだけもらうよ。');
        await D('narrator', '口に入れた瞬間、強烈なスパイスの風味が広がった。');
        await D('nobu', '（……何だこのスパイス。ちょっとクセが強いな）');
        await D('debu', 'どうだ？　もっと食えよ！');
        await D('nobu', 'いや、十分だ。ごちそうさま。');
      } else {
        await D('nobu', '悪い、ちょっと腹の調子が……。');
        await D('debu', 'マジか。大丈夫か？　明日もあるんだから無理すんなよ。');
        await D('masahiro', '水飲んどけ。');
        await D('nobu', '（本当は調子は悪くない。ただ……何となく、食べたくなかった）');
      }

      // ============================================================
      //  シーン9: 温泉
      // ============================================================
      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #2c3e50 0%, #1a252f 50%, #0d0d1a 100%)');
      await Effects.fadeFromBlack(500);

      await D('narrator', '20:00 ── 富士八景の湯。');
      await D('narrator', '露天風呂から見上げる夜空には、無数の星が瞬いていた。');
      await D('ochi', 'はぁ〜、極楽極楽。');
      await D('debu', '明日早いからな、長湯はすんなよ。');
      await D('masahiro', '……なぁ、みんな。');
      await D('narrator', 'マーシーが珍しく真剣な表情で口を開いた。');
      await D('masahiro', '明日は……何があっても、全員で頂上に立とう。約束だ。');
      await D('chiba', '当然だろ。');
      await D('ochi', 'おう！');

      // 選択肢9: マーシーの言葉への反応
      const choice8 = await C([
        { id: 'promise', text: '「約束する」と力強く頷く' },
        { id: 'question', text: '「何があっても？　大げさだな」', setFlag: { questioned_masahiro_promise: true } },
        { id: 'sense', text: '（マーシーの目を見つめる）', setFlag: { stared_masahiro: true } }
      ]);

      if (choice8 === 'promise') {
        await D('nobu', '約束する。全員で頂上だ。');
        await D('masahiro', '……ああ。ありがとう。');
        await D('narrator', 'マーシーは微かに笑った。だが、その笑みの奥に何かが隠れているように見えた。');
      } else if (choice8 === 'question') {
        await D('nobu', '何があっても？　大げさだな。普通に登って普通に降りてくるだけだろ。');
        await D('masahiro', '……ああ、そうだな。すまん、変なこと言った。');
        await D('nobu', '（マーシーが視線を逸らした。何か言いかけてやめた顔だ）');
      } else {
        await D('narrator', 'のぶんはマーシーの目をじっと見つめた。');
        await D('narrator', '湯気の向こうに見えるマーシーの瞳は……どこか遠い場所を見ていた。');
        await D('masahiro', '……何だよ、のぶん。');
        await D('nobu', 'いや、別に。');
        await D('narrator', '（あの目は、決意の目だ。何かを決めている人間の目）');
      }

      // ============================================================
      //  シーン10: 就寝前 — ロッジ
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #0a0a1a 0%, #000 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '22:00 ── ロッジに戻り、就寝準備。');
      await D('narrator', '森の静寂が辺りを包んでいる。虫の声だけが微かに聞こえる。');
      await D('debu', '明日4時起きだぞ。さっさと寝ろー。');
      await D('ochi', 'わかってるって……。おやすみ。');
      await D('chiba', 'おやすみ。');
      await D('masahiro', 'おやすみ。');

      await D('narrator', '一人、また一人と寝息が聞こえ始める。');
      await D('narrator', 'のぶんは天井を見つめながら、なかなか寝付けなかった。');

      // 選択肢10: 寝る前の行動
      const choice9 = await C([
        { id: 'try_sleep', text: '目を閉じて眠ろうとする' },
        { id: 'step_outside', text: '外の空気を吸いに行く', setFlag: { went_outside_night: true } },
        { id: 'check_phone', text: 'スマホでよっちんにメッセージを送る', setFlag: { messaged_yochi: true } }
      ]);

      if (choice9 === 'try_sleep') {
        await D('narrator', 'のぶんは目を閉じた。');
        await D('narrator', '……しかし、妙な胸騒ぎが消えない。');
        await D('narrator', '時計を見ると、23:30。あと4時間半で起床だ。');
        await D('nobu', '（寝なきゃ……）');
        await D('narrator', 'そうして、のぶんは浅い眠りに落ちた。');
      } else if (choice9 === 'step_outside') {
        await D('narrator', 'のぶんは静かに起き上がり、ロッジの外に出た。');
        await D('narrator', '夜風が冷たい。空には満天の星。');
        await D('nobu', '（いい夜だ……）');
        await D('narrator', 'ふと、駐車場の方に目をやると──');
        await D('narrator', 'デブコーンの車のトランクが、わずかに開いているのが見えた。', { sound: 'shock' });
        await Effects.flash('#fff', 200);
        await D('nobu', '（トランクが開いてる……？　閉め忘れか？）');

        const choice9b = await C([
          { id: 'check_trunk', text: 'トランクを確認しに行く', setFlag: { checked_trunk: true } },
          { id: 'leave_it', text: '気にせずロッジに戻る' }
        ]);

        if (choice9b === 'check_trunk') {
          await D('narrator', 'のぶんは駐車場に向かい、トランクを覗き込んだ。');
          await D('narrator', '中には登山道具やクーラーボックスに混じって、見覚えのないビニール袋があった。');
          await D('nobu', '（何だこれ……）');
          await D('narrator', '袋の中を見ようとした瞬間、背後でバキッと枝を踏む音がした。', { sound: 'shock', effect: 'shake' });
          await D('nobu', '！？');
          await D('narrator', '振り返るが、誰もいない。暗い森が広がっているだけだ。');
          await D('nobu', '（……気のせいか。いや、確かに音がした）');
          await D('narrator', 'のぶんは急いでトランクを閉め、ロッジに戻った。');
          Flow.setFlag('heard_noise_night');
        } else {
          await D('narrator', 'のぶんはロッジに戻り、寝袋にもぐりこんだ。');
        }
      } else {
        await D('narrator', 'のぶんはスマホを開き、よっちんにLINEを送った。');
        await D('nobu', '「今キャンプ場着いた。残念だったな。また次の機会に」');
        await D('narrator', '……既読はつかない。');
        await D('nobu', '（もう寝てるのか……）');
        await D('narrator', '時計は23:45を示していた。');
        await D('narrator', '不意に、のぶんのスマホが一瞬だけ震えた。', { sound: 'shock' });
        await D('narrator', '通知を見ると、よっちんから──');
        await D('narrator', '「たすけ」', { effect: 'flash', flashColor: '#ff0000' });
        await D('narrator', '……それだけだった。打ちかけのメッセージ。', { sound: 'shock' });
        await D('nobu', '（……は？　何だこれ）');

        const choice9c = await C([
          { id: 'call_yochi', text: 'すぐによっちんに電話する', setFlag: { called_yochi_night: true } },
          { id: 'show_others', text: 'みんなを起こして相談する', setFlag: { woke_others_night: true } },
          { id: 'dismiss', text: '酔っ払いのいたずらだろうと思う' }
        ]);

        if (choice9c === 'call_yochi') {
          await D('narrator', 'のぶんはすぐによっちんに電話をかけた。');
          await D('narrator', 'コール音が鳴り続ける。1回……2回……3回……');
          await D('narrator', '出ない。');
          await D('narrator', '10回コールしても出ない。');
          await D('nobu', '（くそ、何してんだよ、よっちん……）');
          await D('narrator', 'そのうち、留守番電話に切り替わった。');
          await D('nobu', '（「たすけ」……冗談にしては、タチが悪い）');
          Flow.setFlag('yochi_no_answer');
        } else if (choice9c === 'show_others') {
          await D('nobu', 'おい、みんな起きろ。');
          await D('debu', 'んぁ……何だよ、まだ4時じゃないだろ……');
          await D('nobu', 'よっちんから変なメッセージが来た。「たすけ」って……。');
          await D('masahiro', '……はぁ？　見せてみろ。');
          await D('narrator', 'マーシーがスマホの画面を見る。');
          await D('masahiro', '……酔っ払って変なメッセージ送っただけだろ。あいつはそういう奴だ。明日にしろ。');
          await D('ochi', '俺もそう思うわ。寝ようぜ。');
          await D('nobu', '（……本当にそうか？）');
        } else {
          await D('nobu', '（どうせ酔っ払って変なメッセージ送ったんだろ。あいつらしい）');
          await D('narrator', 'のぶんはスマホを閉じ、目を閉じた。');
          await D('narrator', '……だが、その判断を後悔する日が来る。');
        }
      }

      // ============================================================
      //  シーン11: 深夜 ── 異変
      // ============================================================
      await Effects.fadeToBlack(1000);
      await new Promise(r => setTimeout(r, 1500));
      UI.setBackground('linear-gradient(180deg, #000 0%, #0a0000 50%, #1a0000 100%)');
      await Effects.fadeFromBlack(1200);

      await D('narrator', '── 深夜2:47。');
      await D('narrator', 'のぶんは物音で目を覚ました。', { sound: 'shock' });
      await D('narrator', '……いや、物音というより、「何かを引きずる音」。');

      await Effects.shake();

      await D('nobu', '（……何だ？）');
      await D('narrator', 'ロッジの外から、ズルッ……ズルッ……という不規則な音が聞こえる。');
      await D('narrator', '周りを見回す。ちばぶ、デブコーン、おちぷー……全員、寝袋の中で眠っているようだ。');

      await D('nobu', '（マーシーは……？）');

      if (Flow.hasFlag('slept_near_door')) {
        await D('narrator', 'のぶんはドアの近くに寝ていた。マーシーの寝袋を見ると──空だった。', { sound: 'shock' });
        await D('nobu', '（マーシーがいない……！？　トイレか？）');
        Flow.setFlag('noticed_masahiro_absent');
      } else {
        await D('narrator', '暗くてよく見えないが、マーシーの寝袋あたりに人の気配がない気がした。');
        await D('nobu', '（気のせいか……？　暗くてよくわからない）');
      }

      // 選択肢（追加分岐）: 深夜の行動
      const choice10 = await C([
        { id: 'investigate_sound', text: '音の正体を確かめに外へ出る', setFlag: { investigated_night_sound: true } },
        { id: 'pretend_sleep', text: '寝たふりをして様子を窺う', setFlag: { pretended_sleep: true } },
        { id: 'wake_chiba', text: 'ちばぶを起こす' }
      ]);

      if (choice10 === 'investigate_sound') {
        await D('narrator', 'のぶんはそっと寝袋を出て、ドアに近づいた。');
        await D('narrator', '外は漆黒の闇。月明かりだけが辛うじて地面を照らしている。');
        await D('narrator', 'ドアをそっと開けると──');
        await D('narrator', '目の前を、何かが横切った。', { effect: 'flash', flashColor: '#000', sound: 'shock' });
        await D('nobu', '！');
        await D('narrator', '暗すぎて何も見えない。だが、確かに人影が……。');
        await D('narrator', 'その時、背後からバタンとドアが閉まった。', { effect: 'shake', sound: 'shock' });
        await D('nobu', 'うわっ！');
        await D('narrator', '振り返ると、風でドアが閉まっただけだった。');
        await D('narrator', '……だが、もう外には何の気配もなかった。');
        await D('narrator', '引きずるような音も、止んでいた。');
        await D('nobu', '（……何だったんだ、今の）');
        await D('narrator', 'のぶんはロッジに戻った。マーシーの寝袋に目をやると──');
        await D('narrator', 'マーシーは寝袋の中にいた。寝息を立てている。');
        await D('nobu', '（いる……？　さっきいなかったような気がしたのに）');
        await D('nobu', '（いや、暗くて見間違えたのかもしれない。……考えすぎだ）');
      } else if (choice10 === 'pretend_sleep') {
        await D('narrator', 'のぶんは目を閉じ、寝たふりをしながら耳を澄ませた。');
        await D('narrator', 'ズルッ……ズルッ……。');
        await D('narrator', '音はロッジの北側を通り過ぎ、やがて遠ざかっていった。');
        await D('narrator', '……数分後、ロッジのドアがゆっくりと開く音がした。', { sound: 'shock' });
        await D('narrator', '誰かが静かにロッジに入ってくる。足音を殺して。');
        await D('narrator', 'のぶんは薄目を開けた。');
        await D('narrator', '暗くてシルエットしか見えないが──それはマーシーだった。', { sound: 'shock' });
        await D('narrator', 'マーシーは自分の寝袋に滑り込み、じっと動かなくなった。');
        await D('nobu', '（マーシー……何してたんだ、こんな時間に？）');
        Flow.setFlag('saw_masahiro_return');
      } else {
        await D('narrator', 'のぶんはそっとちばぶの肩を揺すった。');
        await D('chiba', '……んん？　何……？');
        await D('nobu', '（小声で）おい、外から変な音がする。聞こえるか？');
        await D('narrator', '二人で耳を澄ませる。');
        await D('narrator', '……しかし、もう何の音も聞こえなかった。');
        await D('chiba', '……風じゃないのか？　山の夜は色んな音がする。動物かもしれないし。');
        await D('nobu', '……そうかもな。悪い、起こして。');
        await D('chiba', 'いいよ。もう少し寝よう……明日は早い。');
        await D('narrator', 'ちばぶはすぐに寝息を立て始めた。');
        await D('nobu', '（気のせいだったのか……？）');
      }

      // ============================================================
      //  シーン12: プロローグ終結 — 不穏な朝
      // ============================================================
      await Effects.fadeToBlack(1200);
      await new Promise(r => setTimeout(r, 2000));

      UI.setBackground('linear-gradient(180deg, #2c3e50 0%, #4a4a6a 30%, #1a0a2e 100%)');
      await Effects.fadeFromBlack(1000);

      await D('narrator', '── 7月26日。午前4:00。');
      await D('narrator', 'アラームが鳴り響き、一行は重い体を起こした。');
      await D('debu', 'うおおお……眠い……。');
      await D('ochi', '4時……地獄だ……。');
      await D('masahiro', 'さ、準備するぞ。バスの時間がある。', { sound: 'click' });
      await D('narrator', 'マーシーだけは、すでに完全に身支度を整えていた。');
      await D('chiba', '早いな、マーシー。');
      await D('masahiro', '興奮して早く目が覚めちまった。……さぁ、行こう。');

      await D('narrator', 'しかし──');
      await D('narrator', 'ロッジを出て、キャンプ場の駐車場に向かった時。');

      await Effects.flash('#ff0000', 300);
      Effects.shake();

      await D('narrator', '駐車場の片隅に、人が倒れていた。', { sound: 'shock' });
      await D('nobu', '……え？');
      await D('narrator', '近づいてみると──', { effect: 'blood' });

      await D('narrator', 'よっちんだった。');
      await D('narrator', '目を見開き、口を半開きにしたまま、地面に横たわっている。');
      await D('narrator', '顔は蒼白。体は冷たく、ピクリとも動かない。');

      await D('debu', 'う、うわああああっ！！！', { effect: 'shake', sound: 'shock' });
      await D('ochi', 'よ、よっちん！？　おい、よっちん！！');
      await D('chiba', '……脈は……。');
      await D('narrator', 'ちばぶが恐る恐るよっちんの首に手を当てる。');
      await D('chiba', '…………。');
      await D('chiba', '……ない。脈がない。');

      await D('narrator', '── よっちんは死んでいた。');
      await D('narrator', 'ドタキャンしたはずのよっちんが、なぜここにいる？');
      await D('narrator', 'なぜ死んでいる？');
      await D('narrator', '一体、昨夜何が起きた？');

      await D('narrator', '42歳の幼馴染たちの富士登山は──');
      await D('narrator', '最悪の朝で幕を開けた。');

      await Effects.fadeToBlack(1500);
      await new Promise(r => setTimeout(r, 1000));

      await D('narrator', '── プロローグ「旅の始まり」── 完 ──', {
        bg: 'linear-gradient(180deg, #000 0%, #1a0000 100%)',
        effect: 'fadeIn'
      });

      await new Promise(r => setTimeout(r, 2000));

      // ============================================================
      //  プロローグ完了
      // ============================================================
      Flow.chapterComplete('prologue');
    }
  };

  // Register
  GameEngine.registerChapter('prologue', PrologueScript);
  PrologueScript.chapterTitle = '旅の始まり';

})();