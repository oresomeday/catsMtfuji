// chapter3.js - 第三章「疑惑の宴」
(function() {
  'use strict';

  const Flow = GameEngine.Flow;
  const Effects = GameEngine.Effects;
  const UI = GameEngine.UI;

  const Chapter3Script = {
    chapterTitle: '疑惑の宴',

    async start() {
      const D = Flow.showDialogue.bind(Flow);
      const C = Flow.showChoices.bind(Flow);

      // ============================================================
      //  シーン1: 道の駅すばしり — 下山直後
      // ============================================================
      UI.setBackground('linear-gradient(180deg, #D4426D 0%, #FF6B35 20%, #1a0a2e 60%, #0d0d1a 100%)');
      await Effects.fadeFromBlack(1200);

      await D('narrator', '7月26日 午後4:15 ── 道の駅すばしり。');
      await D('narrator', '夕焼けが空を赤く染め、富士山のシルエットが黒々と浮かび上がっている。');
      await D('narrator', '一行はシャトルバスを降り、駐車場に停めたデブコーンの車に戻った。');

      await D('narrator', '全員が疲弊し切っていた。足を引きずり、顔には疲労と恐怖が刻まれている。');

      // 怪我人の状態確認
      if (Flow.hasFlag('ochi_was_pushed')) {
        await D('narrator', 'おちぷーは足を引きずっている。骨折の応急処置はしたが、病院に行く必要がある。');
        await D('ochi', '……痛ぇ。でも、今日中に病院に行ける状況じゃないだろ。');
        await D('kato', '俺が見る限り、ヒビ程度だ。明日の朝一で病院に連れて行く。');
      } else if (Flow.hasFlag('chiba_was_pushed')) {
        await D('narrator', 'ちばぶは腕を吊っている。打撲と捻挫のようだ。');
        await D('chiba', '……動かさなければ問題ない。行動に支障はないだろう。');
      }

      await D('masahiro', '予定通り、温泉に行こう。体を温めて、疲れを癒そう。');
      await D('debu', '……マジで温泉なんか行く気分かよ。');
      await D('masahiro', 'だからこそだ。体が冷え切ってる。温泉で温まらないと風邪を引く。');

      // 選択肢1: 温泉に行くか
      const choice1 = await C([
        { id: 'go_onsen', text: '「……そうだな。行こう」' },
        { id: 'refuse_onsen', text: '「俺は車で待ってる」', setFlag: { stayed_in_car: true } },
        { id: 'confront_all', text: '「その前に話し合おう。今日何が起きたか整理したい」', setFlag: { demanded_discussion: true } }
      ]);

      if (choice1 === 'go_onsen') {
        await D('nobu', '……そうだな。行こう。');
        await D('narrator', '全員が重い足取りで車に乗り込んだ。');
      } else if (choice1 === 'refuse_onsen') {
        await D('nobu', '俺は車で待ってる。一人になりたい。');
        await D('masahiro', '……分かった。でも、鍵は閉めておけよ。');
        await D('narrator', '他の全員が温泉に行く中、のぶんは車の中に残った。');
        await D('narrator', '……一人になった。静寂の中、考えを整理する時間だ。');
        await D('nobu', '（今日起きたこと……よっちんの蘇生、岩場の崩落、誰かに突き落とされた仲間、襲撃者……）');
        await D('nobu', '（そして、かとぱん、ゆっきん、ミッキーの登場。偶然のはずがない）');

        // 車内探索
        const choice1b = await C([
          { id: 'search_car', text: '車内を詳しく調べる', setFlag: { searched_car_ch3: true } },
          { id: 'check_phone', text: 'スマホで情報を調べる', setFlag: { researched_online: true } },
          { id: 'rest', text: '少し眠る' }
        ]);

        if (choice1b === 'search_car') {
          await D('narrator', 'のぶんは車内を隅々まで調べた。');
          await D('narrator', '助手席の下に、見慣れないスマホが落ちていた。', { sound: 'item' });
          await D('nobu', '（これは……誰のスマホだ？）');
          await D('narrator', '画面にはロックがかかっていたが、通知が表示されていた。');
          await D('narrator', '「計画通りに進行中。次のステップへ」', { sound: 'shock', effect: 'flash', flashColor: '#fff' });
          await D('nobu', '（計画……！？　誰かが連絡を取り合っている）');
          Flow.addItem({ name: '謎のスマホ', icon: '📱', desc: '車内で見つけた誰かのスマホ' });
          Flow.setFlag('found_mystery_phone');
        } else if (choice1b === 'check_phone') {
          await D('narrator', 'のぶんは自分のスマホで、仲間たちの名前を検索した。');
          await D('narrator', '……マーシーの名前で、興味深い記事がヒットした。');
          await D('narrator', '「地元企業の経営難、元社員が語る内部事情」', { sound: 'shock' });
          await D('nobu', '（マーシーの会社……経営難？　そんな話は聞いてないぞ）');
          await D('narrator', '記事によると、マーシーの会社は多額の負債を抱え、倒産寸前だという。');
          await D('nobu', '（金に困っている……？　それが、この旅行と関係があるのか？）');
          Flow.setFlag('knows_masahiro_debt');
        } else {
          await D('narrator', 'のぶんは目を閉じた。疲労が限界に達していた。');
          await D('narrator', '……どれくらい眠っただろうか。ドアをノックする音で目が覚めた。');
          await D('masahiro', 'のぶん、戻ったぞ。行くぞ。');
        }

        await D('narrator', '温泉から戻ってきた仲間たちが車に乗り込んできた。');

      } else {
        await D('nobu', 'その前に話し合おう。今日何が起きたか整理したい。');
        await D('masahiro', '……ここでか？');
        await D('nobu', 'ああ。誰もいない場所で。');
        await D('narrator', '一行は駐車場の隅にあるベンチに集まった。');
        await D('nobu', '整理しよう。まず、よっちんは誰かに仮死状態にされた。そして登山道に運ばれた。');
        await D('chiba', '仮死状態を作り出し、体を運搬する。これは一人でできる仕事じゃない。');
        await D('nobu', 'つまり、複数犯の可能性がある。');
        await D('nobu', '次に、スープに毒物が混入されていた。デブコーンの料理だが、デブコーン自身も体調を崩した。');
        await D('debu', '俺は犯人じゃない！　信じてくれ！');
        await D('nobu', '分かってる。誰かがデブコーンの調理道具に細工した可能性がある。');
        await D('nobu', 'そして、霧の中で仲間が突き落とされた。これは明らかに殺人未遂だ。');
        await D('narrator', '全員が顔を見合わせた。誰も口を開こうとしない。');
        await D('nobu', '最後に、俺は森の中で何者かに襲われた。この中に犯人がいるのか、それとも外部の人間か。');
        await D('masahiro', '……整理したところで、犯人が名乗り出るとは思えないがな。');
        await D('nobu', '（マーシー……お前は何を知っている？）');
      }

      // ============================================================
      //  シーン2: 富士八景の湯 — 温泉
      // ============================================================
      await Effects.fadeToBlack(800);
      UI.setBackground('linear-gradient(180deg, #1a0a2e 0%, #2c1810 30%, #3d2817 60%, #1a0a0a 100%)');
      await Effects.fadeFromBlack(800);

      await D('narrator', '午後4:45 ── 富士八景の湯。');
      await D('narrator', '御殿場市内の温泉施設。富士山を望む露天風呂が自慢の宿だ。');

      if (!Flow.hasFlag('stayed_in_car')) {
        await D('narrator', '脱衣所で服を脱ぎ、浴場へ向かう。');
        await D('narrator', '熱い湯に体を沈めると、登山の疲れが溶けていくようだった。');
        await D('narrator', '……だが、心の緊張は解けない。');

        await D('narrator', '露天風呂には、のぶん、マーシー、ちばぶ、デブコーンの4人がいた。');
        await D('narrator', 'おちぷーは足の怪我があるため、内湯で休んでいる。よっちんとかとぱんは別の湯船にいた。');

        // 選択肢2: 温泉での行動
        const choice2 = await C([
          { id: 'listen', text: '他の会話を聞く' },
          { id: 'talk_debu', text: 'デブコーンに話しかける', setFlag: { talked_debu_onsen: true } },
          { id: 'confront_masahiro_onsen', text: 'マーシーを問い詰める', setFlag: { confronted_masahiro_onsen: true } },
          { id: 'relax', text: '黙って湯に浸かる' }
        ]);

        if (choice2 === 'listen') {
          await D('narrator', 'のぶんは目を閉じ、聞き耳を立てた。');
          await D('narrator', 'マーシーとちばぶが小声で話しているのが聞こえた。');
          await D('masahiro', '（小声で）……予定より早く動いてるな。まずいぞ。');
          await D('chiba', '（小声で）……仕方ない。想定外のことが多すぎた。');
          await D('nobu', '（……何の話だ？　マーシーとちばぶが何かを企んでいる？）');
          await D('narrator', '二人はのぶんの視線に気づいたのか、急に話題を変えた。');
          await D('masahiro', 'ああ、いい湯だな。のぶん、どうだ？');
          await D('nobu', '……ああ、気持ちいいよ。');
          Flow.setFlag('overheard_masahiro_chiba');
        } else if (choice2 === 'talk_debu') {
          await D('narrator', 'のぶんはデブコーンの隣に移動した。');
          await D('nobu', 'デブコーン……正直に教えてくれ。お前の車に注射器があったの、知ってたか？');

          if (Flow.hasFlag('found_syringes')) {
            await D('debu', '……っ！　な、なんでそれを……！');
            await D('nobu', '見たんだよ。説明してくれ。');
            await D('debu', '……あれは……俺の糖尿病の薬だ。インスリン注射。');
            await D('nobu', '糖尿病……？');
            await D('debu', '誰にも言ってなかった。恥ずかしくてな。でも、毎日打たないと危ないんだ。');
            await D('nobu', '（糖尿病のインスリン注射……本当か？）');
            Flow.setFlag('debu_diabetes_revealed');
          } else {
            await D('debu', '注射器？　何の話だ？');
            await D('nobu', '……いや、何でもない。');
          }
        } else if (choice2 === 'confront_masahiro_onsen') {
          await D('narrator', 'のぶんはマーシーの隣に座った。');
          await D('nobu', 'マーシー。単刀直入に聞く。この旅行の本当の目的は何だ？');
          await D('masahiro', '……本当の目的？');
          await D('nobu', 'かとぱんを事前に呼んでいた。ゆっきんも現れた。ミッキーの姿も見た。偶然にしては、おかしいことが多すぎる。');
          await D('masahiro', '…………。');
          await D('narrator', 'マーシーは長い沈黙の後、口を開いた。');
          await D('masahiro', '……のぶん。俺は、お前たちを守ろうとしてるんだ。');
          await D('nobu', '守る？');
          await D('masahiro', 'この旅行には……俺の知らないところで動いてる奴がいる。俺はそれを止めようとしてるんだ。');
          await D('nobu', '（マーシーの言葉……信じていいのか？）');
          Flow.setFlag('masahiro_claims_protector');
        } else {
          await D('narrator', 'のぶんは何も言わず、湯に浸かり続けた。');
          await D('narrator', '頭上には星が瞬き始めていた。この美しい景色の中で、誰かが殺意を抱いている。');
          await D('nobu', '（誰が敵で、誰が味方か……分からなくなってきた）');
        }
      }

      // ============================================================
      //  シーン3: 脱衣所 — よっちんとの密談
      // ============================================================
      await D('narrator', '温泉から上がり、脱衣所で体を拭いていると、よっちんが近づいてきた。');
      await D('yochi', '……のぶん。二人だけで話がある。');
      await D('nobu', '何だ。');
      await D('yochi', 'ここじゃまずい。外で。');

      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #0d0d1a 0%, #1a1a2e 50%, #0a0a15 100%)');
      await Effects.fadeFromBlack(500);

      await D('narrator', '施設の裏手。自動販売機の明かりだけが照らす薄暗い場所。');
      await D('yochi', '……のぶん。俺が見た書類の話、覚えてるか？');
      await D('nobu', '保険の書類だろ。');
      await D('yochi', 'ああ。あれは生命保険だった。俺たち全員の名前が載っていた。');
      await D('yochi', '受取人は……マーシーだった。', { sound: 'shock', effect: 'flash', flashColor: '#fff' });
      await D('nobu', '……何だと？');
      await D('yochi', '俺たちが死んだら、保険金はマーシーに入る。そういう契約になっていた。');
      await D('nobu', '（マーシーが受取人……！？　つまり、俺たちが死ぬことで、マーシーは金を得る……）');

      // 選択肢3: 保険の情報への反応
      const choice3 = await C([
        { id: 'believe_yochi', text: '「マーシーが黒幕だと言うのか？」', setFlag: { suspects_masahiro_ch3: true } },
        { id: 'doubt_yochi', text: '「その話、本当か？　証拠はあるのか？」' },
        { id: 'third_party', text: '「待て。マーシーが知らずに利用されている可能性は？」', setFlag: { considers_mastermind: true } }
      ]);

      if (choice3 === 'believe_yochi') {
        await D('nobu', 'マーシーが黒幕だと言うのか？');
        await D('yochi', '……俺にも分からない。だが、保険の受取人という事実は重い。');
        await D('yochi', 'ただ、一つ気になることがある。マーシーは金に困っているはずだ。会社が傾いてる。');
        if (Flow.hasFlag('knows_masahiro_debt')) {
          await D('nobu', '……それは俺も調べた。');
        }
        await D('nobu', '（動機がある。金に困っていて、俺たちの保険金が入れば……）');
      } else if (choice3 === 'doubt_yochi') {
        await D('nobu', 'その話、本当か？　証拠はあるのか？');
        await D('yochi', '……書類を写真に撮る前に襲われた。だから証拠はない。');
        await D('yochi', '俺を信じるかどうかはお前次第だ。');
        await D('nobu', '（証拠がない……よっちんを完全に信じていいのか？）');
      } else {
        await D('nobu', '待て。マーシーが知らずに利用されている可能性はないのか？');
        await D('yochi', '……どういう意味だ？');
        await D('nobu', '誰かがマーシーを黒幕に見せかけて、本当の犯人は別にいる。そういう可能性だ。');
        await D('yochi', '……考えられなくはない。だが、その「本当の犯人」は誰だ？');
        await D('nobu', '分からない。だが、安易にマーシーを犯人と決めつけるのは危険だ。');
      }

      await D('yochi', '……もう一つ。ゆっきんとおちぷーは繋がっている。');
      await D('nobu', '知ってる。おちぷーのスマホで見た。');
      await D('yochi', 'あの二人は……昔、一緒に詐欺をやってたことがある。');
      await D('nobu', '詐欺……？', { sound: 'shock' });
      await D('yochi', '俺も加担してた。……保険金詐欺だ。');
      await D('nobu', '（保険金詐欺……！　よっちん、おちぷー、ゆっきん……三人が共犯？）');
      Flow.setFlag('knows_insurance_fraud_trio');

      // ============================================================
      //  シーン4: 夕食 — 打ち上げの席
      // ============================================================
      await Effects.fadeToBlack(800);
      UI.setBackground('linear-gradient(180deg, #2d1f1a 0%, #3d2a20 30%, #1a1210 70%, #0d0a08 100%)');
      await Effects.fadeFromBlack(800);

      await D('narrator', '午後6:30 ── 御殿場市内の居酒屋。');
      await D('narrator', '登山の打ち上げという名目だが、誰も祝う気分ではなかった。');
      await D('narrator', '個室に通された一行。テーブルを囲んで座る。');
      await D('narrator', 'かとぱん、そしてゆっきんも合流していた。8人の夕食会。');

      await D('masahiro', '……とりあえず、乾杯しようか。無事に下山できたことを祝って。');
      await D('debu', '「無事」って言えるか？　死にかけたんだぞ。');
      await D('ochi', '……俺の足、まだ痛ぇよ。');
      await D('yuuki', 'まぁまぁ、そう言うなって。生きてんだからいいじゃねぇか。');

      await D('narrator', '料理が運ばれてきた。刺身、天ぷら、煮物……。');
      await D('narrator', 'しかし、誰も箸をつけようとしない。');

      // 選択肢4: 食事への対応
      const choice4 = await C([
        { id: 'eat_carefully', text: '自分で注文したものだけ食べる', setFlag: { ate_safe: true } },
        { id: 'dont_eat', text: '何も食べない', setFlag: { didnt_eat_dinner: true } },
        { id: 'watch_others', text: '他の人が食べるのを待つ' },
        { id: 'test_food', text: '料理の一部を他の皿に取り分けて確認する' }
      ]);

      if (choice4 === 'eat_carefully') {
        await D('narrator', 'のぶんは自分が直接注文した焼き魚だけを食べた。');
        await D('nobu', '（大皿料理には手を出さない方がいい……）');
      } else if (choice4 === 'dont_eat') {
        await D('nobu', '……俺、食欲がないんだ。すまん。');
        await D('masahiro', '体調でも悪いのか？');
        await D('nobu', 'いや、疲れてるだけだ。');
        await D('narrator', 'ビールだけを飲み、料理には手をつけなかった。');
      } else if (choice4 === 'watch_others') {
        await D('narrator', 'のぶんは他の人が食べ始めるのを待った。');
        await D('narrator', 'デブコーンが真っ先に刺身に箸をつける。ちばぶが天ぷらを取る。');
        await D('narrator', '……数分経っても、誰も体調を崩さない。');
        await D('nobu', '（大丈夫そうだな……だが、油断はできない）');
      } else {
        await D('narrator', 'のぶんは刺身を一切れ、小皿に取り分けた。');
        await D('narrator', 'しばらく放置し、色や匂いの変化がないか確認する。');
        await D('chiba', '……のぶん、何してるんだ？');
        await D('nobu', '……念のため。');
        await D('narrator', '異常は見られなかった。慎重に一口食べる。味は普通だ。');
      }

      // ============================================================
      //  シーン5: 緊迫の会話 — 追及
      // ============================================================
      await D('narrator', '酒が入り、場の空気が少し緩んできた頃。');
      await D('narrator', 'ゆっきんがニヤリと笑いながら口を開いた。');
      await D('yuuki', 'なぁ、マーシー。この旅行、本当に「ただの登山」だったのか？');
      await D('masahiro', '……何が言いたい。');
      await D('yuuki', 'いやぁ、色々あったじゃん。よっちんが死んだと思ったら生きてたり、誰かが突き落とされたり。');
      await D('yuuki', 'お前、何か企んでたんじゃないの？');
      await D('masahiro', '……企むって、何を？');
      await D('yuuki', '保険金詐欺……とか？', { sound: 'shock' });

      await D('narrator', '場が凍りついた。');
      await D('ochi', 'ゆっきん！　何言ってんだよ！');
      await D('yuuki', 'あれ？　おちぷー、動揺してるな？　お前も一枚噛んでるのか？');
      await D('narrator', 'おちぷーの顔から血の気が引いた。');

      // 選択肢5: この場での立ち回り
      const choice5 = await C([
        { id: 'support_yuuki', text: '「ゆっきんの言う通りだ。説明してくれ、マーシー」' },
        { id: 'calm_down', text: '「落ち着け。ここで揉めても意味がない」' },
        { id: 'accuse_yuuki', text: '「ゆっきん、お前こそ何を知ってる？　洗いざらい話せ」', setFlag: { accused_yuuki: true } },
        { id: 'stay_silent', text: '黙って状況を見守る' }
      ]);

      if (choice5 === 'support_yuuki') {
        await D('nobu', 'ゆっきんの言う通りだ。説明してくれ、マーシー。');
        await D('masahiro', '……お前もか、のぶん。');
        await D('nobu', '俺たちの保険金の受取人がお前だって話は本当か？');
        await D('narrator', 'マーシーの表情が強張った。');
        await D('masahiro', '……誰から聞いた。');
        await D('nobu', 'それは答えになってない。本当なのか？');
        await D('masahiro', '……ああ、本当だ。だが、俺が仕組んだわけじゃない。');
      } else if (choice5 === 'calm_down') {
        await D('nobu', '落ち着け。ここで揉めても意味がない。まずは全員の話を聞こう。');
        await D('yuuki', 'へぇ、のぶんは中立気取りか。');
        await D('nobu', '中立じゃない。真実を知りたいだけだ。');
      } else if (choice5 === 'accuse_yuuki') {
        await D('nobu', 'ゆっきん、お前こそ何を知ってる？　洗いざらい話せ。');
        await D('yuuki', '俺？　俺は何も知らねぇよ。ただの傍観者だ。');
        await D('nobu', '嘘をつくな。おちぷーと連絡を取り合ってただろ。そしてよっちんとも。保険金詐欺のことも知ってる。');
        await D('yuuki', '……ほう。よく調べたな。');
        await D('yuuki', 'まぁいいさ。正直に言うよ。俺とおちぷーとよっちんは、昔一緒に「仕事」をしたことがある。');
        await D('yuuki', 'でも、今回の件には関係ない。むしろ、俺たちも狙われてる側だ。');
        Flow.setFlag('yuuki_admitted_past');
      } else {
        await D('narrator', 'のぶんは黙って状況を見守った。');
        await D('narrator', 'ゆっきんとマーシーが睨み合う。おちぷーは顔を伏せている。');
        await D('narrator', '……このまま放っておけば、さらに情報が出てくるかもしれない。');
      }

      // ============================================================
      //  シーン6: ポケモン出現 — 店内パニック
      // ============================================================
      await D('narrator', '緊迫した空気の中、突然店の外から悲鳴が聞こえた。', { sound: 'shock' });
      await D('narrator', '「キャーッ！　何あれ！？」');
      await D('narrator', '続いて、何かが壁を突き破るような轟音。', { effect: 'shake' });

      await D('nobu', '何だ！？');
      await D('narrator', '全員が席を立ち、店の外に飛び出した。');
      await D('narrator', '……駐車場に、巨大なポケモンが暴れていた。', { sound: 'pokemon_appear' });

      const wildEncounter = await Flow.triggerPokemonEncounter();
      if (wildEncounter.caught) {
        await D('nobu', '仲間に……なってくれたのか。');
        await D('chiba', '珍しいな。こんな場所で野生のポケモンが現れるとは。');
        await D('kato', '……誰かが故意に放ったんじゃないのか？');
        await D('nobu', '（故意に……？　誰が？）');
      } else {
        await D('narrator', 'ポケモンは暴れた後、夜の闘へ消えていった。');
        await D('narrator', '駐車場には車に付けられた爪痕が残っていた。');
        await D('ochi', '……何だったんだ、今の。');
      }

      // ============================================================
      //  シーン7: マーシーの告白
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0a0a15 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '店に戻り、個室の扉を閉める。');
      await D('narrator', 'マーシーが深いため息をついた。');
      await D('masahiro', '……もう隠しても仕方ない。話すよ。');
      await D('narrator', '全員の視線がマーシーに集まった。');

      await D('masahiro', '俺の会社は……倒産寸前だ。多額の負債がある。');
      await D('masahiro', 'そして、お前らの保険の受取人が俺になっているのも事実だ。');
      await D('debu', 'つまり……俺たちを殺して金を手に入れようとしたのか！？', { effect: 'shake' });
      await D('masahiro', '違う！　聞いてくれ！');
      await D('masahiro', '保険の契約は……俺が結んだんじゃない。ある日突然、書類が届いたんだ。');
      await D('masahiro', '「お前の友人たちの保険金は、お前が受け取ることになる」という脅迫状と一緒に。');
      await D('nobu', '脅迫状……？');
      await D('masahiro', '「計画に従え。さもなければ、お前の会社の不正を全て暴露する」と。');
      await D('masahiro', '俺は……脅されてたんだ。この旅行も、誰かの計画に沿って動かされていた。');

      // 選択肢6: マーシーの告白への反応
      const choice6 = await C([
        { id: 'believe_masahiro', text: '「……信じるよ。で、脅迫者は誰だ？」', setFlag: { believes_masahiro: true } },
        { id: 'doubt_masahiro', text: '「都合のいい話だな。証拠はあるのか？」', setFlag: { doubts_masahiro: true } },
        { id: 'ask_plan', text: '「計画って何だ？　何をしろと言われた？」' },
        { id: 'threaten', text: '「お前が黒幕じゃないなら、今すぐ全部話せ。話さなきゃ警察に突き出す」' }
      ]);

      if (choice6 === 'believe_masahiro') {
        await D('nobu', '……信じるよ。で、脅迫者は誰だ？');
        await D('masahiro', '分からない。メールのドメインは偽装されていた。声も聞いたことがない。');
        await D('masahiro', 'ただ……一つだけヒントがある。');
        await D('masahiro', '脅迫者は、俺たちの過去を知っている。全員の秘密を握っている。');
        Flow.setFlag('blackmailer_knows_secrets');
      } else if (choice6 === 'doubt_masahiro') {
        await D('nobu', '都合のいい話だな。証拠はあるのか？');
        await D('masahiro', '……脅迫状は持ってきてる。見るか？');
        await D('narrator', 'マーシーがスマホを取り出し、写真を見せた。');
        await D('narrator', '印刷された文字。差出人不明。確かに脅迫状のようだ。');
        await D('nobu', '（本物か偽造か……判断がつかない）');
      } else if (choice6 === 'ask_plan') {
        await D('nobu', '計画って何だ？　何をしろと言われた？');
        await D('masahiro', '……「全員を富士山に連れて行け。登山中に事故が起きる。お前は何も知らなかったことにしろ」と。');
        await D('nobu', '事故……つまり、俺たちの死は「事故」に見せかける計画だったのか。');
        await D('masahiro', 'そうだと思う。だが、俺はそんなことに加担したくなかった。だからかとぱんを呼んだ。万が一に備えて。');
        Flow.setFlag('masahiro_plan_revealed');
      } else {
        await D('nobu', 'お前が黒幕じゃないなら、今すぐ全部話せ。話さなきゃ警察に突き出す。');
        await D('masahiro', '分かった……全部話す。');
        await D('narrator', 'マーシーは震える声で、これまでの経緯を全て語った。');
        await D('narrator', '脅迫、保険、計画、そして自分が知っている限りの情報を。');
        Flow.setFlag('masahiro_confessed_all');
      }

      // ============================================================
      //  シーン8: 犯人推理タイム
      // ============================================================
      await D('chiba', '……整理しよう。マーシーが脅迫されていて、俺たちは計画的に狙われている。');
      await D('chiba', 'では、真の黒幕は誰だ？');
      await D('yuuki', '俺は知らねぇぞ。');
      await D('kato', '俺もだ。マーシーに呼ばれただけだ。');
      await D('yochi', '……俺が見た書類から考えると、黒幕は俺たち全員の情報を持っている人間だ。');
      await D('debu', '全員の情報……誰がそんなもの持ってる？');

      // 選択肢7: 犯人の推理
      const choice7 = await C([
        { id: 'suspect_kato', text: '「かとぱん。医者として俺たちの情報を持てる立場だ」', setFlag: { suspects_kato_ch3: true } },
        { id: 'suspect_yuuki', text: '「ゆっきん。お前、俺たちのことを調べていただろ」', setFlag: { suspects_yuuki_ch3: true } },
        { id: 'suspect_outsider', text: '「この中にはいない。外部の人間だ」', setFlag: { suspects_outsider: true } },
        { id: 'suspect_mikki', text: '「ミッキーだ。あいつはどこにいる？」', setFlag: { suspects_mikki_ch3: true } }
      ]);

      if (choice7 === 'suspect_kato') {
        await D('nobu', 'かとぱん。医者として俺たちの情報を持てる立場だ。');
        await D('kato', '……俺か？　確かに医療情報は持っているが、保険まで操作する力はない。');
        await D('nobu', '本当か？　お前が仮死状態を作り出す薬を使えることは分かっている。');
        await D('kato', '……。');
        await D('kato', '……正直に言うよ。俺はある組織から依頼を受けている。');
        await D('nobu', '組織？', { sound: 'shock' });
        await D('kato', 'お前たちを「監視」しろ、と。何が起きても介入するな、と。');
        await D('kato', 'だが、俺は医者だ。目の前で人が死にかけたら、助けないわけにはいかない。');
        Flow.setFlag('kato_works_for_org');
      } else if (choice7 === 'suspect_yuuki') {
        await D('nobu', 'ゆっきん。お前、俺たちのことを調べていただろ。');
        await D('yuuki', '……まぁな。昔の「仕事」の癖でな。');
        await D('nobu', '「仕事」……詐欺のことか。');
        await D('yuuki', 'そうだよ。俺は詐欺師だった。今もな。だが、仲間を殺すような真似はしない。');
        await D('yuuki', '俺の狙いは……黒幕を見つけて、金を奪うことだ。');
        await D('nobu', '（ゆっきんは黒幕ではない……が、味方でもない。自分の利益のために動いている）');
      } else if (choice7 === 'suspect_outsider') {
        await D('nobu', 'この中にはいない。外部の人間だ。');
        await D('chiba', '外部……誰だ？');
        await D('nobu', '分からない。だが、この中の誰かが黒幕だと決めつけるのは早計だ。');
        await D('yochi', '……外部の人間で、俺たち全員の情報を持っている奴。心当たりがないわけじゃない。');
        await D('nobu', '誰だ？');
        await D('yochi', '……昔、俺たちと一緒にいた奴。今は離れてるけど、全員のことを知っている奴。');
        await D('nobu', '（昔、一緒にいた奴……誰だ？）');
      } else {
        await D('nobu', 'ミッキーだ。あいつはどこにいる？');
        await D('yuuki', 'ミッキー……あいつは独自に動いてるな。');
        await D('nobu', 'どういう意味だ？');
        await D('yuuki', 'ミッキーは「ポケモンマスター」を名乗っているが、裏では色々やってる。');
        await D('yuuki', '噂じゃ、違法なポケモンバトルで大金を稼いでるらしい。');
        await D('nobu', '（ミッキー……あいつが黒幕か？）');
      }

      // ============================================================
      //  シーン9: 突然の停電
      // ============================================================
      await D('narrator', '議論が白熱する中、突然店の電気が消えた。', { sound: 'shock', effect: 'shake' });
      Effects.flash('#000', 1000);

      await D('narrator', '完全な闘。悲鳴が上がる。');
      await D('ochi', '何だ！？　停電か！？');
      await D('masahiro', '落ち着け！　スマホのライトを！');

      await D('narrator', '数人がスマホのライトを点けた。');
      await D('narrator', '薄暗い光の中、全員の顔が浮かび上がる。');
      await D('narrator', '……一人、足りない。');
      await D('nobu', '……ちばぶ！？　ちばぶがいない！');

      if (Flow.hasFlag('paired_chiba') || Flow.hasFlag('overheard_masahiro_chiba')) {
        await D('narrator', 'さっきまで隣にいたはずのちばぶが、姿を消している。');
      }

      // 選択肢8: 停電時の行動
      const choice8 = await C([
        { id: 'search_chiba', text: 'ちばぶを探す', setFlag: { searched_for_chiba: true } },
        { id: 'stay_put', text: 'この場を動かない' },
        { id: 'guard_exit', text: '出口を塞ぐ' }
      ]);

      if (choice8 === 'search_chiba') {
        await D('narrator', 'のぶんは暗闘の中、ちばぶを探した。');
        await D('narrator', '廊下に出ると、奥の方で物音がした。');
        await D('narrator', '近づくと──');
        await D('narrator', 'ちばぶが倒れていた。', { sound: 'shock', effect: 'blood' });
        await D('nobu', 'ちばぶ！！');
        await D('narrator', '頭から血を流し、意識を失っている。');
        await D('narrator', '傍らには凶器らしきもの──鉄パイプが落ちていた。');
        Flow.setFlag('chiba_attacked');

        const choice8b = await C([
          { id: 'help_chiba', text: 'ちばぶを助ける' },
          { id: 'chase_attacker', text: '犯人を追う', setFlag: { chased_attacker: true } }
        ]);

        if (choice8b === 'help_chiba') {
          await D('narrator', 'のぶんはちばぶの側に駆け寄った。');
          await D('nobu', 'ちばぶ！　しっかりしろ！');
          await D('narrator', '脈はある。息もしている。気を失っているだけだ。');
          await D('kato', 'どけ、俺が診る！');
          await D('narrator', 'かとぱんが駆けつけ、応急処置を始めた。');
        } else {
          await D('narrator', 'のぶんは犯人を追って廊下を走った。');
          await D('narrator', '非常口が開いているのが見えた。外に逃げた？');
          await D('narrator', '外に出ると、闇の中に人影が走っていくのが見えた。');
          await D('narrator', '追いかけようとしたが、足を滑らせて転倒した。');
          await D('nobu', 'くそっ……！');
          await D('narrator', '人影は闇に消えた。追いつけなかった。');
        }

      } else if (choice8 === 'stay_put') {
        await D('narrator', 'のぶんは動かず、周囲を警戒した。');
        await D('narrator', '数秒後、電気が復旧した。');
        await D('narrator', '……ちばぶの席が空だった。');
        await D('debu', 'ちばぶ！？　どこ行った！？');
        await D('narrator', '探しに行くと、廊下で倒れているちばぶを発見した。');
        Flow.setFlag('chiba_attacked');
      } else {
        await D('narrator', 'のぶんは素早く出口を塞いだ。');
        await D('nobu', '誰も出るな！　犯人はこの中にいる！');
        await D('narrator', '数秒後、電気が復旧した。');
        await D('narrator', '……ちばぶがいない。そして、窓が開いていた。');
        await D('nobu', '窓から……！');
        await D('narrator', '窓の外を見ると、ちばぶが倒れているのが見えた。');
        Flow.setFlag('chiba_attacked');
      }

      // ============================================================
      //  シーン10: 緊急事態 — 病院へ
      // ============================================================
      await D('narrator', '電気が復旧し、ちばぶの状態が明らかになった。');
      await D('narrator', '頭部打撲。出血量は多いが、命に別状はなさそうだ。');
      await D('kato', '意識が戻った。大丈夫だ。だが、念のため病院に運ぶ。');
      await D('chiba', '……う……何が……');
      await D('nobu', 'ちばぶ、何があった？　犯人を見たか？');
      await D('chiba', '……後ろから……殴られた。顔は……見えなかった……。');

      await D('narrator', '救急車を呼び、ちばぶは病院に搬送されることになった。');
      await D('masahiro', '俺が付き添う。お前たちは先に帰ってくれ。');

      // 選択肢9: この後の行動
      const choice9 = await C([
        { id: 'go_hospital', text: '一緒に病院に行く', setFlag: { went_hospital: true } },
        { id: 'investigate_scene', text: '現場を調べる', setFlag: { investigated_scene: true } },
        { id: 'confront_all', text: '「待て。誰も帰らせない。全員ここで話をつける」' }
      ]);

      if (choice9 === 'go_hospital') {
        await D('nobu', '俺も行く。ちばぶが心配だ。');
        await D('narrator', 'のぶんはマーシーと共に救急車に乗り込んだ。');
      } else if (choice9 === 'investigate_scene') {
        await D('nobu', '俺は現場を調べる。証拠が残っているかもしれない。');
        await D('narrator', 'のぶんはちばぶが倒れていた場所を詳しく調べた。');
        await D('narrator', '……床に小さな布切れが落ちていた。犯人の服の一部か？');
        Flow.addItem({ name: '布切れ', icon: '🧵', desc: '犯行現場で見つけた布切れ' });
        await D('narrator', '布は黒色。登山ウェアの素材のようだ。');
        await D('nobu', '（この布の持ち主を探せば……犯人が分かるかもしれない）');
      } else {
        await D('nobu', '待て。誰も帰らせない。全員ここで話をつける。');
        await D('yuuki', 'おいおい、救急車が来てるのに？');
        await D('nobu', 'ちばぶが搬送されたら、残りの全員で話し合う。今夜中に真相を突き止める。');
        await D('narrator', '全員が緊張した面持ちで頷いた。');
      }

      // ============================================================
      //  シーン11: 深夜の対決 — ミッキー登場
      // ============================================================
      await Effects.fadeToBlack(800);
      UI.setBackground('linear-gradient(180deg, #000 0%, #0a0a15 30%, #1a0a2e 70%, #000 100%)');
      await Effects.fadeFromBlack(800);

      await D('narrator', '午後9:00 ── 御殿場市内、深夜のコンビニ駐車場。');
      await D('narrator', '病院から戻り、一行は帰路につく前に休憩していた。');
      await D('narrator', 'ちばぶは入院。マーシーは付き添いで病院に残った。');
      await D('narrator', '残りのメンバーで、帰る準備をしている。');

      await D('narrator', '……その時、駐車場の暗がりから人影が現れた。', { sound: 'shock' });
      await D('mikki', 'よう。やっと見つけたぜ。', { effect: 'flash', flashColor: '#fff' });
      await D('narrator', 'ミッキーだった。傍らには、モンスターボールを構えた姿勢。');

      await D('nobu', 'ミッキー……！');
      await D('mikki', '約束通り来たぜ。ポケモンバトルだ。');
      await D('yuuki', 'おい、ミッキー。今はそんな場合じゃ──');
      await D('mikki', 'うるせぇ。俺はずっとこの日を待ってたんだよ。');
      await D('mikki', 'のぶん。お前がポケモンを持ってるのは知ってる。勝負だ。');

      // 選択肢10: ミッキーのバトル申し込み
      const choice10 = await C([
        { id: 'accept_battle', text: 'バトルを受ける' },
        { id: 'refuse_battle', text: '「今はそんな場合じゃない」と断る' },
        { id: 'bargain', text: '「勝ったら情報をくれ」と交渉する', setFlag: { bargained_with_mikki: true } }
      ]);

      if (choice10 === 'accept_battle') {
        await D('nobu', '……いいだろう。受けてやる。');
        await D('mikki', 'それでこそのぶんだ。行くぜ！');

        // ポケモンバトル
        const mikkiPokemon = await GameEngine.PokemonAPI.getRandomPokemon();
        mikkiPokemon.level = 55;
        mikkiPokemon.hp = Math.floor(mikkiPokemon.hp * 1.2);
        mikkiPokemon.maxHp = mikkiPokemon.hp;
        mikkiPokemon.atk = Math.floor(mikkiPokemon.atk * 1.3);

        const battleResult = await Flow.triggerBattle(mikkiPokemon, 'ミッキー');

        if (battleResult) {
          await D('mikki', 'くそっ……負けたか。');
          await D('nobu', '俺の勝ちだ。');
          await D('mikki', '……約束は守る。一つだけ教えてやる。');
          await D('mikki', '黒幕は……お前たちの中にいる。でも、そいつも操られている。');
          await D('mikki', '本当の黒幕は……もっと上にいる。');
          Flow.setFlag('defeated_mikki');
          Flow.setFlag('mikki_hint_received');
        } else {
          await D('mikki', 'ハッ、俺の勝ちだな。');
          await D('nobu', 'くそ……！');
          await D('mikki', 'まぁいいさ。今日は見逃してやる。次は……ないぞ。');
          await D('narrator', 'ミッキーは去っていった。');
        }

      } else if (choice10 === 'refuse_battle') {
        await D('nobu', '今はそんな場合じゃない。仲間が倒れたんだ。');
        await D('mikki', 'ふーん……つまんねぇな。');
        await D('mikki', 'まぁいい。俺は待ってるぜ。いつでもかかってこい。');
        await D('narrator', 'ミッキーは夜の闇に消えていった。');
      } else {
        await D('nobu', '勝ったら情報をくれ。お前は何を知っている？');
        await D('mikki', '……へぇ、交渉か。いいぜ。');
        await D('mikki', '俺が勝ったら、お前のポケモンを一匹もらう。お前が勝ったら、情報をやる。');
        await D('nobu', '……乗った。');

        const mikkiPokemon = await GameEngine.PokemonAPI.getRandomPokemon();
        mikkiPokemon.level = 55;
        mikkiPokemon.hp = Math.floor(mikkiPokemon.hp * 1.2);
        mikkiPokemon.maxHp = mikkiPokemon.hp;

        const battleResult = await Flow.triggerBattle(mikkiPokemon, 'ミッキー');

        if (battleResult) {
          await D('mikki', 'やるじゃねぇか……負けたよ。');
          await D('mikki', '約束通り、情報だ。');
          await D('mikki', '……この計画を仕組んだのは、お前たちの「幼馴染」だ。でも、名前は言えない。');
          await D('mikki', 'ヒントは……「一番信頼されている奴」だ。');
          await D('nobu', '（一番信頼されている奴……誰だ？）');
          Flow.setFlag('defeated_mikki');
          Flow.setFlag('mikki_hint_trust');
        } else {
          await D('mikki', '俺の勝ちだ。約束通り、ポケモンを一匹もらうぜ。');
          if (GameEngine.Data.state.pokemon.length > 0) {
            const lostPokemon = GameEngine.Data.state.pokemon.pop();
            await D('narrator', `${lostPokemon.name}をミッキーに渡した。`);
            GameEngine.Save.save();
          }
          await D('mikki', 'またな。');
        }
      }

      // ============================================================
      //  シーン12: 帰路 — 車内の緊張
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #0a0a15 0%, #000 50%, #0a0510 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '午後9:30 ── 東名高速道路。御殿場から藤枝へ向かう。');
      await D('narrator', 'デブコーンが運転し、残りのメンバーは後部座席に。');
      await D('narrator', 'よっちん、おちぷー、かとぱん、ゆっきん、そしてのぶん。');
      await D('narrator', '誰もが疲れ切り、そして互いを警戒していた。');

      await D('narrator', '高速道路を走る車内。窓の外は真っ暗な闘だ。');
      await D('narrator', 'ふと、のぶんはおちぷーが何かをポケットから出そうとしているのに気づいた。');

      // 選択肢11: おちぷーへの対応
      const choice11 = await C([
        { id: 'grab_ochi', text: 'おちぷーの手を掴む' },
        { id: 'pretend_sleep', text: '寝たふりをして様子を見る' },
        { id: 'ask_directly', text: '「おちぷー、何を持ってる？」と聞く' }
      ]);

      if (choice11 === 'grab_ochi') {
        await D('narrator', 'のぶんは素早くおちぷーの手を掴んだ。');
        await D('ochi', 'なっ……！？');
        await D('narrator', 'おちぷーの手には小さな瓶が握られていた。', { sound: 'shock' });
        await D('nobu', '何だこれは。');
        await D('ochi', '……っ！　何でもない！　返せ！');
        await D('narrator', '瓶には液体が入っている。無色透明。');
        await D('kato', '見せてみろ……これは……睡眠薬だ。高濃度の。');
        await D('nobu', 'おちぷー……何をするつもりだった？');
        await D('ochi', '……俺は……誰かに脅されてたんだ……。');
        Flow.addItem({ name: '睡眠薬', icon: '💧', desc: 'おちぷーが持っていた高濃度の睡眠薬' });
        Flow.setFlag('caught_ochi_drug');
      } else if (choice11 === 'pretend_sleep') {
        await D('narrator', 'のぶんは目を閉じ、寝たふりをした。');
        await D('narrator', '薄目で見ていると、おちぷーが小さな瓶を取り出した。');
        await D('narrator', '……そして、何かをペットボトルの水に入れようとしている。', { sound: 'shock' });
        await D('nobu', '（！？　水に何かを……！）');

        const choice11b = await C([
          { id: 'stop_now', text: '今すぐ止める' },
          { id: 'let_continue', text: '誰に飲ませるつもりか確認する' }
        ]);

        if (choice11b === 'stop_now') {
          await D('narrator', 'のぶんは目を開け、おちぷーの手を払った。');
          await D('nobu', '何してるんだ、おちぷー！');
          await D('ochi', 'ひっ……！');
          await D('narrator', '瓶は車内に転がった。かとぱんが拾い上げる。');
          await D('kato', '睡眠薬だな……何に使うつもりだった？');
          Flow.setFlag('stopped_ochi_drug');
        } else {
          await D('narrator', 'のぶんは動かず、見守った。');
          await D('narrator', 'おちぷーは水に何かを入れた後、そのペットボトルを……');
          await D('narrator', 'のぶんに差し出そうとした。');
          await D('ochi', 'のぶん……起きてるなら水飲むか？');
          await D('nobu', '……いや、いい。');
          await D('narrator', 'おちぷーは残念そうな顔をした。');
          await D('nobu', '（俺を狙っていた……！）');
          Flow.setFlag('ochi_targeted_nobu');
        }
      } else {
        await D('nobu', 'おちぷー、何を持ってる？');
        await D('ochi', 'え……？　何も……');
        await D('nobu', '嘘をつくな。手に何か持ってるのが見えた。');
        await D('narrator', 'おちぷーは観念したように、小さな瓶を見せた。');
        await D('ochi', '……これは……護身用だ。');
        await D('kato', '護身用？　睡眠薬が？');
        await D('ochi', '……誰かに襲われた時のために……');
        await D('nobu', '（言い訳にしては苦しい……おちぷー、お前は何をしようとしてたんだ）');
        Flow.setFlag('ochi_had_drug');
      }

      // ============================================================
      //  シーン13: 最後の会話 — よっちんとの対話
      // ============================================================
      await D('narrator', '深夜。高速道路のサービスエリアで休憩。');
      await D('narrator', '他のメンバーがトイレや買い物に行く中、のぶんとよっちんだけが車に残った。');

      await D('yochi', '……のぶん。');
      await D('nobu', '何だ。');
      await D('yochi', '今夜、最後まで気を抜くな。犯人はまだ動いている。');
      await D('nobu', '分かってる。');
      await D('yochi', '……そして、俺を完全に信じるな。');
      await D('nobu', '……なぜ？');
      await D('yochi', '俺自身、自分が何者か分からなくなってる。仮死状態にされた時、記憶が……曖昧になった部分がある。');
      await D('yochi', '俺が知らないうちに、何かをしている可能性もある。');
      await D('nobu', '（よっちん……お前も不安なのか）');

      // 選択肢12: よっちんへの最後の質問
      const choice12 = await C([
        { id: 'ask_truth', text: '「お前の知っている真実を、全て教えてくれ」' },
        { id: 'reassure', text: '「お前を信じる。最後まで」', setFlag: { fully_trusts_yochi: true } },
        { id: 'doubt', text: '「……お前が黒幕という可能性は？」', setFlag: { doubts_yochi_end: true } }
      ]);

      if (choice12 === 'ask_truth') {
        await D('nobu', 'お前の知っている真実を、全て教えてくれ。');
        await D('yochi', '……分かった。');
        await D('yochi', '俺が知っている限りでは、この計画は数ヶ月前から始まっていた。');
        await D('yochi', '俺たち幼馴染を集め、「事故」に見せかけて殺す計画。');
        await D('yochi', '動機は金だ。保険金。そして……復讐。');
        await D('nobu', '復讐？');
        await D('yochi', '俺たちは昔、誰かを傷つけたことがある。覚えてないか？');
        await D('nobu', '……。');
        await D('yochi', '思い出せ。それが、全ての始まりだ。');
        Flow.setFlag('yochi_revealed_revenge');
      } else if (choice12 === 'reassure') {
        await D('nobu', 'お前を信じる。最後まで。');
        await D('yochi', '……ありがとう。');
        await D('yochi', 'だが、無条件に信じるな。この状況では、誰もが容疑者だ。俺も含めて。');
        await D('nobu', '分かってる。でも、仲間を疑い続けるのは疲れる。');
        await D('yochi', '……ああ。同感だ。');
      } else {
        await D('nobu', 'お前が黒幕という可能性は？');
        await D('yochi', '……否定はしない。俺が仮死状態だったのも、演技かもしれない。');
        await D('yochi', '俺が全てを仕組んでいる可能性を、お前は考慮すべきだ。');
        await D('nobu', '（……冷静だな。逆に怪しい）');
      }

      // ============================================================
      //  シーン14: 第三章終結 — 帰宅
      // ============================================================
      await Effects.fadeToBlack(1000);
      UI.setBackground('linear-gradient(180deg, #000 0%, #0a0510 50%, #1a0520 100%)');
      await Effects.fadeFromBlack(1000);

      await D('narrator', '7月27日 午前0:30 ── 藤枝市大洲。');
      await D('narrator', '長い一日が終わり、一行は各自の家に送り届けられた。');
      await D('narrator', 'よっちんはのぶんの家に泊まることになった。一人にするのは危険だと判断したからだ。');

      await D('narrator', '家に着き、のぶんはベッドに倒れ込んだ。');
      await D('narrator', '意識が遠のいていく。');
      await D('narrator', '……今日、何が起きた？');
      await D('narrator', 'よっちんの蘇生、登山中の暗殺未遂、かとぱんとゆっきんの登場、保険金の謎、マーシーの告白、ちばぶの襲撃……');
      await D('narrator', 'そして、おちぷーの裏切り。');
      await D('narrator', '全てが繋がっているのか、それともバラバラの出来事なのか。');

      await D('narrator', '眠りに落ちる直前、のぶんは一つの確信を得た。');
      await D('narrator', '──この物語は、まだ終わっていない。');

      await Effects.fadeToBlack(1500);
      await new Promise(r => setTimeout(r, 1500));

      await D('narrator', '── 第三章「疑惑の宴」── 完 ──', {
        bg: 'linear-gradient(180deg, #000 0%, #1a0000 100%)',
        effect: 'fadeIn'
      });

      await D('narrator', '次章予告：翌日。真相に近づくのぶん。しかし、死の影は確実に迫る──', { autoAdvance: 3000 });

      await new Promise(r => setTimeout(r, 2000));

      Flow.chapterComplete('chapter3');
    }
  };

  GameEngine.registerChapter('chapter3', Chapter3Script);
  Chapter3Script.chapterTitle = '疑惑の宴';

})();