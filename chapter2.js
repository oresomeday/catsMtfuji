// chapter2.js - 第二章「霧中の邂逅」
(function() {
  'use strict';

  const Flow = GameEngine.Flow;
  const Effects = GameEngine.Effects;
  const UI = GameEngine.UI;

  const Chapter2Script = {
    chapterTitle: '霧中の邂逅',

    async start() {
      const D = Flow.showDialogue.bind(Flow);
      const C = Flow.showChoices.bind(Flow);

      // ============================================================
      //  シーン1: 頂上到着 — 7月26日 正午
      // ============================================================
      UI.setBackground('linear-gradient(180deg, #334455 0%, #aabbcc 30%, #ddeeff 60%, #fff 100%)');
      await Effects.fadeFromBlack(1200);

      await D('narrator', '7月26日 正午 ── 富士山頂上 久須志神社。');
      await D('narrator', '標高3776m。日本最高峰。薄い空気の中、一行はついに頂上に立った。');
      await D('narrator', '雲海が眼下に広がり、空は深い青。だが、誰も感動を口にしなかった。');

      await D('debu', 'はぁ……はぁ……着いた……のか……。');
      await D('chiba', '富士山頂の気圧は平地の約63%。酸素濃度もそれに比例して低い。無理はするな。');
      await D('masahiro', 'よし、昼飯にしよう。ここなら風も凌げる。');

      await D('narrator', 'よっちんは他の登山客から離れたベンチに座り、じっと下界を見つめていた。');
      await D('narrator', '仮死状態から目覚めた体はまだ万全ではないようだ。顔色が悪い。');

      // 選択肢1: 頂上での行動
      const choice1 = await C([
        { id: 'talk_yochi', text: 'よっちんに話しかける', setFlag: { talked_yochi_summit: true } },
        { id: 'observe_group', text: '全員の様子を観察する', setFlag: { observed_summit: true } },
        { id: 'explore_summit', text: '頂上付近を探索する', setFlag: { explored_summit: true } },
        { id: 'eat_lunch', text: '昼食を食べる' }
      ]);

      if (choice1 === 'talk_yochi') {
        await D('narrator', 'のぶんはよっちんの隣に座った。');
        await D('nobu', '体の具合はどうだ？');
        await D('yochi', '……まだ手足が痺れてる。でも、マシにはなってきた。');
        await D('nobu', 'よっちん……もう少し詳しく教えてくれないか。昨夜、何があったのか。');
        await D('yochi', '……俺は、昨日の昼頃に家を出た。デブコーンの車に乗る予定だった。');
        await D('yochi', 'でも、家を出た直後に……後ろから誰かに押さえつけられて、注射された。気づいたら、あの駐車場に転がされてた。');
        await D('nobu', 'その後、登山道に運ばれたのか？');
        await D('yochi', '……それが分からない。気がついたら山の上にいた。');

        if (Flow.hasFlag('got_yochi_note')) {
          await D('nobu', 'お前の手に紙片が握られていた。「全部嘘」って書いてあった。あれは何だ？');
          await D('yochi', '……紙片？　俺は知らない。誰かが俺の手に握らせたんだ。');
          await D('yochi', 'だが……「全部嘘」という言葉は正しいかもしれない。この旅行の全てが、仕組まれてる可能性がある。');
          Flow.setFlag('yochi_confirmed_note');
        }

      } else if (choice1 === 'observe_group') {
        await D('narrator', 'のぶんは食事の準備をする振りをしながら、全員の行動を観察した。');
        await D('narrator', 'デブコーン──黙々と料理の準備をしている。手際は良い。');
        await D('narrator', 'ちばぶ──地図を広げ、下山ルートを確認している。');
        await D('narrator', 'おちぷー──またスマホを触っている。画面は隠していないが……こちらに背を向けている。');
        await D('narrator', 'マーシー──神社の裏手に一人で歩いていった。何をしている？');
        await D('nobu', '（マーシーが一人で動いた。追うべきか……）');

        const choice1b = await C([
          { id: 'follow_masahiro', text: 'マーシーの後を追う', setFlag: { followed_masahiro_summit: true } },
          { id: 'stay_put', text: 'ここで見張りを続ける' }
        ]);

        if (choice1b === 'follow_masahiro') {
          await D('narrator', 'のぶんはさりげなくマーシーの後を追った。');
          await D('narrator', '神社の裏手。岩の陰で、マーシーは電話をしていた。');
          await D('masahiro', '……ああ、予定通りだ。……いや、少し問題が起きたが、修正可能だ。', { sound: 'shock' });
          await D('nobu', '（「予定通り」？「修正可能」？　何の話をしている？）');
          await D('masahiro', '……分かってる。最後までやり遂げる。');
          await D('narrator', 'マーシーが電話を切った。のぶんは急いで元の場所に戻った。');
          await D('nobu', '（マーシーは誰と話していた？　そして「予定通り」とは、何の予定だ？）');
        } else {
          await D('narrator', 'のぶんはマーシーを目で追いつつ、他の仲間の監視を続けた。');
          await D('narrator', '数分後、マーシーが戻ってきた。何事もなかったかのように。');
        }

      } else if (choice1 === 'explore_summit') {
        await D('narrator', 'のぶんは頂上付近を歩き回った。');
        await D('narrator', '火口の縁から下を覗くと、深い穴が闇の中に消えている。');
        await D('narrator', '……ふと、登山道から外れた岩陰に、不自然に積まれた石があるのに気づいた。');
        await D('narrator', '石をどけると──そこには、小さなジップロック袋が隠されていた。');
        await D('narrator', '中には薬のカプセルが5つ入っている。', { sound: 'item' });
        Flow.addItem({ name: '不審なカプセル', icon: '💊', desc: '頂上の岩陰に隠されていた謎の薬' });
        await D('nobu', '（誰かが事前に隠しておいたのか？　この薬は何だ？）');

      } else {
        await D('narrator', 'のぶんは疲れた体を休め、持参したおにぎりを食べた。');
        await D('narrator', '標高3776mで食べる飯は味気なかった。死の影がちらつく中で食欲など湧くはずもない。');

        if (Flow.hasFlag('feeling_dizzy')) {
          await D('narrator', '……さっきから続いている眩暈がまだ治まらない。');
          await D('nobu', '（高山病か？　それとも、あのおにぎりの影響がまだ……）');
        }
      }

      // ============================================================
      //  シーン2: 昼食中の異変 — デブコーンのスープ
      // ============================================================
      await D('debu', 'はい、頂上到達記念のスープだ。俺特製の。');
      await D('narrator', 'デブコーンが携帯コンロで作った温かいスープをカップに注いでいく。');
      await D('chiba', 'ありがたい。この標高では温かい飲み物が何よりだ。');
      await D('ochi', 'いただきまーす。');

      // 選択肢2: デブコーンのスープ
      const choice2 = await C([
        { id: 'drink', text: 'スープを飲む', setFlag: { drank_summit_soup: true } },
        { id: 'smell_first', text: '匂いを嗅いでから判断する', setFlag: { smelled_soup: true } },
        { id: 'refuse_soup', text: '「いや、水でいい」と断る', setFlag: { refused_soup: true } },
        { id: 'switch_cups', text: 'さりげなく他の人のカップと交換する' }
      ]);

      if (choice2 === 'drink') {
        await D('narrator', 'のぶんはスープを飲んだ。');
        await D('narrator', '温かい。体の芯から温まる。……しかし。');
        await D('narrator', '10分後、猛烈な腹痛が襲ってきた。', { effect: 'shake', sound: 'shock' });
        await D('nobu', 'ぐっ……！　腹が……！');
        await D('chiba', 'のぶん！？　大丈夫か！');
        await D('narrator', 'のぶんは岩陰に駆け込んだ。激しい下痢。体から水分が奪われていく。');
        await D('debu', 'おいおい、高山病じゃないのか？');
        await D('nobu', '（これは……高山病なんかじゃない。間違いなくスープだ）');
        Flow.setFlag('poisoned_by_soup');
      } else if (choice2 === 'smell_first') {
        await D('narrator', 'のぶんはカップを口元に持っていき、匂いを嗅いだ。');
        await D('narrator', '……普通のコンソメスープの香り。だが、その奥にかすかに薬品のような匂いが混ざっている。');
        await D('nobu', '（……何だ、この匂い）');
        await D('nobu', 'デブコーン、このスープ何入れた？');
        await D('debu', 'コンソメと乾燥野菜とウインナーだよ。あと俺の秘伝スパイス。');
        await D('nobu', '……やめとく。腹の調子が悪い。');
        await D('narrator', 'カップをそっと置いた。');
        await D('narrator', '数分後──おちぷーが腹を押さえてうずくまった。');
        await D('ochi', 'う……！　な、なんか急に腹が……！', { effect: 'shake' });
        await D('nobu', '（やっぱり……！）');
      } else if (choice2 === 'refuse_soup') {
        await D('nobu', 'いや、水でいい。ありがとう。');
        await D('debu', 'そうか？　もったいない。');
        await D('narrator', '他の全員がスープを飲んだ。');
        await D('narrator', '10分後、おちぷーとちばぶが体調不良を訴え始めた。');
        await D('ochi', '……腹痛い……。');
        await D('chiba', '……これは高山病ではない。消化器系の症状だ。つまり……');
        await D('chiba', 'スープに何か入っていた可能性がある。', { sound: 'shock' });
        await D('debu', 'は？　俺のスープが原因だって言うのか！？');
      } else {
        await D('narrator', 'のぶんは配られたカップを持ち、さりげなく立ち上がった。');
        await D('narrator', 'デブコーンの注意が逸れた隙に、自分のカップとデブコーンのカップを入れ替えた。');
        await D('narrator', '数分後、デブコーン自身が腹を押さえた。', { effect: 'shake' });
        await D('debu', 'うぐっ……！　俺まで腹が……！');
        await D('nobu', '（デブコーン自身が体調を崩した……？　ということは、デブコーンは毒の存在を知らなかった？）');
        await D('nobu', '（誰かがデブコーンの調理道具に細工した可能性がある）');
        Flow.setFlag('debu_self_poisoned');
      }

      // ============================================================
      //  シーン3: 招かれざる客 — かとぱん登場
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #778899 0%, #999 40%, #bbb 70%, #ddd 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '頂上の混乱の中、聞き覚えのある声が響いた。');
      await D('kato', 'おいおい、お前ら何やってんだ。ぐったりしてるじゃねぇか。', { sound: 'shock' });
      await D('narrator', '振り返ると、白い登山ウェアを着た男が立っていた。');
      await D('narrator', 'かとぱんだった。');

      await Effects.flash('#fff', 300);

      await D('nobu', 'か、かとぱん！？　なぜここに！？');
      await D('kato', 'よぉ、久しぶり。偶然だな。俺も今日富士山に登ってたんだよ。');
      await D('ochi', '偶然……？　マジで？');
      await D('kato', '信じる信じないはお前ら次第だ。それより、体調崩してる奴がいるんだろ？　俺に診せてみろ。');
      await D('narrator', 'かとぱんはリュックから医療キットを取り出した。');

      // 選択肢3: かとぱんへの対応
      const choice3 = await C([
        { id: 'accept_help', text: 'かとぱんの治療を受ける' },
        { id: 'refuse_help', text: '「触るな」と拒否する', setFlag: { refused_kato_help: true } },
        { id: 'interrogate', text: '「偶然のわけないだろ。本当のことを言え」', setFlag: { interrogated_kato: true } }
      ]);

      if (choice3 === 'accept_help') {
        await D('narrator', 'かとぱんは手際よく体調不良の仲間を診察した。');
        await D('kato', '軽い食中毒の症状だな。下剤に近い成分を摂取したっぽい。');
        await D('kato', 'はい、これ飲め。整腸剤だ。');
        await D('narrator', 'かとぱんが配った薬を飲んだ者は、しばらくして症状が落ち着いた。');
        await D('nobu', '（かとぱんの医療知識は確かだ。だが……なぜこのタイミングで現れた？）');
        Flow.setFlag('took_kato_medicine');
      } else if (choice3 === 'refuse_help') {
        await D('nobu', '触るな、かとぱん。なぜお前がここにいる。説明しろ。');
        await D('kato', 'おいおい、冷たいな。同級生が困ってるのを見て声かけただけだろ。');
        await D('masahiro', 'のぶん、落ち着けよ。かとぱんは医者だ。診てもらった方がいい。');
        await D('nobu', '（マーシーがかとぱんの肩を持つ？……繋がっているのか？）');
      } else {
        await D('nobu', '偶然のわけないだろ。かとぱん、本当のことを言え。なぜここにいる。');
        await D('kato', '……。');
        await D('kato', '……正直に言うよ。マーシーに呼ばれたんだ。');
        await D('narrator', '全員の視線がマーシーに集まった。', { sound: 'shock' });
        await D('masahiro', '……ああ、そうだ。万が一に備えて、医者がいた方がいいと思ってな。');
        await D('nobu', '（マーシーが呼んだ？　つまり最初から計画に含まれていた？）');
        await D('nobu', '（「万が一」……マーシーは何が起きるか、予測していたのか？）');
        Flow.setFlag('kato_called_by_masahiro');
      }

      // ============================================================
      //  シーン4: 下山開始 — 不穏な空気
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #aaa 0%, #888 30%, #666 60%, #444 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '午後1:00 ── 須走ルート下山道。下山開始。');
      await D('narrator', '頂上から続くザレ場。足元の砂利が滑りやすく、一歩ごとに膝に負担がかかる。');
      await D('narrator', 'かとぱんも一緒に下山することになった。6人の登山隊は、7人になった。');
      await D('chiba', '須走下山道は「砂走り」がある。足を砂に沈ませながら一気に駆け下りるポイントだ。楽だが、膝を壊す可能性もある。');
      await D('debu', '……まだ腹の調子が悪い。ゆっくり行かせてくれ。');
      await D('masahiro', 'いいよ。ペースは各自に任せる。ただし、二人一組で行動しろ。');

      // 選択肢4: バディの選択
      const choice4 = await C([
        { id: 'pair_chiba', text: 'ちばぶと組む', setFlag: { paired_chiba: true } },
        { id: 'pair_yochi', text: 'よっちんと組む', setFlag: { paired_yochi: true } },
        { id: 'pair_masahiro', text: 'マーシーと組む', setFlag: { paired_masahiro: true } },
        { id: 'pair_kato', text: 'かとぱんと組む', setFlag: { paired_kato: true } }
      ]);

      if (choice4 === 'pair_chiba') {
        await D('nobu', 'ちばぶ、一緒に行こう。');
        await D('chiba', '了解。頼れるパートナーだ。');
        await D('narrator', '残りの組み合わせは、マーシー＆おちぷー、デブコーン＆よっちん＆かとぱんとなった。');
      } else if (choice4 === 'pair_yochi') {
        await D('nobu', 'よっちん、俺と一緒に降りよう。まだ本調子じゃないだろ。');
        await D('yochi', '……ああ。助かる。');
        await D('narrator', '残りはマーシー＆おちぷー、デブコーン＆ちばぶ＆かとぱんとなった。');
      } else if (choice4 === 'pair_masahiro') {
        await D('nobu', 'マーシー、俺と組もう。');
        await D('masahiro', '……いいのか？');
        await D('nobu', '（マーシーの側にいれば、行動を監視できる）');
        await D('narrator', '残りはおちぷー＆ちばぶ、デブコーン＆よっちん＆かとぱんとなった。');
      } else {
        await D('nobu', 'かとぱん、一緒に降りよう。色々聞きたいこともある。');
        await D('kato', '……いいぜ。何でも聞いてくれ。');
        await D('narrator', '残りはマーシー＆おちぷー、デブコーン＆ちばぶ＆よっちんとなった。');
      }

      // ============================================================
      //  シーン5: 下山中 — バディとの会話
      // ============================================================
      await Effects.fadeToBlack(400);
      UI.setBackground('linear-gradient(180deg, #888 0%, #997755 40%, #887744 70%, #665533 100%)');
      await Effects.fadeFromBlack(400);

      await D('narrator', '午後1:30 ── 下山道。砂走りの手前。');

      if (Flow.hasFlag('paired_chiba')) {
        await D('chiba', 'のぶん、一つ気になることがある。');
        await D('nobu', '何だ？');
        await D('chiba', 'よっちんが仮死状態にされた薬物……テトロドトキシンではないと思う。');
        await D('nobu', 'なぜ？');
        await D('chiba', 'テトロドトキシンは致死量と仮死状態の量の差が極めて小さい。素人が扱うのは危険すぎる。');
        await D('chiba', 'おそらく医療用の麻酔薬……プロポフォールか何かだ。');
        await D('nobu', '医療用の麻酔薬……それを扱える人間は？');
        await D('chiba', '……医者、看護師、あるいは医療に詳しい人間。');
        await D('nobu', '（かとぱんは医者だ……）');
        Flow.setFlag('chiba_drug_analysis');

      } else if (Flow.hasFlag('paired_yochi')) {
        await D('yochi', '……のぶん。言ってないことがある。');
        await D('nobu', '何だ。');
        await D('yochi', '俺が襲われる前……妙な電話がかかってきたんだ。');
        await D('nobu', '電話？');
        await D('yochi', '「富士山には来るな」って。男の声だった。');
        await D('nobu', '誰の声だ？');
        await D('yochi', '……加工されてた。分からない。でも、俺を黙らせたかった理由がある。');
        await D('yochi', '実は……俺、この旅行の前にマーシーの机の上で変な書類を見ちまったんだ。');
        await D('nobu', '書類？');
        await D('yochi', '「保険」に関する書類だ。俺たち全員の名前が載ってた。');
        await D('nobu', '（保険……！？）', { sound: 'shock' });
        Flow.setFlag('yochi_saw_insurance');

      } else if (Flow.hasFlag('paired_masahiro')) {
        await D('narrator', 'しばらく無言で歩いた後、マーシーが口を開いた。');
        await D('masahiro', 'なぁ、のぶん。');
        await D('nobu', '何だ。');
        await D('masahiro', 'もし……もし仮にだよ。この中の誰かが、俺たちを殺そうとしてるとしたら、お前はどうする？');
        await D('nobu', '……なぜそんなことを聞く。');
        await D('masahiro', 'いや、「もし」の話だ。お前なら、誰を疑う？');
        await D('nobu', '（マーシーは何を探っている……？）');

        const choice5b = await C([
          { id: 'suspect_kato', text: '「かとぱんだ。突然現れたのが怪しい」' },
          { id: 'suspect_debu', text: '「デブコーンだ。スープに毒を入れた」' },
          { id: 'suspect_masahiro', text: '「お前だよ、マーシー」', setFlag: { accused_masahiro_directly: true } },
          { id: 'no_answer', text: '「答えられない」' }
        ]);

        if (choice5b === 'suspect_masahiro') {
          await D('masahiro', '……俺？');
          await D('nobu', 'この旅行を企画したのはお前だ。かとぱんを呼んだのもお前。全部お前の計画に沿って動いてる。');
          await D('masahiro', '…………。');
          await D('masahiro', '……のぶん。お前は賢いな。だが、俺じゃない。信じてくれ。');
          await D('nobu', '（信じてくれ、か。その言葉が一番信じられない）');
        } else if (choice5b === 'suspect_kato') {
          await D('masahiro', 'かとぱんか……まぁ、タイミングは怪しいよな。');
          await D('masahiro', 'だが、かとぱんは俺が呼んだ。あいつは味方だよ。');
          await D('nobu', '（マーシーが「味方」と断言する……余計に怪しい）');
        } else if (choice5b === 'suspect_debu') {
          await D('masahiro', 'デブコーン……確かに料理に何か仕込む機会はあるな。');
          await D('masahiro', 'でもデブコーンは単純な奴だ。そんな器用なことができるかどうか。');
        } else {
          await D('nobu', '……答えられない。今は全員を疑ってるし、全員を信じたい。');
          await D('masahiro', '……そうか。');
        }

      } else if (Flow.hasFlag('paired_kato')) {
        await D('nobu', 'かとぱん、単刀直入に聞く。マーシーに呼ばれてここに来たんだよな？');
        await D('kato', '……隠してもしょうがないか。ああ、そうだ。');
        await D('nobu', 'いつ連絡が来た？');
        await D('kato', '3日前だ。「登山中に体調不良者が出るかもしれない。保険として来てくれ」って。');
        await D('nobu', '「出るかもしれない」……？　まるで最初から予測してたみたいな言い方だな。');
        await D('kato', '俺もそう思った。だから、医療キットだけじゃなく……これも持ってきた。');
        await D('narrator', 'かとぱんはポケットから小さなボトルを取り出した。');
        await D('kato', '解毒剤だ。汎用的なやつ。何の毒か分からなかったが、念のために。');
        Flow.addItem({ name: '汎用解毒剤', icon: '💊', desc: 'かとぱんから受け取った解毒剤' });
        Flow.setFlag('got_antidote');
        await D('nobu', '（かとぱんは敵か味方か……判断がつかない）');
      }

      // ============================================================
      //  シーン6: ポケモン遭遇 — 砂走り
      // ============================================================
      await D('narrator', '午後2:00 ── 砂走りに突入。');
      await D('narrator', '柔らかい砂の斜面を一気に駆け下りる。足首まで砂に埋まりながら、飛ぶように下る。');
      await D('narrator', '……その時、砂の中から何かが飛び出した！', { sound: 'pokemon_appear' });

      const encounter1 = await Flow.triggerPokemonEncounter();
      if (encounter1.caught) {
        await D('nobu', 'こんな場所でもポケモンがいるのか……。仲間に加わってくれたようだ。');
      } else {
        await D('narrator', '砂煙の中にポケモンは消えていった。');
      }

      // ============================================================
      //  シーン7: 滑落事故
      // ============================================================
      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #666 0%, #555 30%, #444 60%, #333 100%)');
      await Effects.fadeFromBlack(500);
      Effects.startFog();

      await D('narrator', '午後2:30 ── 砂走りを終え、再び岩場に差し掛かった。');
      await D('narrator', '霧が急速に濃くなり、視界が2m程度まで落ちた。');
      await D('narrator', '風も強くなってきた。体温が急速に奪われる。');

      await D('masahiro', '足元に注意しろ！　この辺は崖が──');
      await D('narrator', 'その叫びが終わる前に──', { sound: 'shock' });
      await D('narrator', '悲鳴が聞こえた。', { effect: 'shake' });
      await D('narrator', '「うわああああっ！！」');

      await Effects.flash('#000', 500);

      await D('narrator', '霧の向こうで、何かが崖から落ちる音がした。');
      await D('narrator', 'ガラガラガラ……ドスン……。');
      await D('nobu', '誰だ！？　誰が落ちた！？');

      // バディの組み合わせによって落ちる人物が変わる
      let fallenChar;
      if (Flow.hasFlag('paired_chiba')) {
        fallenChar = 'ochi';
        await D('masahiro', 'おちぷー！！　おちぷーが崖から……！！');
      } else if (Flow.hasFlag('paired_yochi')) {
        fallenChar = 'ochi';
        await D('chiba', 'おちぷーが！　おちぷーが落ちた！！');
      } else if (Flow.hasFlag('paired_masahiro')) {
        fallenChar = 'chiba';
        await D('debu', 'ちばぶ！？　ちばぶーっ！！');
      } else {
        fallenChar = 'ochi';
        await D('masahiro', 'おちぷー！　おちぷーが滑落した！');
      }

      const fallenName = GameEngine.Data.getCharacter(fallenChar).name;

      await D('narrator', `${fallenName}が崖から転落した。`);
      await D('narrator', '全員が崖の縁に駆け寄る。');
      await D('narrator', '10m程下の岩棚に、人影が見えた。動いている。まだ生きている。');
      await D('nobu', `${fallenName}！　しっかりしろ！`);

      // 選択肢5: 救助方法
      const choice5 = await C([
        { id: 'use_rope', text: 'ロープで引き上げる' },
        { id: 'climb_down', text: '自分が崖を降りて助ける' },
        { id: 'call_rescue', text: '山岳救助を呼ぶ' }
      ]);

      if (choice5 === 'use_rope') {
        if (Flow.hasItem('登山用ストック') || Flow.hasItem('ロープ')) {
          await D('narrator', '装備を繋ぎ合わせ、即席のロープを作った。');
          await D('narrator', '崖下に垂らすと、落ちた仲間がしがみついてきた。');
          await D('nobu', '引っ張れ！　みんな手伝え！');
          await D('narrator', '全員で引き上げ、なんとか救出に成功した。');
          await D('narrator', `${fallenName}は足を骨折していたが、命に別状はなかった。`);
          if (Flow.hasFlag('got_antidote') || Flow.hasFlag('took_kato_medicine')) {
            await D('kato', '俺が応急処置する。添え木を作るから、ストックを一本くれ。');
            await D('narrator', 'かとぱんが手際よく骨折の応急処置を行った。');
          }
          Flow.setFlag('rescued_fallen');
        } else {
          await D('narrator', 'ロープがない。周囲を見回すが、代わりになるものが見当たらない。');
          await D('masahiro', '衣服を繋ぐしかない！　上着を脱げ！');
          await D('narrator', '全員が上着を繋ぎ合わせ、即席ロープを作った。ギリギリの長さで、何とか引き上げに成功した。');
          Flow.setFlag('rescued_fallen');
        }
      } else if (choice5 === 'climb_down') {
        await D('narrator', 'のぶんは自ら崖を降り始めた。');
        await D('masahiro', 'のぶん！　無茶するな！');
        await D('narrator', '足場を慎重に確認しながら、10mの崖を降りる。');
        await D('narrator', '落ちた仲間の元にたどり着いた。');
        await D('nobu', `大丈夫か、${fallenName}！`);
        await D('narrator', `${fallenName}は足を怪我していたが、意識はあった。`);
        await D('narrator', '上からロープ代わりに降ろされた衣類を使い、二人とも何とか引き上げられた。');
        Flow.setFlag('rescued_fallen');
        Flow.setFlag('climbed_cliff');
      } else {
        await D('narrator', 'のぶんはスマホを取り出した。');
        await D('narrator', '……圏外。電波が入らない。');
        await D('nobu', 'くそ……！　電波がない！');
        await D('kato', '俺が降りる。医者だ、応急処置もできる。');
        await D('narrator', 'かとぱんが崖を降り、落ちた仲間を処置した。');
        await D('narrator', '全員で協力して引き上げ、何とか救出に成功した。');
        Flow.setFlag('rescued_fallen');
        Flow.setFlag('kato_rescued');
      }

      // ============================================================
      //  シーン8: 落下の原因 — 人為的？
      // ============================================================
      await D('narrator', `${fallenName}が落ち着いたところで、のぶんは聞いた。`);
      await D('nobu', `${fallenName}、何があった？　足を滑らせたのか？`);

      if (fallenChar === 'ochi') {
        await D('ochi', '……違う。押された。');
        await D('nobu', '押された！？', { sound: 'shock' });
        await D('ochi', '霧の中で……後ろから誰かに背中を押された。でも振り返った時にはもう落ちてた……。');
        Flow.setFlag('ochi_was_pushed');
      } else {
        await D('chiba', '……後ろから衝撃を受けた。人為的だ。');
        await D('nobu', '誰かに押されたのか？');
        await D('chiba', '霧で見えなかった。だが、間違いなく人の手だ。');
        Flow.setFlag('chiba_was_pushed');
      }

      await D('nobu', '（霧の中で……誰が？）');
      await D('narrator', '全員の顔を見回す。誰もが疑惑の目を向け合っている。');

      // 選択肢6: 犯人の追及
      const choice6 = await C([
        { id: 'accuse_debu', text: '「デブコーン、お前の位置が一番近かったんじゃないか？」' },
        { id: 'accuse_masahiro', text: '「マーシー……お前じゃないだろうな」' },
        { id: 'accuse_kato', text: '「かとぱん。お前が来てからおかしなことが続いてる」' },
        { id: 'no_accuse', text: '「今は犯人探しより、全員の安全を優先しよう」', setFlag: { prioritized_safety: true } }
      ]);

      if (choice6 === 'accuse_debu') {
        await D('debu', 'は？　俺じゃねぇよ！　俺は一番後ろを歩いてた！');
        await D('masahiro', '落ち着け。霧で位置なんて正確には分からない。');
        await D('debu', '俺が仲間を殺す理由がどこにあるんだ！！');
        await D('narrator', 'デブコーンは本気で怒っているように見える。……あるいは、演技が上手いだけか。');
      } else if (choice6 === 'accuse_masahiro') {
        await D('masahiro', '……俺か。');
        await D('nobu', 'この旅行を仕切っているのはお前だ。何が起きても不思議じゃないと思い始めてる。');
        await D('masahiro', '……のぶん。俺は、仲間を突き落とすような人間じゃない。');
        await D('nobu', '（そうだな。……だが、「昔の」マーシーなら、という話だ）');
      } else if (choice6 === 'accuse_kato') {
        await D('kato', '俺が来てから？　俺はお前らを助けに来たんだぞ。');
        await D('nobu', 'だとしても、お前が現れてから事態が悪化している。偶然か？');
        await D('kato', '……好きに疑え。俺は自分が正しいことをしてると分かってる。');
        await D('narrator', 'かとぱんは怒りを滲ませながらも、冷静さを保っていた。');
      } else {
        await D('nobu', '犯人探しは下山してからだ。今は全員で安全に降りることを最優先にしよう。');
        await D('chiba', '……のぶんの言う通りだ。この霧の中でこれ以上揉めたら、本当に死人が出る。');
        await D('masahiro', '同意だ。行くぞ。');
      }

      // ============================================================
      //  シーン9: さらなるポケモン遭遇
      // ============================================================
      await D('narrator', '下山を再開してしばらく、霧の切れ間からまたポケモンが姿を現した。', { sound: 'pokemon_appear' });

      const encounter2 = await Flow.triggerPokemonEncounter();
      if (encounter2.caught) {
        await D('nobu', 'また一匹、仲間になった。こんな状況でも……ポケモンは味方になってくれるんだな。');
      } else {
        await D('narrator', 'ポケモンは霧の中へ消えていった。');
      }

      // ============================================================
      //  シーン10: ゆっきんの影
      // ============================================================
      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #556b2f 0%, #6b8e23 30%, #556b2f 60%, #2e4e1e 100%)');
      await Effects.fadeFromBlack(500);
      Effects.stopFog();

      await D('narrator', '午後3:00 ── 7合目付近まで降りてきた。再び樹林帯に入る。');
      await D('narrator', '霧が晴れ、木漏れ日が差し込んでいる。');
      await D('narrator', '怪我人を抱えてのペースは遅い。予定より大幅に遅れている。');

      await D('narrator', '……その時。');
      await D('narrator', '木々の間に、人影が見えた。', { sound: 'shock' });
      await D('narrator', '登山者ではない。登山道から外れた場所に、じっと立っている。');

      await D('nobu', '（誰だ……？）');
      await D('narrator', '人影がこちらに気づき、手を振った。');
      await D('yuuki', 'よぉ、久しぶりじゃねぇか。', { sound: 'shock', effect: 'flash', flashColor: '#fff' });

      await D('narrator', 'ゆっきんだった。');
      await D('nobu', 'ゆ、ゆっきん！？');
      await D('ochi', 'ゆっきん！　お前何でここに！？');
      await D('yuuki', 'ん？　富士山に登りに来ちゃダメか？　偶然偶然。');

      // 選択肢7: ゆっきんへの対応
      const choice7 = await C([
        { id: 'hostile', text: '「偶然が多すぎる。お前もグルか？」', setFlag: { hostile_to_yuuki: true } },
        { id: 'cautious', text: '「……久しぶりだな。一体何の用だ」' },
        { id: 'friendly', text: '「ゆっきん！　助けてくれ、大変なことが起きてるんだ」' }
      ]);

      if (choice7 === 'hostile') {
        await D('nobu', '偶然が多すぎるんだよ。かとぱんに続いてお前まで。お前もマーシーに呼ばれたのか？');
        await D('yuuki', 'マーシーに？　まさか。俺は自分の意志で来たんだよ。');
        await D('yuuki', '……つか、何があったか知らねぇけど、ピリピリしてんな。');
        await D('nobu', '（嘘か本当か……判断がつかない）');
      } else if (choice7 === 'cautious') {
        await D('nobu', '久しぶりだな、ゆっきん。一体何の用だ。');
        await D('yuuki', '用って……登山だよ。一人で来てたんだ。そしたらお前らが見えてさ。');
        await D('yuuki', 'ところで、そっちの怪我人は何だ？　随分と大荷物だな。');
      } else {
        await D('nobu', 'ゆっきん！　助けてくれ、大変なことが起きてるんだ！');
        await D('yuuki', 'おいおい、どうした。落ち着けよ。');
        await D('narrator', 'のぶんはこれまでの経緯を簡単に説明した。');
        await D('yuuki', '……マジかよ。それはヤバいな。俺も手伝うよ。');
      }

      if (Flow.hasFlag('peeked_ochi_phone')) {
        await D('nobu', '（おちぷーのスマホに「ゆっきん」の名前があった。二人は連絡を取り合っている……）');
        await D('narrator', 'のぶんはおちぷーの方を見た。おちぷーはゆっきんと目が合うと、微かに頷いた。');
        await D('nobu', '（やはり繋がっている。おちぷーとゆっきん……何を企んでいる？）');
        Flow.setFlag('confirmed_ochi_yuuki_connection');
      }

      // ============================================================
      //  シーン11: ゆっきんの賭け事
      // ============================================================
      await D('yuuki', 'なぁ、一つ賭けをしようぜ。');
      await D('nobu', '賭け？　こんな状況で？');
      await D('yuuki', 'こんな状況だからこそだ。退屈しのぎにな。');
      await D('yuuki', '簡単なゲームだ。俺が3つの質問をする。全問正解したら、お前に情報をやる。');
      await D('yuuki', '間違えたら……お前のアイテムを一個もらう。');

      // 選択肢8: ゆっきんの賭けに乗るか
      const choice8 = await C([
        { id: 'accept_bet', text: '賭けに乗る', setFlag: { accepted_yuuki_bet: true } },
        { id: 'reject_bet', text: '「ふざけるな」と断る' }
      ]);

      if (choice8 === 'accept_bet') {
        await D('yuuki', 'よし、第一問。富士山の標高は何メートルだ？');
        const q1 = await C([
          { id: 'correct1', text: '3776m' },
          { id: 'wrong1a', text: '3756m' },
          { id: 'wrong1b', text: '3796m' }
        ]);

        let score = 0;
        if (q1 === 'correct1') { await D('yuuki', '正解！'); score++; }
        else { await D('yuuki', 'ブー。3776mだ。'); }

        await D('yuuki', '第二問。須走ルートの登山口は何合目だ？');
        const q2 = await C([
          { id: 'wrong2a', text: '4合目' },
          { id: 'correct2', text: '5合目' },
          { id: 'wrong2b', text: '6合目' }
        ]);
        if (q2 === 'correct2') { await D('yuuki', '正解！'); score++; }
        else { await D('yuuki', '不正解。5合目だろ。'); }

        await D('yuuki', '最終問題。富士山が最後に噴火したのは何年だ？');
        const q3 = await C([
          { id: 'wrong3a', text: '1607年' },
          { id: 'wrong3b', text: '1783年' },
          { id: 'correct3', text: '1707年' }
        ]);
        if (q3 === 'correct3') { await D('yuuki', '正解！　さすがだな。'); score++; }
        else { await D('yuuki', 'ブー。1707年、宝永噴火だ。'); }

        if (score >= 2) {
          await D('yuuki', 'まぁ合格だ。約束通り、一つ教えてやる。');
          await D('yuuki', '……この山には、お前らの知らない奴がもう一人いる。');
          await D('nobu', 'もう一人……？');
          await D('yuuki', 'ミッキーだ。ミッキーも来てる。');
          await D('nobu', 'ミッキーが！？', { sound: 'shock' });
          await D('yuuki', 'あいつは……ポケモンを連れてる。相当強いのを。気をつけろ。');
          Flow.setFlag('knows_mikki_on_mountain');
        } else {
          await D('yuuki', '残念。不合格だ。アイテムを一個もらうぞ。');
          if (GameEngine.Data.state.items.length > 0) {
            const lostItem = GameEngine.Data.state.items.pop();
            await D('narrator', `${lostItem.name}をゆっきんに渡した。`);
            GameEngine.Save.save();
          } else {
            await D('yuuki', '……お前何も持ってないのかよ。まぁいいや。');
          }
          await D('yuuki', 'ただし、一つだけ言っておく。この山には気をつけろ。お前ら以外にも「客」がいるぞ。');
          Flow.setFlag('yuuki_warning_vague');
        }

      } else {
        await D('nobu', 'ふざけるな。こんな時に賭け事なんかするか。');
        await D('yuuki', 'つれないな。まぁいいけど。');
        await D('yuuki', '……ただ、一つだけ忠告しとくよ。お前の後ろに気をつけな。');
        await D('nobu', '（後ろ……？　何のことだ？）');
      }

      // ============================================================
      //  シーン12: 不意打ち — 選択を誤れば死
      // ============================================================
      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #2d5a27 0%, #1a3a1a 40%, #0d1f0d 80%, #000 100%)');
      await Effects.fadeFromBlack(500);

      await D('narrator', '午後3:15 ── 樹林帯の深い場所。日が傾き始め、木々の影が長くなっている。');
      await D('narrator', 'ゆっきんは「先に行く」と言って姿を消した。');
      await D('narrator', '再び元のメンバーだけになった一行。足取りは重い。');

      await D('narrator', '……突然、のぶんの背後で枝が折れる音がした。', { sound: 'shock', effect: 'shake' });
      await D('narrator', '振り返った瞬間、何者かが飛びかかってきた！');

      // 選択肢9: 襲撃への対応（生死判定）
      const choice9 = await C([
        { id: 'dodge_left', text: '左に飛び退く' },
        { id: 'block', text: '腕でガードする' },
        { id: 'counter', text: 'しゃがんで足払い' }
      ]);

      if (choice9 === 'dodge_left') {
        await D('narrator', 'のぶんは反射的に左に飛び退いた！');
        await D('narrator', '……何者かの腕がのぶんのいた場所を薙いだ。ギリギリでかわした。');
        await D('narrator', '暗がりの中、襲撃者の姿が一瞬だけ見えた。');
        await D('narrator', '黒いフードを被った人影。顔は見えない。');
        await D('narrator', '人影はすぐに森の中に消えていった。');
        await D('nobu', '待て！　誰だ！');
        await D('narrator', '追いかけようとしたが、足音はすでに聞こえなくなっていた。');
      } else if (choice9 === 'block') {
        await D('narrator', 'のぶんは咄嗟に腕を上げてガードした！');
        await D('narrator', '強い衝撃が腕に走る。何か硬いもので殴られた。');
        await D('nobu', 'ぐっ……！');
        await D('narrator', '腕に鋭い痛みが走ったが、致命傷は免れた。');
        await D('narrator', '襲撃者は一撃だけ加えると、すぐに森の中に逃げた。');
        Flow.setFlag('arm_injured');
      } else {
        await D('narrator', 'のぶんはとっさにしゃがみ、足を払った！');
        await D('narrator', '襲撃者の足がのぶんの脚に当たり、体勢を崩した。');
        await D('narrator', '……だが、襲撃者は素早く立ち上がり、森の中に消えた。');
        await D('narrator', 'その時、地面に何かが落ちたのが見えた。');
        await D('narrator', 'ナイフだった。', { sound: 'item' });
        Flow.addItem({ name: '襲撃者のナイフ', icon: '🔪', desc: '襲撃者が落としていったナイフ' });
        Flow.setFlag('got_attacker_knife');
      }

      await D('masahiro', 'のぶん！　大丈夫か！？');
      await D('nobu', '……誰かに襲われた。');
      await D('chiba', '登山道の外から……？　一般の登山客じゃない。');
      await D('yochi', '……来た。あいつらが来たんだ。');
      await D('nobu', '「あいつら」……？　よっちん、何か知ってるのか？');
      await D('yochi', '……全部は言えない。でも、この山には……俺たちを狙ってる奴がいる。一人じゃない。複数だ。');

      // 選択肢10: よっちんへの追及
      const choice10 = await C([
        { id: 'force_answer', text: '「全部話せ！　隠してる場合じゃないだろ！」', setFlag: { forced_yochi_talk: true } },
        { id: 'trust_yochi', text: '「分かった。お前を信じる。でも、できるだけ教えてくれ」' },
        { id: 'doubt_yochi', text: '「お前が一番怪しいんだよ、よっちん」', setFlag: { doubted_yochi: true } }
      ]);

      if (choice10 === 'force_answer') {
        await D('nobu', '全部話せ！　隠してる場合じゃないだろ！　仲間が死にかけてるんだぞ！');
        await D('yochi', '……俺も全部は分からない。だが……この旅行には「裏の目的」がある。');
        await D('yochi', '全員に保険がかけられてる。生命保険だ。受取人は……');
        await D('narrator', 'よっちんが言いかけた瞬間、遠くで「パン！」という破裂音がした。', { sound: 'shock', effect: 'shake' });
        await D('narrator', '全員が身を伏せた。');
        await D('yochi', '……くそ。もう来てる。続きは後で話す。');
      } else if (choice10 === 'trust_yochi') {
        await D('nobu', '分かった。信じるよ。でも、できるだけ教えてくれ。');
        await D('yochi', '……この旅行は、最初から誰かに仕組まれている。目的は……俺たちの「排除」だ。');
        await D('nobu', '排除？');
        await D('yochi', '詳しくは言えない。だが、下山するまでに全てが分かる。……生き残れればな。');
      } else {
        await D('nobu', 'お前が一番怪しいんだよ、よっちん。死んだと思ったら生きてて、情報を小出しにして……。');
        await D('yochi', '……疑うのは自由だ。だが、俺はお前の味方だ。信じてもらえなくても。');
        await D('nobu', '（味方……本当にそうか？）');
      }

      // ============================================================
      //  シーン13: ポケモン遭遇 + 下山の終盤
      // ============================================================
      await D('narrator', '午後3:30 ── 6合目付近。ゴールまであと少し。');
      await D('narrator', '夕暮れが近づき、空がオレンジ色に染まり始めた。');

      await D('narrator', '……茂みの中で光る目。また野生のポケモンだ。', { sound: 'pokemon_appear' });

      const encounter3 = await Flow.triggerPokemonEncounter();
      if (encounter3.caught) {
        await D('nobu', 'これで心強い仲間が増えた。この先、何が起きるか分からない……ポケモンの力が必要になるかもしれない。');
      }

      // ============================================================
      //  シーン14: 第二章クライマックス — 5合目到着
      // ============================================================
      await Effects.fadeToBlack(800);
      UI.setBackground('linear-gradient(180deg, #FF6B35 0%, #D4426D 30%, #1a0a2e 70%, #0d0d1a 100%)');
      await Effects.fadeFromBlack(800);

      await D('narrator', '午後4:00 ── 須走口5合目に帰還。');
      await D('narrator', '夕日が富士山を赤く染めている。全員が疲弊し切っていた。');
      await D('narrator', '怪我人を支え、命の危険を切り抜け、なんとか下山を完了した。');

      await D('masahiro', '……シャトルバスの最終便がもうすぐだ。急ごう。');

      await D('narrator', 'しかし──その時。');
      await D('narrator', '5合目の駐車場の端に、見覚えのある男が立っていた。');

      // 選択肢11: 最後の人影
      const choice11 = await C([
        { id: 'approach_figure', text: '近づいて確認する' },
        { id: 'warn_group', text: '「あそこに誰かいる」とみんなに知らせる' },
        { id: 'ignore_figure', text: '無視してバスに急ぐ' }
      ]);

      if (choice11 === 'approach_figure') {
        await D('narrator', 'のぶんは一人で人影に近づいた。');
        await D('narrator', '近づくにつれ、その顔が見えてきた。');
        await D('narrator', 'ミッキーだった。', { sound: 'shock', effect: 'flash', flashColor: '#fff' });
        await D('mikki', '……やぁ。生きてたんだな、のぶん。');
        await D('nobu', 'ミッキー……お前も来てたのか。');
        await D('mikki', '見届けに来ただけだよ。……まだ終わってないからな。');
        await D('nobu', '「まだ終わってない」……どういう意味だ。');
        await D('mikki', '次会う時は、ポケモンバトルだ。覚悟しておけ。');
        await D('narrator', 'ミッキーはそう言い残すと、夕暮れの中に消えていった。');
        Flow.setFlag('met_mikki_ch2');

      } else if (choice11 === 'warn_group') {
        await D('nobu', 'あそこに誰かいる。');
        await D('narrator', '全員がそちらを見たが、もう人影はなかった。');
        await D('masahiro', '……気のせいじゃないか？　疲れてるんだろ。');
        await D('nobu', '（気のせいじゃない。確かにいた。……ミッキーに似ていた）');
      } else {
        await D('narrator', 'のぶんは目を逸らし、バス乗り場に向かった。');
        await D('narrator', '……背後で、視線を感じた。振り返る勇気はなかった。');
      }

      // ============================================================
      //  シーン15: 第二章終結
      // ============================================================
      await D('narrator', '一行はシャトルバスに乗り込み、道の駅すばしりへ。');
      await D('narrator', 'バスの中、誰もが沈黙していた。');
      await D('narrator', '仲間の一人が突き落とされ、謎の襲撃を受け、招かれざる客が次々と現れた。');
      await D('narrator', 'そして、よっちんの警告──「この旅行には裏の目的がある」。');

      // 選択肢12: 心の内
      const choice12 = await C([
        { id: 'resolve', text: '「必ず真相を突き止める」', setFlag: { resolved_ch2: true } },
        { id: 'fear', text: '「……生きて帰れるのか」' },
        { id: 'plan', text: '「次は罠にかからない。先手を打つ」', setFlag: { plans_ahead_ch2: true } }
      ]);

      if (choice12 === 'resolve') {
        await D('nobu', '（必ず真相を突き止める。誰が黒幕か……この目で確かめてやる）');
      } else if (choice12 === 'fear') {
        await D('nobu', '（……生きて帰れるのか、俺たちは）');
        await D('narrator', '窓の外では夕日が沈み、闇が迫ってきていた。');
      } else {
        await D('nobu', '（次は罠にかからない。先手を打つ。……情報を集めて、行動で示す）');
      }

      await D('narrator', '富士山から降りても、惨劇は終わらない。');
      await D('narrator', '夜の帳が下りる時、新たな恐怖が幕を開ける──。');

      await Effects.fadeToBlack(1500);
      await new Promise(r => setTimeout(r, 1500));

      await D('narrator', '── 第二章「霧中の邂逅」── 完 ──', {
        bg: 'linear-gradient(180deg, #000 0%, #1a0000 100%)',
        effect: 'fadeIn'
      });

      await D('narrator', '次章予告：下山後の温泉と打ち上げ。しかし、夜の闇はさらに深い秘密を暴く──', { autoAdvance: 3000 });

      await new Promise(r => setTimeout(r, 2000));

      Flow.chapterComplete('chapter2');
    }
  };

  GameEngine.registerChapter('chapter2', Chapter2Script);
  Chapter2Script.chapterTitle = '霧中の邂逅';

})();