// chapter4.js - 第四章「追憶の連鎖」
(function() {
  'use strict';

  const Flow = GameEngine.Flow;
  const Effects = GameEngine.Effects;
  const UI = GameEngine.UI;

  const Chapter4Script = {
    chapterTitle: '追憶の連鎖',

    async start() {
      const D = Flow.showDialogue.bind(Flow);
      const C = Flow.showChoices.bind(Flow);

      // ============================================================
      //  シーン1: 悪夢 — 7月27日 早朝
      // ============================================================
      UI.setBackground('linear-gradient(180deg, #1a0000 0%, #2a0505 30%, #0a0000 70%, #000 100%)');
      await Effects.fadeFromBlack(1500);

      await D('narrator', '── 悪夢を見ていた。');
      await D('narrator', '富士山の頂上。霧の中。誰かが叫んでいる。');
      await D('narrator', '「助けて……助けて……」');
      await D('narrator', '振り返ると、仲間たちが一人ずつ崖から落ちていく。');
      await D('narrator', 'マーシー、ちばぶ、デブコーン、おちぷー、よっちん……');
      await D('narrator', '最後に残ったのは、のぶん一人。');
      await D('narrator', '……そして、背後に立つ影。', { effect: 'shake' });
      await D('narrator', '「次はお前だ」');

      await Effects.flash('#ff0000', 500);

      await D('nobu', 'うわっ！！', { sound: 'shock' });
      await D('narrator', 'のぶんは汗だくで目を覚ました。');

      await Effects.fadeToBlack(500);
      UI.setBackground('linear-gradient(180deg, #2c3e50 0%, #4a5568 30%, #667788 70%, #87CEEB 100%)');
      await Effects.fadeFromBlack(800);

      await D('narrator', '7月27日 午前7:00 ── のぶんの自宅。');
      await D('narrator', '窓から朝日が差し込んでいる。悪夢から覚めた。');
      await D('narrator', '隣のベッドには……よっちんがいるはずだった。');
      await D('narrator', '……いない。', { sound: 'shock' });

      // 選択肢1: よっちんの不在への対応
      const choice1 = await C([
        { id: 'search_house', text: '家の中を探す', setFlag: { searched_house: true } },
        { id: 'call_yochi', text: 'よっちんに電話する' },
        { id: 'check_note', text: '置き手紙がないか確認する', setFlag: { checked_note: true } }
      ]);

      if (choice1 === 'search_house') {
        await D('narrator', 'のぶんは家中を探し回った。');
        await D('narrator', 'リビング、キッチン、トイレ、風呂場……どこにもいない。');
        await D('narrator', '玄関の靴を確認すると、よっちんの靴がなかった。');
        await D('nobu', '出て行った……？　いつの間に……');
      } else if (choice1 === 'call_yochi') {
        await D('narrator', 'のぶんはスマホでよっちんに電話をかけた。');
        await D('narrator', 'コール音が鳴る。1回、2回、3回……');
        await D('yochi', '……のぶんか。おはよう。');
        await D('nobu', 'よっちん！　どこにいるんだ！？');
        await D('yochi', '……悪い。先に動かないといけないことがあった。後で説明する。');
        await D('nobu', '待て、何を──');
        await D('narrator', '電話は一方的に切れた。');
      } else {
        await D('narrator', '枕元を見ると、小さなメモが置かれていた。');
        await D('narrator', '「先に行く。午後3時に御殿場駅。必ず来い。」');
        await D('nobu', '御殿場駅……何をする気だ、よっちん。');
        Flow.addItem({ name: 'よっちんのメモ', icon: '📝', desc: '御殿場駅に来いと書かれたメモ' });
      }

      // ============================================================
      //  シーン2: 電話が鳴る — 各方面からの連絡
      // ============================================================
      await D('narrator', '考え込んでいると、スマホが鳴った。');
      await D('narrator', '発信者は……マーシーだった。');

      // 選択肢2: 電話に出るか
      const choice2 = await C([
        { id: 'answer', text: '電話に出る' },
        { id: 'ignore', text: '無視する', setFlag: { ignored_masahiro_call: true } },
        { id: 'let_ring', text: '様子を見てから出る' }
      ]);

      if (choice2 === 'answer' || choice2 === 'let_ring') {
        if (choice2 === 'let_ring') {
          await D('narrator', '3回鳴らしてから電話に出た。');
        }
        await D('masahiro', 'のぶん、大丈夫か。無事か。');
        await D('nobu', 'ああ……一応な。ちばぶの様子は？');
        await D('masahiro', '意識は戻った。軽い脳震盪と頭部裂傷。数日入院だが、命に別状はない。');
        await D('nobu', 'そうか……よかった。');
        await D('masahiro', 'それより、のぶん。今日、全員で会おう。話さなければならないことがある。');
        await D('nobu', '全員？');
        await D('masahiro', 'ああ。俺が全員に連絡する。午後2時に御殿場の喫茶店「モンブラン」で。来てくれ。');
        await D('nobu', '（よっちんは午後3時に御殿場駅と言っていた……時間が近い）');

        const choice2b = await C([
          { id: 'agree', text: '「分かった。行く」' },
          { id: 'ask_why', text: '「何を話すつもりだ？」' },
          { id: 'refuse', text: '「いや、行かない」', setFlag: { refused_meeting: true } }
        ]);

        if (choice2b === 'agree') {
          await D('nobu', '分かった。行く。');
          await D('masahiro', '助かる。……じゃあ、後で。');
        } else if (choice2b === 'ask_why') {
          await D('nobu', '何を話すつもりだ？');
          await D('masahiro', '……昨日の事件のこと。そして……俺が知っている全てを話す。');
          await D('masahiro', '嘘はもうつかない。約束する。');
          await D('nobu', '（マーシーが全てを話す……信じていいのか？）');
        } else {
          await D('nobu', 'いや、行かない。お前を信用できない。');
          await D('masahiro', '……そうか。でも、来てほしい。真実を知る権利がお前にはある。');
          await D('narrator', '電話は切れた。');
        }
      } else {
        await D('narrator', '電話を無視した。すぐに着信は止まった。');
        await D('narrator', '数分後、メッセージが届いた。');
        await D('narrator', '「午後2時、御殿場の喫茶店モンブラン。全員で話がある。来てくれ。──マーシー」');
      }

      // ============================================================
      //  シーン3: 情報整理 — 手持ちの証拠
      // ============================================================
      await D('narrator', 'のぶんは机に向かい、これまでに集めた情報を整理することにした。');

      await D('nobu', '（整理しよう。俺が持っている情報は……）');

      // プレイヤーが持っているフラグに応じて情報を表示
      if (Flow.hasFlag('got_yochi_note')) {
        await D('nobu', '（よっちんの紙片。「全部嘘」と書かれていた）');
      }
      if (Flow.hasFlag('found_syringes')) {
        await D('nobu', '（デブコーンの車にあった注射器。インスリン用だとデブコーンは言っていたが……）');
      }
      if (Flow.hasFlag('found_mystery_phone')) {
        await D('nobu', '（車内で見つけた謎のスマホ。「計画通り」というメッセージが表示されていた）');
      }
      if (Flow.hasFlag('knows_masahiro_debt')) {
        await D('nobu', '（マーシーの会社は倒産寸前。金に困っている）');
      }
      if (Flow.hasFlag('knows_insurance_fraud_trio')) {
        await D('nobu', '（よっちん、おちぷー、ゆっきんは過去に保険金詐欺をやっていた）');
      }
      if (Flow.hasFlag('kato_works_for_org')) {
        await D('nobu', '（かとぱんは「組織」から依頼を受けて俺たちを監視している）');
      }
      if (Flow.hasFlag('mikki_hint_trust')) {
        await D('nobu', '（ミッキーのヒント。黒幕は「一番信頼されている奴」）');
      }
      if (Flow.hasFlag('yochi_revealed_revenge')) {
        await D('nobu', '（復讐。俺たちは昔、誰かを傷つけた……？）');
      }
      if (Flow.hasFlag('caught_ochi_drug') || Flow.hasFlag('ochi_targeted_nobu')) {
        await D('nobu', '（おちぷーは睡眠薬を持っていた。俺を狙っていた可能性がある）');
      }

      // 選択肢3: 次の行動
      const choice3 = await C([
        { id: 'investigate_phone', text: '謎のスマホを調べる', setFlag: { investigated_phone: true } },
        { id: 'call_debu', text: 'デブコーンに連絡して話を聞く', setFlag: { called_debu: true } },
        { id: 'search_online', text: '幼馴染たちの過去を調べる', setFlag: { researched_past: true } },
        { id: 'go_early', text: '早めに御殿場に向かう', setFlag: { went_early: true } }
      ]);

      if (choice3 === 'investigate_phone') {
        if (Flow.hasFlag('found_mystery_phone')) {
          await D('narrator', 'のぶんは謎のスマホを取り出した。');
          await D('narrator', 'ロックは4桁のパスコード。');
          await D('nobu', '（パスコード……何だろう。誰のスマホだ？）');

          const passcodeChoice = await C([
            { id: 'try_0726', text: '0726（昨日の日付）を試す' },
            { id: 'try_3776', text: '3776（富士山の標高）を試す' },
            { id: 'try_1234', text: '1234を試す' }
          ]);

          if (passcodeChoice === 'try_3776') {
            await D('narrator', '……ロックが解除された。', { sound: 'item' });
            await D('nobu', '富士山の標高……このスマホの持ち主は、登山に関係がある人間だ。');
            await D('narrator', 'メッセージアプリを開く。');
            await D('narrator', '……送信相手の名前は「M」。', { sound: 'shock' });
            await D('narrator', 'メッセージの内容を読む。');
            await D('narrator', '「M: 予定通り進行中。標的は全員山に登った」');
            await D('narrator', '「M: 第一段階完了。よっちんは処理した」');
            await D('narrator', '「M: 第二段階開始。次の標的は「N」だ」', { effect: 'flash', flashColor: '#ff0000' });
            await D('nobu', '（「N」……のぶん、俺のことか！？）');
            await D('nobu', '（そして「M」……マーシーか？　それとも別の人間か？）');
            Flow.setFlag('decoded_phone');
            Flow.setFlag('nobu_is_target');
          } else {
            await D('narrator', 'パスコードが違う。ロックは解除されなかった。');
            await D('nobu', '（くそ……何度も間違えるとロックされるかもしれない）');
          }
        } else {
          await D('narrator', '手元にスマホはなかった。');
        }
      } else if (choice3 === 'call_debu') {
        await D('narrator', 'のぶんはデブコーンに電話をかけた。');
        await D('debu', '……のぶんか。どうした。');
        await D('nobu', 'デブコーン、聞きたいことがある。');
        await D('nobu', 'お前の車に注射器があったよな。あれは本当にインスリン用なのか？');
        await D('debu', '……ああ。俺は糖尿病だ。誰にも言ってなかったけど。');
        await D('nobu', '他に何か隠していることはないか？');
        await D('debu', '……。');
        await D('debu', '……一つだけ。俺の車のトランクに、黒いバッグが入ってただろ。');
        await D('nobu', 'ああ。');
        await D('debu', 'あれは……マーシーに頼まれて運んだんだ。中身は知らない。');
        await D('nobu', 'マーシーに頼まれた？');
        await D('debu', '「絶対に開けるな」と言われた。俺は言う通りにしただけだ。');
        await D('nobu', '（マーシーの黒いバッグ……中身は何だ？）');
        Flow.setFlag('debu_bag_secret');
      } else if (choice3 === 'search_online') {
        await D('narrator', 'のぶんはパソコンで幼馴染たちの過去を検索し始めた。');
        await D('narrator', '……昔のSNS、同窓会の記録、地元のニュース記事……');
        await D('narrator', 'そして、ある記事を見つけた。', { sound: 'shock' });
        await D('narrator', '「25年前の事故　中学生グループによるいじめが原因か　被害者は重傷」');
        await D('nobu', '（25年前……俺たちが中学生の時……）');
        await D('narrator', '記事を読む。');
        await D('narrator', '「被害者の少年（当時13歳）は、同級生グループからいじめを受け、学校の屋上から転落。全治6ヶ月の重傷を負った」');
        await D('narrator', '「加害者グループは7人。学校側は事故として処理し、氏名は公表されなかった」');
        await D('nobu', '（7人……俺たちの人数と同じだ）');
        await D('nobu', '（被害者は誰だ？　そして……俺たちが加害者だったのか？）');
        Flow.setFlag('found_old_incident');
        Flow.addItem({ name: '25年前の記事', icon: '📰', desc: 'いじめ事件に関する古い記事' });
      } else {
        await D('narrator', 'のぶんは早めに家を出て、御殿場に向かうことにした。');
        await D('nobu', '（マーシーたちより先に着いて、様子を探ろう）');
      }

      // ============================================================
      //  シーン4: 移動中 — 電車の中
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #667788 0%, #889999 40%, #aabbcc 70%, #ddeeff 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '午前11:00 ── 東海道線、御殿場方面行き。');
      await D('narrator', 'のぶんは電車に揺られながら、窓の外を眺めていた。');
      await D('narrator', '富士山が遠くに見える。昨日登った山。仲間が傷つき、誰かが命を狙われた山。');

      await D('narrator', '……ふと、車両の反対側に見覚えのある顔を見つけた。');
      await D('narrator', 'ゆっきんだった。', { sound: 'shock' });

      // 選択肢4: ゆっきんへの対応
      const choice4 = await C([
        { id: 'approach_yuuki', text: 'ゆっきんに近づく' },
        { id: 'observe_yuuki', text: '距離を取って観察する', setFlag: { observed_yuuki_train: true } },
        { id: 'avoid_yuuki', text: '別の車両に移る' }
      ]);

      if (choice4 === 'approach_yuuki') {
        await D('narrator', 'のぶんはゆっきんの隣に座った。');
        await D('yuuki', 'おっ、のぶんじゃねぇか。奇遇だな。');
        await D('nobu', '奇遇か？　お前も御殿場に行くのか。');
        await D('yuuki', 'まぁな。色々とケリをつけないといけないからな。');
        await D('nobu', 'ゆっきん、正直に答えろ。お前は何を知っている？');
        await D('yuuki', '……そうだな。もう隠しても意味ないか。');
        await D('yuuki', '俺は……「依頼」を受けてこの旅行に参加した。');
        await D('nobu', '依頼？');
        await D('yuuki', 'お前たちを監視しろって依頼だ。何が起きるか見届けろ、とな。');
        await D('nobu', '依頼主は誰だ。');
        await D('yuuki', '……顔は知らない。匿名の依頼だった。ただ、金は良かった。');
        await D('yuuki', 'でも、まさか本当に殺し合いになるとは思わなかったぜ。');
        Flow.setFlag('yuuki_admitted_hired');
      } else if (choice4 === 'observe_yuuki') {
        await D('narrator', 'のぶんは席を移動し、ゆっきんを観察した。');
        await D('narrator', 'ゆっきんはスマホで誰かとメッセージのやり取りをしている。');
        await D('narrator', '画面は見えないが、真剣な表情だ。');
        await D('narrator', '……ゆっきんが電話をかけ始めた。');
        await D('yuuki', '（小声で）……ああ、予定通りだ。……いや、まだ生きてる。……分かってる、最後までやる。');
        await D('nobu', '（「最後までやる」……何をだ？）');
      } else {
        await D('narrator', 'のぶんは静かに別の車両に移った。');
        await D('narrator', 'ゆっきんに気づかれたかどうかは分からない。');
      }

      // ============================================================
      //  シーン5: 御殿場到着 — 喫茶店「モンブラン」
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #c9a86c 0%, #d4b896 30%, #e8d5b7 60%, #f5e6ca 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '午後1:30 ── 御殿場駅前、喫茶店「モンブラン」。');
      await D('narrator', 'レトロな雰囲気の喫茶店。窓際の席からは、晴れた日には富士山が見えるらしい。');
      await D('narrator', 'のぶんは約束の時間より早く着いた。');

      if (Flow.hasFlag('went_early')) {
        await D('narrator', '店内には、すでにかとぱんがいた。');
        await D('kato', 'のぶんか。早いな。');
        await D('nobu', 'かとぱん……お前も早いな。');
        await D('kato', '……話があるんだ。他の連中が来る前に。');

        // 選択肢5: かとぱんとの会話
        const choice5 = await C([
          { id: 'listen_kato', text: '話を聞く' },
          { id: 'refuse_kato', text: '「後でいい」と断る' },
          { id: 'interrogate_kato', text: '「先にお前の正体を教えろ」', setFlag: { demanded_kato_identity: true } }
        ]);

        if (choice5 === 'listen_kato') {
          await D('nobu', '何だ。');
          await D('kato', '俺は……お前たちを助けるために来たんだ。信じてくれ。');
          await D('nobu', '「組織」に雇われてるんだろ。');
          await D('kato', 'ああ。だが、俺個人の意思で、お前たちを守ると決めた。');
          await D('kato', '組織の目的は、お前たちの死だ。俺はそれを阻止したい。');
          await D('nobu', 'なぜ俺たちが狙われてる？');
          await D('kato', '……25年前の事件が関係している。お前たちが中学生の時の。');
          await D('nobu', '（やはり……あの事件が……）');
          Flow.setFlag('kato_revealed_purpose');
        } else if (choice5 === 'refuse_kato') {
          await D('nobu', '後でいい。みんなの前で話せ。');
          await D('kato', '……分かった。');
        } else {
          await D('nobu', '先にお前の正体を教えろ。「組織」とは何だ。誰に雇われている。');
          await D('kato', '……組織の名前は言えない。だが、目的は復讐だ。');
          await D('kato', '25年前、お前たちにいじめられた少年がいる。その少年の関係者が、復讐を計画している。');
          await D('nobu', '俺たちが……いじめた？');
          await D('kato', '覚えてないのか？　屋上から突き落とした少年のことを。');
          await D('nobu', '（……！！）', { sound: 'shock', effect: 'shake' });
          Flow.setFlag('kato_revealed_truth');
        }
      } else {
        await D('narrator', '店内にはまだ誰もいなかった。');
        await D('narrator', 'のぶんは窓際の席に座り、コーヒーを注文した。');
      }

      // ============================================================
      //  シーン6: 全員集合 — 緊迫の会議
      // ============================================================
      await Effects.fadeToBlack(400);
      await Effects.fadeFromBlack(400);

      await D('narrator', '午後2:00 ── 約束の時間。');
      await D('narrator', 'メンバーが次々と店に入ってきた。');
      await D('narrator', 'マーシー、デブコーン、おちぷー、かとぱん、ゆっきん……');
      await D('narrator', '奥の個室に通され、6人がテーブルを囲んだ。');
      await D('narrator', 'よっちんとちばぶはいない。よっちんは「後で来る」と言っていた。ちばぶは入院中。');

      await D('masahiro', '……全員揃ったな。まず、俺から話す。');
      await D('narrator', 'マーシーが立ち上がり、全員を見回した。');
      await D('masahiro', '昨日、俺は脅迫されていたと言った。それは本当だ。');
      await D('masahiro', 'だが、もう一つ隠していたことがある。');
      await D('masahiro', '脅迫者の正体が……分かった。', { sound: 'shock' });

      await D('narrator', '全員が息を呑んだ。');

      // 選択肢6: マーシーの発言への反応
      const choice6 = await C([
        { id: 'ask_who', text: '「誰だ？」' },
        { id: 'doubt_claim', text: '「本当か？　また嘘じゃないだろうな」' },
        { id: 'stay_silent', text: '黙って聞く' }
      ]);

      if (choice6 === 'ask_who') {
        await D('nobu', '誰だ？　名前を言え。');
      } else if (choice6 === 'doubt_claim') {
        await D('nobu', '本当か？　また嘘じゃないだろうな。');
        await D('masahiro', '嘘じゃない。今度こそ、全てを話す。');
      } else {
        await D('narrator', 'のぶんは黙ってマーシーの次の言葉を待った。');
      }

      await D('masahiro', '脅迫者は……俺たちの幼馴染だ。');
      await D('masahiro', '今はこの場にいない人間。');
      await D('masahiro', 'よっちんだ。', { sound: 'shock', effect: 'flash', flashColor: '#fff' });

      await D('narrator', '衝撃が走った。');
      await D('ochi', 'よ、よっちんが……！？');
      await D('debu', '嘘だろ……あいつは被害者じゃないのか！？');
      await D('masahiro', '被害者に見せかけていた。全ては演技だった。');

      // 選択肢7: よっちん黒幕説への反応
      const choice7 = await C([
        { id: 'believe_masahiro', text: '「……証拠はあるのか？」' },
        { id: 'defend_yochi', text: '「待て、よっちんを犯人だと決めつけるな」', setFlag: { defended_yochi: true } },
        { id: 'suspect_masahiro', text: '「お前が罪をよっちんに被せようとしてるんじゃないのか？」', setFlag: { accused_masahiro_ch4: true } },
        { id: 'think', text: '「……話を聞かせろ」' }
      ]);

      if (choice7 === 'believe_masahiro') {
        await D('nobu', '証拠はあるのか？');
        await D('masahiro', 'ある。脅迫メールの発信元を追跡した。よっちんのスマホから送られていた。');
        await D('masahiro', 'そして、よっちんには動機がある。25年前の事件だ。');
      } else if (choice7 === 'defend_yochi') {
        await D('nobu', '待て、よっちんを犯人だと決めつけるな。');
        await D('nobu', 'よっちんは仮死状態にされていた。被害者だ。');
        await D('masahiro', '自作自演だ。自分で薬を打って、被害者を演じた。');
        await D('nobu', '（本当にそんなことが可能なのか……？）');
      } else if (choice7 === 'suspect_masahiro') {
        await D('nobu', 'お前が罪をよっちんに被せようとしてるんじゃないのか？');
        await D('masahiro', '……何だと？');
        await D('nobu', '保険金の受取人はお前だ。動機があるのはお前の方だ。');
        await D('masahiro', '俺は被害者だ！　脅迫されてこの旅行を企画させられたんだ！');
        await D('nobu', '（どっちが本当のことを言っている……？）');
      } else {
        await D('nobu', '……話を聞かせろ。');
        await D('masahiro', 'いいだろう。');
      }

      // ============================================================
      //  シーン7: 25年前の真実
      // ============================================================
      await D('masahiro', '25年前……俺たちは中学2年生だった。');
      await D('masahiro', '同じクラスに、「あいつ」がいた。おとなしくて、いじめられやすい奴だった。');
      await D('masahiro', '俺たちは……「あいつ」をいじめた。毎日のように。');
      await D('narrator', '全員が俯いた。誰も目を合わせようとしない。');
      await D('masahiro', 'ある日、俺たちは学校の屋上に「あいつ」を呼び出した。');
      await D('masahiro', '……そして、「あいつ」は屋上から落ちた。');

      if (Flow.hasFlag('found_old_incident')) {
        await D('nobu', '（やはり……あの記事の事件だ）');
      }

      await D('debu', '……俺たちが……押したのか？');
      await D('masahiro', '……覚えてない。みんな、覚えてないと言った。');
      await D('masahiro', 'でも、「あいつ」は落ちた。全治6ヶ月の重傷。');
      await D('masahiro', 'そして、「あいつ」は……その後、転校した。消息は分からなくなった。');

      await D('nobu', '……その「あいつ」が、今俺たちに復讐しようとしている、ということか。');
      await D('masahiro', 'ああ。そして俺は、「あいつ」の正体が……よっちんだと思っている。');
      await D('ochi', 'よっちんが……あの時の被害者？');
      await D('masahiro', '名前を変えて、俺たちに近づいた。幼馴染のふりをして。');
      await D('masahiro', 'そして、この旅行で復讐を実行しようとしている。');

      // 選択肢8: 真相への反応
      const choice8 = await C([
        { id: 'reject', text: '「ありえない。よっちんは俺たちと一緒に育った」' },
        { id: 'consider', text: '「……可能性はある」', setFlag: { considers_yochi_enemy: true } },
        { id: 'ask_kato', text: '「かとぱん、お前の「組織」はこのことを知っているのか？」' },
        { id: 'question_memory', text: '「待て、俺たちの記憶は本当に正しいのか？」', setFlag: { questions_memory: true } }
      ]);

      if (choice8 === 'reject') {
        await D('nobu', 'ありえない。よっちんは俺たちと一緒に育った。幼稚園の時から知ってる。');
        await D('masahiro', '……本当にそうか？　お前、よっちんの幼稚園時代を覚えてるか？');
        await D('nobu', '……。');
        await D('masahiro', '思い出してみろ。よっちんが俺たちのグループに入ったのは、いつだ？');
        await D('nobu', '（……思い出せない。いつから「幼馴染」だった？）');
      } else if (choice8 === 'consider') {
        await D('nobu', '……可能性はある。');
        await D('nobu', 'よっちんは俺たちの情報を全て知っている。計画を立てるのに十分な知識がある。');
        await D('yuuki', 'でもよ、よっちんが黒幕なら、なんで自分を仮死状態にしたんだ？');
        await D('masahiro', '俺たちの疑いを逸らすためだ。被害者のふりをすれば、誰も疑わない。');
      } else if (choice8 === 'ask_kato') {
        await D('nobu', 'かとぱん、お前の「組織」はこのことを知っているのか？');
        await D('kato', '……ああ。組織はこの事件を追っている。');
        await D('kato', 'ただし、組織の情報では、黒幕はよっちんではない。');
        await D('masahiro', '何だと？');
        await D('kato', '組織が追っている人物は……別にいる。');
        await D('nobu', '誰だ。');
        await D('kato', '……言えない。まだ確証がないからだ。');
      } else {
        await D('nobu', '待て、俺たちの記憶は本当に正しいのか？');
        await D('nobu', '25年前のことを、正確に覚えてる奴がいるのか？');
        await D('masahiro', '……何が言いたい。');
        await D('nobu', '誰かが俺たちの記憶を操作している可能性は？　偽の記憶を植え付けられている可能性は？');
        await D('chiba', '……心理学的には、偽の記憶を植え付けることは可能だ。「偽記憶症候群」という。');
        await D('nobu', '（ちばぶが電話で言っていた……？　いや、ちばぶは入院中だ）');
        await D('narrator', '全員が顔を見合わせた。何が真実で、何が嘘か、分からなくなっていく。');
      }

      // ============================================================
      //  シーン8: ポケモン遭遇 — 窓の外の影
      // ============================================================
      await D('narrator', '議論が白熱する中、窓の外で何かが動いた。', { sound: 'pokemon_appear' });
      await D('narrator', 'ポケモンだ。');

      const encounter1 = await Flow.triggerPokemonEncounter();
      if (encounter1.caught) {
        await D('nobu', '仲間になってくれた……この状況でも、味方は増える。');
      } else {
        await D('narrator', 'ポケモンは去っていった。');
      }

      // ============================================================
      //  シーン9: よっちん登場 — 対決
      // ============================================================
      await D('narrator', '午後2:45 ── 個室のドアが開いた。');
      await D('yochi', '……やぁ、みんな。揃ってるな。', { sound: 'shock' });

      await D('narrator', 'よっちんが立っていた。その表情は……いつもと違った。');
      await D('narrator', '冷たい目。作り物の笑顔。');

      await D('masahiro', 'よっちん……お前……');
      await D('yochi', '何だ、マーシー。俺の話をしてたんだろ？　聞こえてたよ。');
      await D('yochi', '「よっちんが黒幕だ」ってな。');

      // 選択肢9: よっちんへの対応
      const choice9 = await C([
        { id: 'confront_yochi', text: '「よっちん、本当のことを話せ」' },
        { id: 'defend_yochi_again', text: '「よっちん、みんなの疑いを晴らしてくれ」' },
        { id: 'attack_stance', text: '警戒態勢を取る', setFlag: { guard_against_yochi: true } },
        { id: 'wait', text: 'よっちんの次の言葉を待つ' }
      ]);

      if (choice9 === 'confront_yochi') {
        await D('nobu', 'よっちん、本当のことを話せ。お前は何者だ。');
        await D('yochi', '……何者？　俺は俺だよ。お前たちの幼馴染、よっちん。');
        await D('nobu', '嘘をつくな。25年前、俺たちにいじめられた少年。それがお前か？');
        await D('yochi', '…………。');
        await D('yochi', '……よく調べたな、のぶん。さすがだ。');
        await D('narrator', 'よっちんの顔から笑みが消えた。', { effect: 'shake' });
      } else if (choice9 === 'defend_yochi_again') {
        await D('nobu', 'よっちん、みんなの疑いを晴らしてくれ。お前が黒幕じゃないって証明してくれ。');
        await D('yochi', '……証明？　する必要があるのか？');
        await D('yochi', '俺は被害者だぞ。仮死状態にされて、殺されかけたんだ。');
        await D('masahiro', '自作自演だろ。');
        await D('yochi', '……ふーん。そう思うか。');
      } else if (choice9 === 'attack_stance') {
        await D('narrator', 'のぶんは椅子から立ち上がり、いつでも動けるように構えた。');
        await D('yochi', 'おいおい、のぶん。何だその態勢は。俺を殺す気か？');
        await D('nobu', '逆だ。お前に殺されないためだ。');
        await D('yochi', '……なるほど。賢いな。');
      } else {
        await D('narrator', 'のぶんは黙ってよっちんを見つめた。');
        await D('narrator', 'よっちんはゆっくりと個室に入り、ドアを閉めた。');
      }

      // ============================================================
      //  シーン10: よっちんの告白
      // ============================================================
      await D('yochi', '……もう隠しても仕方ないか。');
      await D('yochi', '俺は……お前たちの「幼馴染」じゃない。', { sound: 'shock', effect: 'flash', flashColor: '#fff' });

      await D('narrator', '全員が凍りついた。');

      await D('yochi', '25年前、お前たちに屋上から突き落とされた少年。それが俺だ。');
      await D('yochi', '名前を変え、顔を整形し、お前たちに近づいた。');
      await D('yochi', '10年以上かけて、お前たちの「幼馴染」になりすました。');

      await D('debu', 'そ、そんな……');
      await D('ochi', '嘘だ……嘘だと言ってくれ……');

      await D('yochi', '嘘じゃない。俺は……復讐のために生きてきた。');
      await D('yochi', 'お前たちに味わわせたかったんだ。俺が感じた恐怖、絶望、孤独を。');

      // 選択肢10: よっちんの告白への反応
      const choice10 = await C([
        { id: 'apologize', text: '「……すまなかった」', setFlag: { apologized_yochi: true } },
        { id: 'justify', text: '「俺たちも子供だった。覚えてないんだ」' },
        { id: 'fight', text: '「復讐は間違っている。許さない」', setFlag: { rejected_yochi: true } },
        { id: 'understand', text: '「……お前の気持ちは分かる」', setFlag: { understood_yochi: true } }
      ]);

      if (choice10 === 'apologize') {
        await D('nobu', '……すまなかった。');
        await D('yochi', '……今更謝っても、俺の25年は戻らない。');
        await D('nobu', '分かってる。でも、俺は……お前に謝りたい。');
        await D('yochi', '…………。');
        await D('narrator', 'よっちんの目に、一瞬だけ揺らぎが見えた。');
      } else if (choice10 === 'justify') {
        await D('nobu', '俺たちも子供だった。覚えてないんだ。');
        await D('yochi', '覚えてない？　それが言い訳か？');
        await D('yochi', '俺は毎日覚えてる。屋上から落ちた瞬間を。地面に叩きつけられた痛みを。');
        await D('yochi', 'お前たちが笑っている声を。', { effect: 'shake' });
      } else if (choice10 === 'fight') {
        await D('nobu', '復讐は間違っている。許さない。');
        await D('yochi', '許す許さないは、お前が決めることじゃない。');
        await D('yochi', '俺が決める。俺の人生だ。');
      } else {
        await D('nobu', '……お前の気持ちは分かる。');
        await D('yochi', '分かる？　本当に？');
        await D('nobu', '完全には分からない。でも、俺たちが許されないことをしたのは事実だ。');
        await D('yochi', '…………。');
      }

      // ============================================================
      //  シーン11: 真の黒幕 — 衝撃の展開
      // ============================================================
      await D('yochi', 'だが……俺には一つ、誤算があった。');
      await D('nobu', '誤算？');
      await D('yochi', '俺は復讐を計画した。だが、実行したのは俺じゃない。');
      await D('narrator', '全員の目がよっちんに向けられた。');
      await D('yochi', '誰かが俺の計画を盗んだ。そして、俺より先に動き始めた。');
      await D('yochi', '俺が仮死状態にされたのは本当だ。俺自身も狙われている。');
      await D('masahiro', '何だと……？');
      await D('yochi', '俺の計画を知っている人間は……もう一人いる。');
      await D('yochi', '俺に協力すると言って、近づいてきた人間が。');

      // 選択肢11: 真の黒幕
      const choice11 = await C([
        { id: 'ask_name', text: '「誰だ。名前を言え」' },
        { id: 'guess_masahiro', text: '「マーシーか？」' },
        { id: 'guess_ochi', text: '「おちぷーか？」' },
        { id: 'guess_other', text: '「この場にいない誰かか？」' }
      ]);

      if (choice11 === 'ask_name') {
        await D('nobu', '誰だ。名前を言え。');
        await D('yochi', '……俺に近づいてきたのは……');
      } else if (choice11 === 'guess_masahiro') {
        await D('nobu', 'マーシーか？');
        await D('masahiro', '俺じゃない！　俺は脅迫されていた側だ！');
        await D('yochi', '……マーシーじゃない。あいつは本当に被害者だ。');
      } else if (choice11 === 'guess_ochi') {
        await D('nobu', 'おちぷーか？');
        await D('ochi', 'お、俺！？　冗談じゃない！');
        await D('yochi', '……おちぷーも違う。あいつは俺の協力者だったが、実行犯じゃない。');
        await D('ochi', '（……！）');
        await D('nobu', '（おちぷーは協力者だった……！）');
        Flow.setFlag('ochi_was_accomplice');
      } else {
        await D('nobu', 'この場にいない誰かか？');
        await D('yochi', '……いや。この場にいる。');
      }

      await D('yochi', '俺の計画を盗み、俺を裏切った人間。それは……');
      await D('narrator', 'よっちんが指を差した。その先には──', { sound: 'shock', effect: 'flash', flashColor: '#ff0000' });

      await D('yochi', 'かとぱんだ。');

      await D('kato', '…………。');

      await D('narrator', 'かとぱんは黙っていた。否定しなかった。');
      await D('narrator', 'そして、ゆっくりと立ち上がった。');

      await D('kato', '……バレたか。');

      await Effects.shake();

      // ============================================================
      //  シーン12: かとぱんの正体
      // ============================================================
      await D('kato', '俺は……25年前、お前たちの被害者の兄だ。');
      await D('narrator', '衝撃が走った。');
      await D('kato', '弟が屋上から落ちた時、俺は高校生だった。');
      await D('kato', '弟は命は取り留めたが、心を壊した。今も精神病院にいる。');
      await D('kato', 'お前たちは何も償わなかった。平然と生きている。');
      await D('kato', '俺は医者になった。弟を治すために。そして……お前たちに復讐するために。');

      await D('nobu', '（かとぱんが……黒幕だった……）');

      await D('kato', 'よっちん……いや、弟。お前の計画は甘すぎた。');
      await D('kato', 'だから俺が引き継いだ。俺のやり方で、全員を始末する。');

      await D('yochi', '兄さん……！　約束が違う！　殺すつもりじゃなかったはずだ！');
      await D('kato', '約束？　俺はそんな約束をした覚えはない。');
      await D('kato', 'お前も邪魔だったから、仮死状態にした。でも、生きてたか。残念だ。');

      // 選択肢12: かとぱんへの対応
      const choice12 = await C([
        { id: 'reason', text: '「かとぱん、話し合おう。まだ間に合う」' },
        { id: 'attack', text: '飛びかかる', setFlag: { attacked_kato: true } },
        { id: 'escape', text: '「逃げろ！」と叫ぶ', setFlag: { fled_from_kato: true } },
        { id: 'use_pokemon', text: 'ポケモンで戦う', setFlag: { used_pokemon_vs_kato: true } }
      ]);

      if (choice12 === 'reason') {
        await D('nobu', 'かとぱん、話し合おう。まだ間に合う。');
        await D('kato', '話し合い？　25年、俺は話し合いを待った。誰も謝らなかった。');
        await D('kato', 'もう遅い。');
        await D('narrator', 'かとぱんがポケットから何かを取り出した。');
        await D('narrator', '注射器だった。', { sound: 'shock' });
      } else if (choice12 === 'attack') {
        await D('narrator', 'のぶんはかとぱんに飛びかかった！');
        await D('narrator', 'しかし、かとぱんは素早く身をかわした。');
        await D('kato', '無駄だ。俺は準備してきた。');
        await D('narrator', 'かとぱんがポケットから注射器を取り出した。');
      } else if (choice12 === 'escape') {
        await D('nobu', '逃げろ！！');
        await D('narrator', '全員がドアに向かって走った。');
        await D('narrator', 'しかし、ドアは外から鍵がかけられていた。');
        await D('debu', '開かない！　鍵がかかってる！');
        await D('kato', '無駄だ。この店は俺が手配した。逃げ場はない。');
      } else {
        await D('nobu', 'ポケモン、頼む！');
        await D('narrator', 'のぶんはポケモンを繰り出した！');

        const katoPokemon = await GameEngine.PokemonAPI.getRandomPokemon();
        katoPokemon.level = 60;
        katoPokemon.hp = Math.floor(katoPokemon.hp * 1.3);
        katoPokemon.maxHp = katoPokemon.hp;
        katoPokemon.atk = Math.floor(katoPokemon.atk * 1.4);

        const battleResult = await Flow.triggerBattle(katoPokemon, 'かとぱん');

        if (battleResult) {
          await D('kato', 'くっ……！');
          await D('narrator', 'かとぱんのポケモンが倒れた。');
          await D('narrator', '隙を突いて、マーシーがかとぱんに組みついた。');
          await D('masahiro', '動くな！');
          Flow.setFlag('kato_defeated_battle');
        } else {
          await D('kato', 'ハッ……やはりお前たちは弱い。');
          await D('narrator', 'のぶんのポケモンが倒れた。');
          await D('narrator', 'かとぱんは注射器を構えた。');
        }
      }

      // ============================================================
      //  シーン13: 決着 — 予想外の展開
      // ============================================================
      if (!Flow.hasFlag('kato_defeated_battle')) {
        await D('narrator', 'かとぱんが注射器を振りかざした瞬間──');
        await D('narrator', '窓ガラスが割れた。', { sound: 'shock', effect: 'shake' });

        await D('narrator', '外から誰かが飛び込んできた。');
        await D('mikki', '遅れたな。パーティーは終わりだ。', { effect: 'flash', flashColor: '#fff' });

        await D('narrator', 'ミッキーだった。そして、その後ろには──');
        await D('narrator', 'ちばぶがいた。');

        await D('nobu', 'ちばぶ！？　入院してたんじゃ……！');
        await D('chiba', '退院した。のぶん、伏せろ！');

        await D('narrator', 'ちばぶが何かを投げた。');
        await D('narrator', '閃光弾。目が眩む。', { effect: 'flash', flashColor: '#fff' });

        await D('narrator', '視界が戻った時、かとぱんは床に倒れていた。');
        await D('narrator', 'ミッキーが押さえつけている。');

        await D('mikki', 'こいつを追ってたんだ。ようやく尻尾を掴んだ。');
      } else {
        await D('narrator', 'かとぱんは取り押さえられた。');
        await D('narrator', '抵抗する力は残っていないようだった。');
      }

      await D('kato', '……くそ……こんなところで……');
      await D('nobu', 'かとぱん……いや、何て呼べばいい？');
      await D('kato', '……俺の名前は「加藤」だ。本名だ。');
      await D('nobu', '……加藤。お前の弟のことは、本当に申し訳なく思う。');
      await D('kato', '……今更だ。全て……今更だ。');

      // ============================================================
      //  シーン14: 事後処理 — 警察と真実
      // ============================================================
      await Effects.fadeToBlack(800);
      UI.setBackground('linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #0f3460 80%, #0a0a20 100%)');
      await Effects.fadeFromBlack(800);

      await D('narrator', '午後5:00 ── 御殿場警察署。');
      await D('narrator', 'かとぱんは逮捕された。殺人未遂、傷害、監禁の容疑で。');
      await D('narrator', 'よっちんも任意同行となった。共犯の可能性があるとして。');

      await D('narrator', '残されたメンバーは、警察での事情聴取を終え、待合室にいた。');
      await D('narrator', 'マーシー、デブコーン、おちぷー、ゆっきん、ちばぶ、ミッキー、そしてのぶん。');

      await D('masahiro', '……終わった、のか。');
      await D('debu', '終わった……のかな。');
      await D('nobu', '分からない。でも、とりあえず……生きている。');

      // 選択肢13: 事件後の心境
      const choice13 = await C([
        { id: 'relief', text: '「……助かった」' },
        { id: 'guilt', text: '「俺たちの罪は消えない」', setFlag: { feels_guilty: true } },
        { id: 'suspicion', text: '「まだ終わっていない気がする」', setFlag: { still_suspicious: true } },
        { id: 'forgiveness', text: '「よっちんに会いたい」', setFlag: { wants_to_see_yochi: true } }
      ]);

      if (choice13 === 'relief') {
        await D('nobu', '……助かった。');
        await D('chiba', 'ああ。危なかった。');
        await D('masahiro', '……俺は、これからどうすればいい？');
        await D('nobu', '生きていくしかない。俺たちは。');
      } else if (choice13 === 'guilt') {
        await D('nobu', '俺たちの罪は消えない。25年前、俺たちは人を傷つけた。');
        await D('masahiro', '……ああ。忘れていた。覚えていないふりをしていた。');
        await D('debu', '俺たちは……どうすれば償える？');
        await D('nobu', '分からない。でも、逃げることはもうできない。');
      } else if (choice13 === 'suspicion') {
        await D('nobu', 'まだ終わっていない気がする。');
        await D('chiba', '何か気になることがあるのか？');
        await D('nobu', 'かとぱんが言っていた「組織」。かとぱん一人の仕業じゃない気がする。');
        await D('mikki', '……鋭いな。俺も同じことを考えてた。');
      } else {
        await D('nobu', 'よっちんに会いたい。');
        await D('masahiro', '……会ってどうする？');
        await D('nobu', '謝りたい。そして……許しを請いたい。許されなくても。');
      }

      // ============================================================
      //  シーン15: エンディング — 新たな影
      // ============================================================
      await Effects.fadeToBlack(1000);
      UI.setBackground('linear-gradient(180deg, #000 0%, #0a0510 30%, #1a0520 60%, #000 100%)');
      await Effects.fadeFromBlack(1000);

      await D('narrator', '午後8:00 ── 御殿場駅前。');
      await D('narrator', '事情聴取を終え、メンバーは帰路につこうとしていた。');
      await D('narrator', '駅の改札前で、ミッキーがのぶんを呼び止めた。');

      await D('mikki', 'のぶん。一つ言っておくことがある。');
      await D('nobu', '何だ。');
      await D('mikki', 'かとぱんは……「前菜」に過ぎない。');
      await D('nobu', '……どういう意味だ。', { sound: 'shock' });
      await D('mikki', '「組織」の本当のボスは別にいる。そいつは……お前たちの中にいる。');
      await D('nobu', '俺たちの中に……？');
      await D('mikki', 'まだ全員を信用するな。特に……「一番信頼されている奴」を。');
      await D('narrator', 'ミッキーはそれだけ言うと、闇の中に消えていった。');

      await D('nobu', '（一番信頼されている奴……誰だ？）');
      await D('nobu', '（マーシー？　デブコーン？　ちばぶ？　それとも……）');

      await D('narrator', 'のぶんは振り返り、仲間たちを見た。');
      await D('narrator', 'マーシーが微笑んでいる。デブコーンが手を振っている。ちばぶが頷いている。');
      await D('narrator', 'この中に、まだ敵がいる。');
      await D('narrator', '本当の黒幕が──。');

      await Effects.fadeToBlack(1500);
      await new Promise(r => setTimeout(r, 1500));

      await D('narrator', '── 第四章「追憶の連鎖」── 完 ──', {
        bg: 'linear-gradient(180deg, #000 0%, #1a0000 100%)',
        effect: 'fadeIn'
      });

      await D('narrator', '最終章予告：全ての真実が明らかになる時。そして、最後の戦いが始まる──', { autoAdvance: 3000 });

      await new Promise(r => setTimeout(r, 2000));

      Flow.chapterComplete('chapter4');
    }
  };

  GameEngine.registerChapter('chapter4', Chapter4Script);
  Chapter4Script.chapterTitle = '追憶の連鎖';

})();