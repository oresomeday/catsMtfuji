// chapter1.js - 第一章「朝霧の中の発見」
(function() {
  'use strict';

  const Flow = GameEngine.Flow;
  const Effects = GameEngine.Effects;
  const UI = GameEngine.UI;

  const Chapter1Script = {
    chapterTitle: '朝霧の中の発見',

    async start() {
      const D = Flow.showDialogue.bind(Flow);
      const C = Flow.showChoices.bind(Flow);

      // ============================================================
      //  シーン1: よっちんの死体 — 7月26日 早朝4:10
      // ============================================================
      UI.setBackground('linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)');
      await Effects.fadeFromBlack(1200);

      await D('narrator', '7月26日 午前4:10 ── 乙女森林公園 第2キャンプ場。');
      await D('narrator', '朝もやが地面を覆い、世界はまだ闇の中にある。');
      await D('narrator', 'よっちんの死体が、駐車場の隅に横たわっていた。');

      await D('debu', 'う、嘘だろ……よっちん……よっちん！！', { effect: 'shake' });
      await D('ochi', '待て、落ち着け！　まず脈を……');
      await D('chiba', '……さっき確認した。脈はない。体温もかなり下がっている。死後数時間は経っている。');
      await D('narrator', '全員が青ざめた顔で、よっちんの死体を見下ろしている。');
      await D('narrator', 'よっちんの体には目立った外傷はない。まるで眠っているようにも見えるが、半開きの目は完全に濁っていた。');

      // 選択肢1: 死体への対応
      const choice1 = await C([
        { id: 'examine', text: '死体を詳しく調べる', setFlag: { examined_body_ch1: true } },
        { id: 'call_police', text: '「すぐに警察を呼ぼう」' },
        { id: 'ask_masahiro', text: 'マーシーの反応を観察する', setFlag: { watched_masahiro_reaction: true } }
      ]);

      if (choice1 === 'examine') {
        await D('narrator', 'のぶんはしゃがみ込み、よっちんの体を注意深く観察した。');
        await D('nobu', '（外傷は見えない……窒息か？　毒か？）');
        await D('narrator', '首筋にわずかな赤い痕がある。注射痕のようにも見える。');
        await D('nobu', '（これは……注射の痕？）');
        await D('narrator', 'さらに、よっちんの右手が何かを握りしめているのに気づいた。');
        await D('narrator', '指をこじ開けると、小さな紙片が出てきた。', { sound: 'item' });

        const choice1b = await C([
          { id: 'read_paper', text: '紙片を読む', addItem: { name: 'よっちんの紙片', icon: '📝', desc: '死体の手に握られていた紙片' }, setFlag: { got_yochi_note: true } },
          { id: 'dont_touch', text: '証拠になるかもしれない、触らない方がいい' }
        ]);

        if (choice1b === 'read_paper') {
          await D('narrator', '紙片にはこう書かれていた。');
          await D('narrator', '「ごめん　しんじるな　ぜんぶ　うそ」', { effect: 'flash', flashColor: '#fff' });
          await D('nobu', '（……何だこれ。誰に宛てたメッセージだ？　「全部嘘」とは？）');
          await D('nobu', '（よっちんが自分で書いたのか？　それとも……）');
        } else {
          await D('nobu', '警察が来るまで現場を触らない方がいい。');
          await D('chiba', '賢明だ。指紋や痕跡が消えてしまう。');
        }

      } else if (choice1 === 'call_police') {
        await D('nobu', 'すぐに警察を呼ぼう。これは事件だ。');
        await D('masahiro', '……待ってくれ。');
        await D('nobu', 'は？　何を待つんだよ。人が死んでるんだぞ！');
        await D('masahiro', 'わかってる。でも、まず状況を整理させてくれ。');

      } else {
        await D('narrator', 'のぶんはマーシーの反応を注視した。');
        await D('narrator', 'マーシーは……動揺しているように見える。だが、その動揺は他の仲間たちと比べて、どこか「浅い」気がした。');
        await D('nobu', '（マーシー……驚いてはいる。だが、「まさか」という顔はしていない）');
        await D('nobu', '（まるで……ある程度予想していたかのような……）');
        await D('narrator', 'マーシーがのぶんの視線に気づき、一瞬だけ目を逸らした。');
      }

      // ============================================================
      //  シーン2: 警察を呼ぶか議論
      // ============================================================
      await D('masahiro', 'いいか、みんな聞いてくれ。');
      await D('masahiro', '確かによっちんは死んでいる。だが……もし警察を呼んだら、俺たちは全員ここで足止めだ。');
      await D('masahiro', '事情聴取、現場検証……下手したら何日もかかる。');
      await D('debu', '当たり前だろ！　仲間が死んでるんだぞ！？');
      await D('ochi', '……でもさ、マーシーの言うこともわかる。俺たち全員が容疑者になる可能性もある。');
      await D('chiba', '確かに。現場にいた人間が最も疑われるのは犯罪捜査の基本だ。');
      await D('masahiro', 'だから提案がある。警察には後で連絡する。今はまず、予定通り富士山に登ろう。');
      await D('debu', '正気か！？');
      await D('masahiro', '下山してから通報しても変わらない。よっちんはもう……助からない。だが、俺たちの人生は続く。');

      // 選択肢2: 登山か通報か
      const choice2 = await C([
        { id: 'climb', text: '「……わかった。登ろう」', setFlag: { agreed_to_climb: true } },
        { id: 'refuse', text: '「俺は反対だ。通報するべきだ」', setFlag: { opposed_climbing: true } },
        { id: 'condition', text: '「条件がある。全員がお互いを監視すること」', setFlag: { set_watch_condition: true } }
      ]);

      if (choice2 === 'climb') {
        await D('nobu', '……わかった。登ろう。ただし、下山したらすぐに通報する。');
        await D('masahiro', 'もちろんだ。約束する。');
        await D('debu', '……本気かよ、お前ら。');
        await D('ochi', '仕方ないだろ。ここでジタバタしても何も変わらない。');
      } else if (choice2 === 'refuse') {
        await D('nobu', '俺は反対だ。通報するべきだ。これは殺人かもしれないんだぞ。');
        await D('masahiro', '殺人？　証拠はあるのか？');
        await D('nobu', 'よっちんがドタキャンしたはずなのに、ここで死んでる。それだけで異常だ。');
        await D('masahiro', '……のぶんの言い分はわかる。だが、通報しても警察が来るまで時間がかかる。その間に何ができる？');
        await D('ochi', '俺もマーシーに賛成だ。行こう。');
        await D('narrator', '結局、多数決でマーシーの提案が通った。のぶんは渋々従うことになった。');
      } else {
        await D('nobu', '条件がある。登るなら、全員がお互いを監視すること。誰も単独行動しない。');
        await D('masahiro', '……いいだろう。それなら安全だ。');
        await D('chiba', '合理的だ。バディシステムだな。');
        await D('debu', '……俺はまだ納得してないけどな。');
      }

      // ============================================================
      //  シーン3: 車で移動 — よっちんを残して
      // ============================================================
      await Effects.fadeToBlack(800);
      UI.setBackground('linear-gradient(180deg, #2c3e50 0%, #34495e 40%, #1a252f 100%)');
      await Effects.fadeFromBlack(800);

      await D('narrator', '午前4:45 ── デブコーンの車が乙女森林公園を出発した。');
      await D('narrator', 'よっちんの死体は……そのまま駐車場に残された。');
      await D('narrator', '車内は重苦しい沈黙に包まれていた。誰も口を開こうとしない。');

      // プロローグでの選択による分岐
      if (Flow.hasFlag('saw_masahiro_return')) {
        await D('nobu', '（深夜……マーシーがロッジに戻ってくるのを見た。あれは一体……）');
        await D('nobu', '（よっちんの死と関係があるのか？）');
      }

      if (Flow.hasFlag('messaged_yochi') && Flow.hasFlag('yochi_no_answer')) {
        await D('nobu', '（よっちんが送ってきた「たすけ」……あのメッセージは、助けを求めていたのか）');
        await D('nobu', '（俺がもっと早く動いていれば……）');
      }

      // 選択肢3: 車内での行動
      const choice3 = await C([
        { id: 'confront_masahiro', text: 'マーシーに深夜の行動を問い詰める', setFlag: { confronted_masahiro_car: true } },
        { id: 'talk_chiba', text: 'ちばぶに小声で相談する', setFlag: { consulted_chiba_car: true } },
        { id: 'stay_silent', text: '黙って外を見つめる' },
        { id: 'check_phone', text: 'よっちんのSNSを確認する', setFlag: { checked_yochi_sns: true } }
      ]);

      if (choice3 === 'confront_masahiro') {
        await D('nobu', 'マーシー。昨夜、お前どこに行ってた？');
        await D('narrator', '車内に緊張が走った。');
        await D('masahiro', '……何の話だ？');
        await D('nobu', '深夜。お前の寝袋は空だった。外に出てただろ。');

        if (Flow.hasFlag('saw_masahiro_return')) {
          await D('nobu', '俺はお前がロッジに戻ってきたのを見たんだ。');
          await D('masahiro', '…………。');
          await D('masahiro', '……トイレだよ。腹の調子が悪くてな。外の方が近かったから。');
          await D('nobu', 'トイレに行くのに、何かを引きずるような音がするか？');
          await D('masahiro', '……知らないな。俺はトイレに行っただけだ。');
          await D('narrator', 'マーシーの声に微かな震えがあった……ような気がした。');
        } else {
          await D('masahiro', '……トイレに行っただけだよ。それがどうかしたか？');
          await D('nobu', '（確証はない……これ以上追及するのは危険かもしれない）');
        }

      } else if (choice3 === 'talk_chiba') {
        await D('narrator', 'のぶんはちばぶの隣に座り直し、小声で話しかけた。');
        await D('nobu', '（小声で）ちばぶ……よっちんの死因、何だと思う？');
        await D('chiba', '（小声で）外傷がない以上、毒物か窒息の可能性が高い。ただ……');
        await D('nobu', 'ただ？');
        await D('chiba', 'よっちんの顔色が異様に白かった。チアノーゼの兆候がない。通常の窒息死なら唇や爪が紫色になるはずだ。');
        await D('nobu', 'つまり……');
        await D('chiba', '何らかの薬物による心停止。……つまり、他殺の可能性が高い。');
        await D('nobu', '（他殺……この中に、犯人がいる？）');

      } else if (choice3 === 'check_phone') {
        await D('narrator', 'のぶんはスマホでよっちんのSNSを確認した。');
        await D('narrator', '最後の投稿は昨日の午後1時。「今日から仲間と富士登山！　楽しみ！」');
        await D('nobu', '（……「仕事が入った」はずなのに、「楽しみ」と投稿している）');
        await D('nobu', '（ドタキャンは嘘だったのか？　よっちんはキャンプ場に来る気満々だった？）');
        await D('nobu', '（誰かに「ドタキャンした」と言わせた……？）');

      } else {
        await D('narrator', 'のぶんは何も言わず、流れる景色を見つめていた。');
        await D('narrator', '朝焼けが東の空を染め始めている。これから富士山に登る。仲間の死体を置いて。');
        await D('nobu', '（……狂ってる。この状況で登山なんて）');
      }

      // ============================================================
      //  シーン4: 道の駅すばしり — 乗り換え
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #4a90d9 0%, #87CEEB 40%, #e8d5b7 80%, #666 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '午前5:20 ── 道の駅すばしり。マイカー規制の乗り換え駐車場。');
      await D('narrator', '早朝にもかかわらず、多くの登山客で賑わっている。');
      await D('debu', '……信じられねぇ。こんな時に普通に登山の準備してる自分たちが。');
      await D('masahiro', 'デブコーン、頼む。今は普通にしてくれ。人目がある。');
      await D('ochi', '荷物チェックしとこう。水、食料、雨具……');

      // 選択肢4: 道の駅での行動
      const choice4 = await C([
        { id: 'buy_supplies', text: '売店で追加の装備を買う', addItem: { name: '登山用ストック', icon: '🥢', desc: '登山用の伸縮ストック' } },
        { id: 'observe_others', text: '周囲の登山客を観察する' },
        { id: 'check_car', text: 'デブコーンの車の中を調べる', setFlag: { searched_debu_car: true } }
      ]);

      if (choice4 === 'buy_supplies') {
        await D('narrator', 'のぶんは売店で登山用ストックを購入した。');
        await D('nobu', '（いざという時、武器にもなる……いや、何を考えてるんだ俺は）');
      } else if (choice4 === 'observe_others') {
        await D('narrator', 'のぶんは何気なく周囲を見回した。');
        await D('narrator', '……ふと、駐車場の向こう側に見覚えのある車が停まっているのに気づいた。');
        await D('nobu', '（あの車……見たことがある気がする。いや、気のせいか）');
        await D('narrator', '車のナンバーは確認できなかった。');
        Flow.setFlag('noticed_suspicious_car');
      } else {
        await D('narrator', 'みんながシャトルバスの列に並んでいる隙に、のぶんはデブコーンの車に戻った。');
        await D('narrator', 'トランクを開けると、登山道具やクーラーボックスの他に……');

        if (Flow.hasFlag('checked_trunk')) {
          await D('narrator', '昨夜見かけたビニール袋がまだあった。今度は中を確認する。');
          await D('narrator', '中には……医療用の注射器が3本入っていた。', { sound: 'shock', effect: 'flash', flashColor: '#fff' });
          await D('nobu', '（注射器……！？　なぜこんなものがデブコーンの車に？）');
          Flow.addItem({ name: '注射器の写真', icon: '💉', desc: 'デブコーンの車で見つけた注射器の写真' });
          Flow.setFlag('found_syringes');
        } else {
          await D('narrator', '見慣れない黒いバッグがあった。');
          await D('narrator', '開けようとした瞬間、背後からデブコーンの声がした。');
          await D('debu', 'おい、のぶん！　何してんだ？　バス来るぞ！');
          await D('nobu', '……ああ、悪い。忘れ物がないか確認してた。');
          await D('narrator', 'バッグの中身は確認できなかった。');
        }
      }

      // ============================================================
      //  シーン5: シャトルバス → 5合目到着
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #87CEEB 0%, #4a90d9 30%, #228B22 70%, #1a5c1a 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '午前6:00 ── 須走口5合目に到着。');
      await D('narrator', '標高約2000m。空気が少し薄く感じる。森林限界の手前で、まだ木々に囲まれている。');
      await D('masahiro', '入山手続きを済ませよう。協力金も払わないとな。');
      await D('chiba', '須走ルートは標高差約1700m。健脚なら5〜6時間で登頂可能だが、無理は禁物だ。');
      await D('ochi', '……なぁ、本当にこれでいいのか？　よっちんのことが頭から離れない。');
      await D('debu', '俺もだよ……。');
      await D('masahiro', '気持ちはわかる。だからこそ、よっちんの分まで頂上に立とう。それがよっちんへの弔いだ。');

      // 選択肢5: 登山開始前の行動
      const choice5 = await C([
        { id: 'pray', text: 'よっちんに黙祷を捧げる' },
        { id: 'prepare', text: '入念に装備を確認する', addItem: { name: 'ヘッドライト', icon: '🔦', desc: '暗い場所を照らせる' } },
        { id: 'question_ochi', text: 'おちぷーにさりげなく質問する', setFlag: { questioned_ochi_ch1: true } }
      ]);

      if (choice5 === 'pray') {
        await D('narrator', '全員が5合目で立ち止まり、よっちんに黙祷を捧げた。');
        await D('narrator', '30秒の沈黙。風の音だけが聞こえる。');
        await D('nobu', '（よっちん……何があったんだ。俺たちが知らない何かを、お前は知っていたのか）');
        Flow.setFlag('prayed_for_yochi');
      } else if (choice5 === 'prepare') {
        await D('narrator', 'のぶんは装備を入念にチェックし、ヘッドライトの電池も確認した。');
        await D('nobu', '（準備は万端だ。何が起きても対応できるようにしないと）');
      } else {
        await D('narrator', 'のぶんはおちぷーの隣に歩み寄った。');
        await D('nobu', 'おちぷー、昨日スーパーの外で電話してただろ。誰と話してたんだ？');
        await D('ochi', 'え……？　ああ、あれは会社の人だよ。休みの件で。');
        await D('nobu', '会社？　でもかなり長く話してなかったか？');
        await D('ochi', '……色々トラブルがあってさ。それだけだよ。');
        await D('nobu', '（嘘をついている……とまでは言い切れない。だが、目を合わせようとしない）');
      }

      // ============================================================
      //  シーン6: 登山開始 — 最初のポケモン遭遇
      // ============================================================
      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #87CEEB 0%, #6baa75 40%, #2d5a27 80%, #1a3a1a 100%)');
      await Effects.fadeFromBlack(500);

      await D('narrator', '午前6:15 ── 登山開始。');
      await D('narrator', '須走ルートは最初は樹林帯を進む。苔むした木々の間を、一列になって歩く。');
      await D('chiba', 'この辺りはブナやカラマツの森だ。標高が上がるとダケカンバに変わる。');
      await D('debu', 'はぁ……はぁ……もうキツい……。');
      await D('masahiro', 'ペースを落とせ、デブコーン。まだ始まったばかりだ。');

      await D('narrator', '……その時。', { sound: 'pokemon_appear' });
      await D('narrator', '茂みの中から、何かが飛び出してきた！');

      // ポケモン遭遇
      const encounter1 = await Flow.triggerPokemonEncounter();
      if (encounter1.caught) {
        await D('nobu', '仲間にできた……！　こんな場所にポケモンがいるとはな。');
        await D('chiba', '富士山の生態系にはまだ未知の部分が多い。ポケモンもその一つかもしれない。');
      } else {
        await D('nobu', '逃げられたか……。');
        await D('ochi', '今の何だ！？　動物？');
        await D('debu', 'ポケモンだろ……この山にはいるって噂がある。');
      }

      // ============================================================
      //  シーン7: 6合目付近 — 不穏な発見
      // ============================================================
      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #6699CC 0%, #88aa66 40%, #556b2f 100%)');
      await Effects.fadeFromBlack(500);

      await D('narrator', '午前7:30 ── 6合目付近。');
      await D('narrator', '樹林帯を抜け、視界が開けてきた。遠くに雲海が広がっている。');
      await D('narrator', '登山道脇に、小さな山小屋が見えた。');
      await D('masahiro', '少し休憩しよう。水分補給を。');

      await D('narrator', '一行が山小屋のベンチに座った時、のぶんは登山道の脇に何かが落ちているのに気づいた。');

      // 選択肢6: 落ちているものの確認
      const choice6 = await C([
        { id: 'pick_up_item', text: '拾って確認する', setFlag: { found_dropped_wallet: true } },
        { id: 'point_out', text: 'みんなに知らせる' },
        { id: 'ignore', text: '無視して休憩する' }
      ]);

      if (choice6 === 'pick_up_item') {
        await D('narrator', 'のぶんは落ちているものを拾い上げた。');
        await D('narrator', '……財布だった。中を開けると、免許証が入っている。');
        await D('narrator', '名前は──「加藤」。', { sound: 'shock' });
        await D('nobu', '（加藤……？　かとぱんか？　なぜかとぱんの財布がここに？）');
        await D('nobu', '（かとぱんは登山に参加していないはずだ……）');
        Flow.addItem({ name: 'かとぱんの財布', icon: '👛', desc: '登山道で拾ったかとぱんの財布' });
      } else if (choice6 === 'point_out') {
        await D('nobu', 'おい、あそこに何か落ちてるぞ。');
        await D('masahiro', 'どれ……ただのゴミだろ。放っておけ。');
        await D('narrator', 'マーシーが素早く近づき、それを拾い上げた。一瞬だけ中を確認し、ポケットにしまった。');
        await D('nobu', '（……今、マーシーがポケットに入れたのは何だ？）');
        Flow.setFlag('masahiro_took_item');
      } else {
        await D('narrator', 'のぶんは気にせず休憩を続けた。');
      }

      // ============================================================
      //  シーン8: おちぷーの異変
      // ============================================================
      await D('narrator', '休憩中、おちぷーの様子がおかしいことに気づいた。');
      await D('narrator', 'やたらとスマホを気にしている。画面を隠すように操作している。');

      // 選択肢7: おちぷーへの対応
      const choice7 = await C([
        { id: 'confront_ochi', text: '「おちぷー、誰とやり取りしてるんだ？」', setFlag: { confronted_ochi_phone: true } },
        { id: 'peek', text: 'さりげなく画面を覗き込む', setFlag: { peeked_ochi_phone: true } },
        { id: 'leave_alone', text: '放っておく' }
      ]);

      if (choice7 === 'confront_ochi') {
        await D('nobu', 'おちぷー、さっきから誰とやり取りしてるんだ？');
        await D('ochi', 'え!?　な、何でもないよ。天気予報見てただけ。');
        await D('nobu', '天気予報を見るのに、そんなに画面を隠す必要があるか？');
        await D('ochi', '……別に隠してない。気のせいだろ。');
        await D('narrator', 'おちぷーは不自然に話題を変えた。');
        await D('ochi', 'そ、それよりさ、次のポイントまであとどのくらい？');
      } else if (choice7 === 'peek') {
        await D('narrator', 'のぶんはストレッチをする振りをして、おちぷーの背後に回った。');
        await D('narrator', '画面を一瞬だけ見ることができた。');
        await D('narrator', 'LINEのやり取り。相手の名前は「ゆっきん」。', { sound: 'shock', effect: 'flash', flashColor: '#fff' });
        await D('nobu', '（ゆっきん！？　おちぷーはゆっきんと連絡を取っている！？）');
        await D('nobu', '（ゆっきんは登山に参加しないはずだ。なぜ……）');
        await D('narrator', 'メッセージの内容は読み取れなかったが、おちぷーが何かを報告しているように見えた。');
      } else {
        await D('narrator', 'のぶんはおちぷーのことを気にしつつも、干渉しなかった。');
        await D('nobu', '（まぁ、プライベートなことかもしれないしな……）');
      }

      // ============================================================
      //  シーン9: デブコーンの食事 — 7合目付近
      // ============================================================
      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #5588bb 0%, #8899aa 40%, #997755 80%, #665544 100%)');
      await Effects.fadeFromBlack(500);

      await D('narrator', '午前9:00 ── 7合目付近。本格的な岩場に差し掛かる。');
      await D('narrator', '足場が悪くなり、ペースが落ちてきた。');
      await D('debu', 'ここで軽く食べよう。俺が用意してきた特製おにぎりがある。');
      await D('narrator', 'デブコーンがリュックから包みを取り出す。彩り豊かなおにぎりが並んでいる。');
      await D('debu', '具はツナマヨと梅の2種類。俺の特製ふりかけ付きだ。');

      // 選択肢8: デブコーンのおにぎりを食べるか
      const choice8 = await C([
        { id: 'eat_tuna', text: 'ツナマヨを食べる', setFlag: { ate_tuna_ch1: true } },
        { id: 'eat_ume', text: '梅を食べる', setFlag: { ate_ume_ch1: true } },
        { id: 'own_food', text: '自分の食料を食べる', setFlag: { refused_debu_food_ch1: true } },
        { id: 'eat_both', text: '両方食べる', setFlag: { ate_both_ch1: true } }
      ]);

      if (choice8 === 'eat_tuna' || choice8 === 'eat_both') {
        await D('narrator', 'のぶんはツナマヨおにぎりを口に入れた。');
        await D('nobu', '……うまい。だが、何か変な後味があるような……');
        await D('debu', '俺の特製スパイスだよ。滋養強壮にいいんだ。');
        await D('narrator', '数分後、のぶんは軽い眩暈を感じた。', { effect: 'shake' });
        await D('nobu', '（くそ……頭がクラクラする。高山病か？　それとも……）');
        Flow.setFlag('feeling_dizzy');
      }
      if (choice8 === 'eat_ume' || choice8 === 'eat_both') {
        await D('narrator', '梅おにぎりは普通の味だった。特に異変は感じなかった。');
      }
      if (choice8 === 'own_food') {
        await D('nobu', '悪い、自分のエネルギーバーで済ませるよ。');
        await D('debu', 'そうか？　もったいないなぁ。');
        await D('narrator', 'ちばぶとおちぷーがおにぎりを食べた。しばらくして、ちばぶの顔色がわずかに悪くなった。');
        await D('chiba', '……少し気分が……高山病かもしれない。');
        await D('nobu', '（高山病か？　それとも……おにぎりのせいか？）');
      }

      // ============================================================
      //  シーン10: 衝撃の発見 — よっちんの死体、再び
      // ============================================================
      await Effects.fadeToBlack(800);
      await new Promise(r => setTimeout(r, 1000));
      UI.setBackground('linear-gradient(180deg, #4a6fa5 0%, #808080 40%, #555 100%)');
      await Effects.fadeFromBlack(800);

      await D('narrator', '午前10:30 ── 8合目手前の登山道。');
      await D('narrator', '霧が出始め、視界が悪くなってきた。', { fog: true });
      await D('narrator', '岩場を登り切った先、開けた場所に出た時──');

      await Effects.flash('#ff0000', 400);
      Effects.shake();

      await D('narrator', 'のぶんは、凍りついた。', { sound: 'shock' });
      await D('narrator', '登山道の真ん中に……人が倒れている。');
      await D('narrator', 'この朝、キャンプ場に置いてきたはずの──');
      await D('narrator', 'よっちんの死体が、そこにあった。', { effect: 'blood' });

      await D('debu', 'な、なな……ッ！！！', { effect: 'shake' });
      await D('ochi', 'あ、ありえない……ありえない！！');
      await D('masahiro', '…………。');
      await D('chiba', 'これは……物理的に不可能だ。俺たちはバスで来た。よっちんの遺体をキャンプ場に置いてきた。なのに……！');

      await D('nobu', '（どういうことだ……よっちんの死体が、8合目にある？）');
      await D('nobu', '（誰かが運んだのか？　だとしたら、いつ？　どうやって？）');

      // 選択肢9: よっちんの死体への反応
      const choice9 = await C([
        { id: 'check_body', text: '近づいて確認する', setFlag: { checked_body_ch1_mountain: true } },
        { id: 'dont_approach', text: '「近づくな！　罠かもしれない！」' },
        { id: 'accuse', text: '「誰かが運んだんだ。この中に犯人がいる！」', setFlag: { accused_group: true } }
      ]);

      if (choice9 === 'check_body') {
        await D('narrator', 'のぶんは恐る恐る、よっちんの死体に近づいた。');
        await D('narrator', '……間違いない。よっちんだ。服装も顔も同じ。');
        await D('narrator', 'だが──');
        await D('narrator', '近づいた瞬間、よっちんの目が動いた。', { sound: 'shock', effect: 'flash', flashColor: '#ff0000' });

        await Effects.shake();

        await D('yochi', '……う……うう……。');
        await D('nobu', 'よ、よっちん！？　生きてるのか！？');
        await D('yochi', '……のぶ……ん……？');
        await D('narrator', 'よっちんの目がゆっくりと開いた。濁っていたはずの瞳に、かすかに光が戻っている。');
        Flow.setFlag('yochi_revived');

      } else if (choice9 === 'dont_approach') {
        await D('nobu', '近づくな！　罠かもしれない！');
        await D('ochi', '罠って……何だよ、のぶん！');
        await D('nobu', '考えてみろ。死体がキャンプ場から消えて、登山道に現れた。普通じゃない。何者かが仕組んでいる。');
        await D('narrator', '全員が立ち止まった。その時──');
        await D('narrator', 'よっちんの体がピクリと動いた。', { sound: 'shock' });
        await D('yochi', '……う……ぐ……。');
        await D('debu', 'い、生きてる！？');
        Flow.setFlag('yochi_revived');

      } else {
        await D('nobu', '誰かが運んだんだ。この中に犯人がいる！');
        await D('masahiro', '落ち着け、のぶん。誰がどうやって運ぶんだ？　バスの中でずっと一緒だっただろ。');
        await D('ochi', 'そうだよ。俺たちの中に犯人なんていない。');
        await D('chiba', '……だが、論理的に考えれば、のぶんの言う通り誰かが運んだとしか考えられない。');
        await D('narrator', '議論が白熱する中、よっちんの体が動いた。', { sound: 'shock' });
        await D('yochi', '……やめ……ろ……。');
        Flow.setFlag('yochi_revived');
      }

      // ============================================================
      //  シーン11: よっちん蘇生 — 衝撃の告白
      // ============================================================
      await D('narrator', 'よっちんは──生きていた。');
      await D('narrator', '全員が信じられない顔でよっちんを見つめている。');
      await D('yochi', '……はぁ……はぁ……。');
      await D('nobu', 'よっちん！　お前、死んでたはずじゃ……！');
      await D('yochi', '……死んで……ない。薬で……仮死状態に……されたんだ。');
      await D('chiba', '仮死状態？　テトロドトキシンか何かか？');
      await D('yochi', '……わからない。注射……された。気づいたら……ここに……。');

      await D('narrator', 'よっちんはまだ体が痺れているのか、立ち上がれない状態だった。');

      // 選択肢10: よっちんへの質問
      const choice10 = await C([
        { id: 'who_did', text: '「誰にやられた？」' },
        { id: 'why_cancel', text: '「ドタキャンの電話は何だったんだ？」' },
        { id: 'help_first', text: 'まず手当てをしてやる', setFlag: { helped_yochi_first: true } }
      ]);

      if (choice10 === 'who_did') {
        await D('nobu', '誰にやられた、よっちん。犯人を見たか？');
        await D('yochi', '……後ろから……突然……。顔は……見えなかった。');
        await D('yochi', 'でも……声は聞こえた。「お前には退場してもらう」って……。');
        await D('nobu', '（「退場」……まるで計画的な犯行だ）');
        await D('masahiro', '声の特徴は？　男か女か？');
        await D('yochi', '……男だ。でも……わからない。知ってる声のような……知らない声のような……。');
      } else if (choice10 === 'why_cancel') {
        await D('nobu', 'ドタキャンの電話は何だったんだ？　お前が電話で「仕事が入った」と言ったんじゃないのか？');
        await D('yochi', '……違う。あの電話をかけたのは……俺じゃない。');
        await D('nobu', 'は？');
        await D('yochi', '俺のスマホが……奪われた。誰かが俺になりすまして電話した。');
        await D('nobu', '（誰かがよっちんのスマホを使って、ドタキャンの連絡をした……！？）');
        await D('nobu', '（つまり、よっちんはキャンプ場に来る予定だった。だが、来る前に襲われ、仮死状態にされた）');
        Flow.setFlag('yochi_phone_stolen');
      } else {
        await D('narrator', 'のぶんはまず、よっちんの体を起こし、水を飲ませた。');
        await D('nobu', 'ゆっくりでいい。無理に話すな。');
        await D('yochi', '……ありがとう……。のぶん……気をつけろ。');
        await D('nobu', '何に気をつけるんだ？');
        await D('yochi', '……この中に……嘘つきがいる。');
        await D('narrator', 'よっちんはそれだけ言うと、再び意識を失った。');
        Flow.setFlag('yochi_warning');
      }

      // ============================================================
      //  シーン12: 2回目のポケモン遭遇 + 危機
      // ============================================================
      await D('narrator', 'よっちんを介抱しながら、登山を続けることになった。');
      await D('narrator', 'デブコーンとちばぶがよっちんを支え、ゆっくりと登山道を進む。');

      await D('narrator', '……その時、再び茂みから何かが飛び出してきた。', { sound: 'pokemon_appear' });

      const encounter2 = await Flow.triggerPokemonEncounter();
      if (encounter2.caught) {
        await D('nobu', 'また仲間が増えた！');
        await D('chiba', 'この山には相当数のポケモンが生息しているようだ。');
      } else {
        await D('nobu', '今は構ってられない。先を急ごう。');
      }

      // ============================================================
      //  シーン13: 足場崩壊 — 選択を誤れば死
      // ============================================================
      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #808080 0%, #666 40%, #444 100%)');
      await Effects.fadeFromBlack(500);

      await D('narrator', '午前11:00 ── 8合目。');
      await D('narrator', '岩場がさらに険しくなり、片側が崖になっている箇所に差し掛かった。', { effect: 'shake' });
      await D('narrator', '霧が濃くなり、5m先も見えない。');
      await D('masahiro', '足元に気をつけろ。落ちたら助からない。');

      await D('narrator', 'その時、足元の岩が突然崩れた！', { sound: 'shock', effect: 'shake' });
      await D('nobu', 'うわっ！');
      await D('narrator', 'のぶんの足元が崩壊し、体が崖側に傾いた──！');

      // 選択肢11: 生死を分ける選択
      const choice11 = await C([
        { id: 'grab_rock', text: '岩壁を掴む' },
        { id: 'use_stick', text: 'ストックを突き立てて体を支える' },
        { id: 'roll_inward', text: '山側に体を投げ出す' }
      ]);

      if (choice11 === 'grab_rock') {
        if (Flow.hasItem('登山用ストック')) {
          await D('narrator', 'のぶんは岩壁を掴もうとしたが、手が滑った──！');
          await D('narrator', 'しかし、とっさにストックを岩の隙間に突き立て、体を支えた！');
          await D('nobu', '危なかった……！');
        } else {
          await D('narrator', 'のぶんは岩壁を掴んだ。指先が岩の凹凸を捉え、かろうじて体を支えた。');
          await D('nobu', 'くそ……！　危なかった……！');
        }
        await D('masahiro', 'のぶん！　大丈夫か！');
        await D('narrator', 'マーシーが手を差し伸べ、のぶんを引き上げた。');

      } else if (choice11 === 'use_stick') {
        if (Flow.hasItem('登山用ストック')) {
          await D('narrator', 'のぶんは咄嗟にストックを地面に突き立てた！　ストックが支えとなり、体が止まった！');
          await D('nobu', 'ストック……買っておいてよかった……！');
        } else {
          await D('narrator', 'ストックを持っていないのぶんは、とっさに近くの岩に手を伸ばした。');
          await D('narrator', '指先がギリギリで岩を掴み、体が止まった。');
          await D('nobu', 'ぐっ……！');
        }
        await D('ochi', 'のぶん！　掴まれ！');
        await D('narrator', 'おちぷーが手を伸ばし、のぶんを引き上げた。');

      } else {
        await D('narrator', 'のぶんは本能的に山側へ体を投げ出した！');
        await D('narrator', '岩で肘を強打したが、崖から落ちることは免れた。');
        await D('nobu', 'いてて……！　でも、助かった……。');
        await D('chiba', 'のぶん、判断が早かったな。山側に倒れるのは正解だ。');
      }

      await D('narrator', 'のぶんは九死に一生を得た。');
      await D('narrator', 'だが、崩れた岩場を見て、ちばぶが呟いた。');
      await D('chiba', '……この岩、自然に崩れたにしては……不自然だ。');
      await D('nobu', '何？');
      await D('chiba', '支えの部分に人為的な痕跡がある。……誰かが、意図的に岩を弱くしたようにも見える。');
      await D('nobu', '（俺を殺そうとした……？　誰が？）');

      Flow.setFlag('survived_rockfall');

      // ============================================================
      //  シーン14: 第一章クライマックス — エンディング
      // ============================================================
      await Effects.fadeToBlack(800);
      UI.setBackground('linear-gradient(180deg, #666 0%, #888 30%, #999 60%, #aaa 100%)');
      await Effects.fadeFromBlack(800);

      await D('narrator', '午前11:30 ── 8合目を超え、頂上が見え始めた。');
      await D('narrator', '霧が少し晴れ、上方に鳥居の影が見えた。');
      await D('narrator', 'よっちんは意識を取り戻し、自力で歩けるようになっていた。');
      await D('yochi', '……のぶん。');
      await D('nobu', 'どうした？');
      await D('yochi', '……この登山……普通じゃない。俺を仮死状態にした奴は……まだこの山にいる。');
      await D('nobu', '…………。');
      await D('yochi', '気をつけろ。全員を疑え。……俺も含めて。');

      await D('narrator', 'よっちんの言葉が重くのしかかる。');
      await D('narrator', 'この中に敵がいる。仲間の顔をした敵が。');
      await D('narrator', 'そして、のぶんはまだ知らない。');
      await D('narrator', 'この山には、彼らの知らない人間が……すでに潜んでいることを。');

      // 選択肢12: 最後の選択
      const choice12 = await C([
        { id: 'trust_yochi', text: 'よっちんの言葉を信じる', setFlag: { trusts_yochi: true } },
        { id: 'doubt_all', text: '全員を疑う', setFlag: { doubts_everyone: true } },
        { id: 'trust_masahiro', text: 'マーシーを信じる', setFlag: { trusts_masahiro: true } }
      ]);

      if (choice12 === 'trust_yochi') {
        await D('nobu', '……わかった。信じるよ、よっちん。');
        await D('yochi', '……ありがとう。でも、俺のことも完全に信じるな。「全部嘘」かもしれないからな。');
        await D('nobu', '（……「全部嘘」。紙片に書かれていた言葉と同じだ）');
      } else if (choice12 === 'doubt_all') {
        await D('nobu', '（全員を疑う。よっちんも、マーシーも、おちぷーも、ちばぶも、デブコーンも）');
        await D('nobu', '（信じられるのは、自分だけだ）');
        await D('narrator', 'のぶんは覚悟を決めた。たとえ孤独になっても、真実を追う。');
      } else {
        await D('nobu', '（よっちんは怪しい。マーシーは……あいつが計画した旅行だ。あいつを信じよう）');
        await D('narrator', 'のぶんはマーシーに歩み寄った。');
        await D('nobu', 'マーシー、俺はお前を信じる。何があっても、お前とは一緒にいる。');
        await D('masahiro', '……ああ。ありがとう、のぶん。');
        await D('narrator', 'マーシーは微笑んだ。しかし、その目は笑っていなかった。');
      }

      // ============================================================
      //  エンディング
      // ============================================================
      await Effects.fadeToBlack(1500);
      await new Promise(r => setTimeout(r, 1500));

      await D('narrator', '── 第一章「朝霧の中の発見」── 完 ──', {
        bg: 'linear-gradient(180deg, #000 0%, #1a0000 100%)',
        effect: 'fadeIn'
      });

      await D('narrator', '次章予告：頂上で待ち受ける新たな恐怖。そして、招かれざる客の登場──', { autoAdvance: 3000 });

      await new Promise(r => setTimeout(r, 2000));

      Flow.chapterComplete('chapter1');
    }
  };

  GameEngine.registerChapter('chapter1', Chapter1Script);
  Chapter1Script.chapterTitle = '朝霧の中の発見';

})();