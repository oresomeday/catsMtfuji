// chapter5.js - 第五章「終焉の頂」
(function() {
  'use strict';

  const Flow = GameEngine.Flow;
  const Effects = GameEngine.Effects;
  const UI = GameEngine.UI;

  const Chapter5Script = {
    chapterTitle: '終焉の頂',

    async start() {
      const D = Flow.showDialogue.bind(Flow);
      const C = Flow.showChoices.bind(Flow);

      // ============================================================
      //  シーン1: 最後の夜 — 7月27日 深夜
      // ============================================================
      UI.setBackground('linear-gradient(180deg, #000 0%, #0a0510 30%, #1a0520 60%, #000 100%)');
      await Effects.fadeFromBlack(1500);

      await D('narrator', '7月27日 深夜11:00 ── のぶんの自宅。');
      await D('narrator', '警察での事情聴取を終え、帰宅したのぶんは、眠れずにいた。');
      await D('narrator', 'かとぱんは逮捕された。よっちんは取り調べ中。事件は終わったはずだった。');
      await D('narrator', '……だが、ミッキーの言葉が頭から離れない。');

      await D('nobu', '（「一番信頼されている奴」……誰だ？）');
      await D('nobu', '（マーシー？　この旅行を企画したのはマーシーだ）');
      await D('nobu', '（でも、マーシーは脅迫されていたと言っていた……）');

      await D('narrator', 'スマホが震えた。メッセージが届いている。');
      await D('narrator', '送信者は……非通知。');
      await D('narrator', '「明日正午。富士山須走口5合目。真実を知りたければ来い。一人で」', { sound: 'shock' });

      // 選択肢1: メッセージへの対応
      const choice1 = await C([
        { id: 'go_alone', text: '一人で行く', setFlag: { going_alone: true } },
        { id: 'tell_others', text: '仲間に知らせてから行く', setFlag: { told_others: true } },
        { id: 'ignore', text: '無視する', setFlag: { ignored_message: true } },
        { id: 'call_police', text: '警察に連絡する', setFlag: { called_police: true } }
      ]);

      if (choice1 === 'go_alone') {
        await D('nobu', '（一人で行く……罠かもしれない。だが、真実を知りたい）');
        await D('narrator', 'のぶんは決意を固めた。');
      } else if (choice1 === 'tell_others') {
        await D('narrator', 'のぶんはマーシーに電話をかけた。');
        await D('masahiro', '……こんな時間にどうした。');
        await D('nobu', '変なメッセージが来た。明日、富士山の5合目に来いって。');
        await D('masahiro', '……罠だろう。行くな。');
        await D('nobu', 'でも、真実を知りたい。お前も来てくれないか。');
        await D('masahiro', '……分かった。一緒に行こう。');
      } else if (choice1 === 'ignore') {
        await D('nobu', '（無視だ。罠に決まってる）');
        await D('narrator', 'のぶんはスマホを置き、眠ろうとした。');
        await D('narrator', '……しかし、数分後、また震えた。');
        await D('narrator', '「無視するな。来なければ、残りの仲間が死ぬ」', { sound: 'shock', effect: 'shake' });
        await D('nobu', '……っ！');
        await D('narrator', '選択の余地はなかった。');
      } else {
        await D('narrator', 'のぶんは警察に電話した。');
        await D('narrator', '……しかし、この時間では担当者に繋がらなかった。');
        await D('narrator', '留守番電話にメッセージを残すしかなかった。');
        await D('nobu', '（警察は当てにならない。自分で行くしかない）');
      }

      // ============================================================
      //  シーン2: 出発 — 7月28日 朝
      // ============================================================
      await Effects.fadeToBlack(1000);
      UI.setBackground('linear-gradient(180deg, #4a5568 0%, #667788 30%, #87CEEB 60%, #aaccee 100%)');
      await Effects.fadeFromBlack(1000);

      await D('narrator', '7月28日 午前9:00 ── のぶんは再び御殿場に向かった。');
      await D('narrator', '電車の中、窓の外に富士山が見える。');
      await D('narrator', '3日前に登った山。仲間が傷つき、真実が暴かれた山。');
      await D('narrator', '今日、全てが終わる。');

      if (Flow.hasFlag('told_others')) {
        await D('narrator', '御殿場駅でマーシーと合流した。');
        await D('masahiro', '……本当に行くのか。');
        await D('nobu', 'ああ。終わらせる。');
        await D('narrator', 'さらに、デブコーンとちばぶにも連絡を取っていた。');
        await D('debu', '俺も行くぜ。仲間だろ。');
        await D('chiba', '……退院したばかりだが、最後まで付き合う。');
        Flow.setFlag('backup_arrived');
      }

      // ============================================================
      //  シーン3: 再び須走口5合目
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #87CEEB 0%, #6baa75 30%, #2d5a27 60%, #1a3a1a 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '午前11:30 ── 須走口5合目。');
      await D('narrator', '3日前と同じ場所。しかし、景色は全く違って見えた。');
      await D('narrator', '観光客の姿はまばら。静かな朝だ。');

      await D('narrator', '……駐車場の端に、人影が見えた。');
      await D('narrator', 'ゆっきんとミッキーだった。');

      await D('yuuki', 'よう、のぶん。来たな。');
      await D('mikki', '待ってたぜ。');

      // 選択肢2: 二人への対応
      const choice2 = await C([
        { id: 'demand_truth', text: '「真実を話せ。黒幕は誰だ」' },
        { id: 'fight_stance', text: '戦闘態勢を取る', setFlag: { ready_to_fight: true } },
        { id: 'bargain', text: '「何が望みだ」と交渉する' },
        { id: 'wait', text: '相手の出方を待つ' }
      ]);

      if (choice2 === 'demand_truth') {
        await D('nobu', '真実を話せ。黒幕は誰だ。かとぱんじゃなかったのか。');
        await D('mikki', 'かとぱんは実行犯の一人に過ぎない。本当の黒幕は……別にいる。');
        await D('nobu', '誰だ。');
        await D('mikki', '……それを教えてやる前に、お前の実力を見せてもらう。');
      } else if (choice2 === 'fight_stance') {
        await D('narrator', 'のぶんは身構えた。');
        await D('mikki', 'おいおい、そう警戒するなよ。俺たちは敵じゃない……まだな。');
        await D('yuuki', '試験だよ、のぶん。お前が真実を受け止める覚悟があるか、試す。');
      } else if (choice2 === 'bargain') {
        await D('nobu', '何が望みだ。');
        await D('yuuki', '俺たちが欲しいのは……「決着」だ。');
        await D('mikki', '25年前から続くこの因縁を、今日終わらせる。');
      } else {
        await D('narrator', 'のぶんは黙って二人を見つめた。');
        await D('mikki', '……慎重だな。いいぜ、説明してやる。');
      }

      await D('yuuki', 'のぶん。お前の覚悟を試させてもらう。ポケモンバトルだ。');
      await D('yuuki', '俺たちを倒せば、全ての真実を教える。');
      await D('yuuki', '負けたら……ここで終わりだ。');

      // ============================================================
      //  シーン4: ゆっきん戦 — 伝説のポケモン：フリーザー
      // ============================================================
      await D('yuuki', '行くぜ！ 俺の切り札は……伝説の氷の鳥だ！');
      await D('narrator', 'ゆっきんがモンスターボールを投げた。');
      await D('narrator', '現れたのは……フリーザー！', { sound: 'pokemon_appear', effect: 'flash', flashColor: '#98D8D8' });
      await D('narrator', '伝説のポケモンが、冷気を纏って姿を現した。空気が凍りつく。');

      // フリーザー生成
      const articuno = await GameEngine.PokemonAPI.getPokemon(144);
      articuno.name = 'フリーザー';
      articuno.level = 70;
      articuno.hp = Math.floor(articuno.hp * 1.0);
      articuno.maxHp = articuno.hp;
      articuno.atk = Math.floor(articuno.atk * 1.1);
      articuno.def = Math.floor(articuno.def * 1.1);

      // ポケモンが足りない場合の補充
      if (GameEngine.Data.state.pokemon.length === 0) {
        const emergency = await GameEngine.PokemonAPI.getRandomPokemon();
        GameEngine.Data.state.pokemon.push(emergency);
        GameEngine.Save.save();
        await D('narrator', `野生の${emergency.name}が のぶんの味方に 駆けつけた！`);
      }

      // パーティ選抜
      if (GameEngine.Data.state.pokemon.filter(p => p.hp > 0).length > 4) {
        await D('narrator', '手持ちのポケモンから、バトルに参加させる4体を選べ。');
        await Flow.selectBattleParty(4);
      } else {
        GameEngine.Data.state.selectedParty = GameEngine.Data.state.pokemon.filter(p => p.hp > 0);
      }

      await D('nobu', '行くぞ……！ 負けられない！');

      const yuukiBattleResult = await Flow.triggerBattle(articuno, 'ゆっきん');

      if (yuukiBattleResult) {
        await D('yuuki', 'くっ……フリーザーが……やるな、のぶん。');
        await D('nobu', '俺の勝ちだ。約束通り、先に進ませてもらう。');
        await D('yuuki', '……ああ。だが、次はもっと厳しいぞ。');
        Flow.setFlag('defeated_yuuki_final');
      } else {
        // ゲームオーバー
        await D('yuuki', 'ハッ、俺の勝ちだ。');
        await D('narrator', 'のぶんのポケモンは全滅した。');
        await D('narrator', '真実にたどり着くことはできなかった……。');
        return Flow.gameOver('ゆっきんのフリーザーに敗北した。伝説の力の前に、のぶんは膝をついた……。');
      }

      // ============================================================
      //  シーン5: 中間回復 — ミッキー戦への準備
      // ============================================================
      await D('mikki', '次は俺だ。これが最後のバトルだ、のぶん。');
      await D('mikki', '俺を倒せば、全ての真実を教える。そして……黒幕の元に案内してやる。');
      await D('mikki', 'だが、俺の相棒は……ゆっきんのフリーザーなんか比じゃないぜ。');

      // 選択肢3: 回復するか
      const choice3 = await C([
        { id: 'heal_pokemon', text: 'アイテムでポケモンを手当てする（HP・PP 50%回復）', setFlag: { healed_before_mikki: true } },
        { id: 'go_directly', text: 'そのままバトルに挑む' }
      ]);

      if (choice3 === 'heal_pokemon') {
        await D('narrator', 'のぶんは手持ちのアイテムでポケモンを手当てした。');
        GameEngine.Data.state.pokemon.forEach(p => {
          const healAmt = Math.floor(p.maxHp * 0.5);
          p.hp = Math.min(p.maxHp, p.hp + healAmt);
          p.moves.forEach(m => {
            const ppHeal = Math.floor(m.maxPp * 0.5);
            m.pp = Math.min(m.maxPp, m.pp + ppHeal);
          });
        });
        GameEngine.Save.save();
        await D('nobu', '完全とは言えないが、少しはマシになったか……。');
      } else {
        await D('nobu', 'このまま行く。休んでる暇はない。');
        await D('mikki', '覚悟が決まってるな。いいぜ。');
      }

      // ============================================================
      //  シーン6: ミッキー戦 — 伝説のポケモン：ミュウツー
      // ============================================================
      await D('mikki', '行くぜ……最強の伝説。遺伝子ポケモン……ミュウツー！');
      await D('narrator', 'ミッキーがモンスターボールを放った。');
      await D('narrator', '紫色のオーラと共に……ミュウツーが現れた！', { sound: 'pokemon_appear', effect: 'flash', flashColor: '#F85888' });
      await D('narrator', '圧倒的なプレッシャー。空気が歪む。これが伝説の力……！');

      // ミュウツー生成
      const mewtwo = await GameEngine.PokemonAPI.getPokemon(150);
      mewtwo.name = 'ミュウツー';
      mewtwo.level = 75;
      mewtwo.hp = Math.floor(mewtwo.hp * 1.0);
      mewtwo.maxHp = mewtwo.hp;
      mewtwo.atk = Math.floor(mewtwo.atk * 1.6);
      mewtwo.def = Math.floor(mewtwo.def * 1.0);

      // パーティ選抜
      const alivePokemon2 = GameEngine.Data.state.pokemon.filter(p => p.hp > 0);
      if (alivePokemon2.length > 4) {
        await D('narrator', '手持ちのポケモンから、バトルに参加させる4体を選べ。');
        await Flow.selectBattleParty(4);
      } else {
        GameEngine.Data.state.selectedParty = alivePokemon2;
      }

      await D('nobu', 'ミュウツー……！ だが、俺は負けない！');

      const mikkiBattleResult = await Flow.triggerBattle(mewtwo, 'ミッキー');

      if (mikkiBattleResult) {
        await D('mikki', '……参った。ミュウツーが倒れるとはな。', { effect: 'flash', flashColor: '#fff' });
        await D('nobu', '約束だ。真実を話せ。');
        await D('mikki', '……いいだろう。全て話す。');
        Flow.setFlag('defeated_mikki_final');
      } else {
        await D('mikki', '俺の勝ちだ……だが、お前の根性は認める。');
        await D('mikki', '……敬意を表して、真実だけは教えてやる。');
        Flow.setFlag('lost_to_mikki_final');
      }

      // ============================================================
      //  シーン7: 真実の開示 — ポケモン遭遇
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #1a0a2e 0%, #2c1810 30%, #3d2817 60%, #1a0a0a 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '5合目の休憩所。三人が座った。');
      await D('mikki', '……いいか、のぶん。これから話すことは、お前の人生を変える。');

      // 選択肢4: 覚悟
      const choice4 = await C([
        { id: 'ready', text: '「ああ、覚悟はできてる」' },
        { id: 'hesitate', text: '「……正直、怖い」' },
        { id: 'demand', text: '「早く話せ」' }
      ]);

      if (choice4 === 'ready') {
        await D('nobu', 'ああ、覚悟はできてる。');
      } else if (choice4 === 'hesitate') {
        await D('nobu', '……正直、怖い。でも、知らなければならない。');
      } else {
        await D('nobu', '早く話せ。時間がない。');
      }

      await D('mikki', 'まず、かとぱんは確かに実行犯だ。だが、全ての計画を立てたわけじゃない。');
      await D('mikki', 'かとぱんに計画を教え、実行させた人間がいる。');
      await D('yuuki', 'その人間は……お前たちの中にいる。');
      await D('nobu', '俺たちの中……？　まさか……');

      await D('mikki', '黒幕は……エディマーシーだ。', { sound: 'shock', effect: 'flash', flashColor: '#ff0000' });
      await Effects.shake();

      await D('nobu', 'マ、マーシー……！？');

      // ============================================================
      //  シーン8: マーシーの真実
      // ============================================================
      await D('mikki', 'マーシーは25年前、お前たちのリーダーだった。');
      await D('mikki', 'いじめを主導したのもマーシー。屋上から突き落とすことを提案したのもマーシーだ。');
      await D('yuuki', 'だが、マーシーは罪悪感に苛まれていた。');
      await D('yuuki', 'そして、ある日、かとぱんに接触された。「一緒に復讐しないか」とな。');
      await D('mikki', 'マーシーは迷った末に、計画に乗った。');
      await D('mikki', '自分も含めた全員を「処分」することで、罪を清算しようとした。');
      await D('nobu', '自分も含めた……？　マーシーは自分も死ぬつもりだったのか？');
      await D('mikki', 'ああ。最初はな。だが、途中で考えが変わった。');
      await D('mikki', '「自分だけは生き残り、保険金を受け取る」という欲が出た。');
      await D('mikki', 'かとぱんを裏切り、お前たちだけを始末しようとした。');
      await D('nobu', '（マーシーが……全ての黒幕……）');

      // 選択肢5: この情報への反応
      const choice5 = await C([
        { id: 'believe', text: '「……辻褄は合う」', setFlag: { believes_mikki_truth: true } },
        { id: 'doubt', text: '「嘘だ。証拠を見せろ」' },
        { id: 'accept', text: '「……そうか。全て分かった」', setFlag: { fully_understands: true } }
      ]);

      if (choice5 === 'believe') {
        await D('nobu', '……辻褄は合う。マーシーは最初から俺たちを操っていた。');
      } else if (choice5 === 'doubt') {
        await D('nobu', '嘘だ。証拠を見せろ。');
        await D('narrator', 'ミッキーがUSBメモリを差し出した。');
        await D('mikki', 'ここに全てが入っている。保険の契約書、かとぱんとの通信記録、計画書……');
        Flow.addItem({ name: '証拠データ', icon: '💾', desc: 'マーシーの犯罪を証明するデータ' });
      } else {
        await D('nobu', '……そうか。全て分かった。');
        await D('narrator', 'のぶんの心に、冷たい確信が広がった。');
      }

      // 途中でポケモンと遭遇
      await D('narrator', '……話の最中、茂みから何かが飛び出してきた。', { sound: 'pokemon_appear' });

      const encounter1 = await Flow.triggerPokemonEncounter();
      if (encounter1.caught) {
        await D('nobu', '最後の戦いに、新しい仲間が加わった。');
      }

      // ============================================================
      //  シーン9: マーシーとの対決へ
      // ============================================================
      await D('mikki', 'マーシーは今、この山のどこかにいる。');
      await D('yuuki', '俺たちがお前を呼んだことは、マーシーも知っている。');
      await D('mikki', '最後の対決だ。お前の手で決着をつけろ。');

      // 選択肢6: マーシーとの対決方法
      const choice6 = await C([
        { id: 'confront_alone', text: '一人でマーシーに会いに行く', setFlag: { confronts_alone: true } },
        { id: 'with_allies', text: 'ミッキーとゆっきんと一緒に行く', setFlag: { goes_with_allies: true } },
        { id: 'call_backup', text: '他の仲間に連絡してから行く' }
      ]);

      if (choice6 === 'confront_alone') {
        await D('nobu', '一人で行く。これは俺とマーシーの問題だ。');
        await D('mikki', '……いい覚悟だ。8合目の山小屋にいるはずだ。');
      } else if (choice6 === 'with_allies') {
        await D('nobu', '一緒に来てくれ。');
        await D('yuuki', 'いいぜ。最後まで付き合ってやる。');
        await D('mikki', '俺も行く。');
      } else {
        await D('narrator', 'のぶんはデブコーンとちばぶに電話をかけた。');
        if (!Flow.hasFlag('backup_arrived')) {
          await D('debu', '何だと……！？　すぐに向かう！');
          await D('chiba', '……分かった。');
          Flow.setFlag('backup_arrived');
        } else {
          await D('debu', 'もう着いてるぜ。一緒に行こう。');
        }
      }

      // ============================================================
      //  シーン10: 登山 — 頂上への道
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #666 0%, #888 30%, #aaa 60%, #ccc 100%)');
      await Effects.fadeFromBlack(600);

      await D('narrator', '午後1:00 ── 再び富士山を登る。');
      await D('narrator', 'この数日で3度目の登山。足は重いが、心は決まっていた。');

      if (Flow.hasFlag('goes_with_allies')) {
        await D('yuuki', 'なぁ、のぶん。マーシーと戦う覚悟はできてるか？');
        await D('nobu', '……分からない。でも、やるしかない。');
        await D('mikki', '迷いがあるなら、俺たちがやってもいいんだぜ。');
        await D('nobu', 'いや……俺がやる。俺の幼馴染だから。');
      }

      if (Flow.hasFlag('backup_arrived')) {
        await D('debu', 'のぶん……本当にマーシーが……？');
        await D('nobu', 'ああ。信じたくなかったけど、証拠がある。');
        await D('chiba', '……俺たちは、ずっと騙されていたということか。');
      }

      // ポケモン遭遇
      await D('narrator', '7合目を過ぎた頃、野生のポケモンが現れた。', { sound: 'pokemon_appear' });
      const encounter2 = await Flow.triggerPokemonEncounter();
      if (encounter2.caught) {
        await D('nobu', 'もう一体、仲間になってくれた。心強い。');
      }

      // ============================================================
      //  シーン11: 8合目の山小屋 — マーシーとの対面
      // ============================================================
      await Effects.fadeToBlack(600);
      UI.setBackground('linear-gradient(180deg, #555 0%, #666 30%, #777 60%, #888 100%)');
      await Effects.fadeFromBlack(600);
      Effects.startFog();

      await D('narrator', '午後3:00 ── 8合目の山小屋。');
      await D('narrator', '霧が立ち込め、視界が悪い。');
      await D('narrator', '山小屋の前に、人影が立っていた。');

      await D('masahiro', '……来たか、のぶん。', { sound: 'shock' });

      await D('narrator', 'マーシーだった。その表情は、もう「友人」のものではなかった。');
      await D('narrator', '冷たく、鋭い目。全てを諦めた者の顔。');

      await D('masahiro', '全部聞いたんだろ。ミッキーとゆっきんから。');
      await D('nobu', 'ああ。お前が黒幕だってこともな。');
      await D('masahiro', '……そうだ。全て俺が仕組んだ。');

      // 選択肢7: マーシーへの言葉
      const choice7 = await C([
        { id: 'why', text: '「なぜだ、マーシー。俺たちは友達じゃなかったのか」' },
        { id: 'anger', text: '「許さない。お前を止める」', setFlag: { angry_at_masahiro: true } },
        { id: 'understand', text: '「……お前も苦しかったんだな」', setFlag: { sympathize_masahiro: true } },
        { id: 'silent', text: '何も言わない' }
      ]);

      if (choice7 === 'why') {
        await D('nobu', 'なぜだ、マーシー。俺たちは友達じゃなかったのか。');
        await D('masahiro', '友達……？　笑わせるな。');
        await D('masahiro', '俺たちは共犯者だ。25年前の罪を共有する、共犯者。');
        await D('masahiro', '俺は……あの時のことを、一日も忘れたことはなかった。');
        await D('masahiro', 'お前たちは忘れていた。平然と生きていた。それが……許せなかった。');
      } else if (choice7 === 'anger') {
        await D('nobu', '許さない。お前を止める。');
        await D('masahiro', '止める？　どうやって？');
      } else if (choice7 === 'understand') {
        await D('nobu', '……お前も苦しかったんだな。');
        await D('narrator', 'マーシーの目に、一瞬だけ動揺が走った。');
        await D('masahiro', '……ああ。苦しかった。毎日、あの少年の顔が夢に出た。');
        await D('masahiro', '許されたかった。でも、許されるわけがなかった。');
      } else {
        await D('narrator', 'のぶんは何も言わず、マーシーを見つめた。');
        await D('masahiro', '……何か言えよ。');
      }

      // ============================================================
      //  シーン12: マーシーの告白
      // ============================================================
      await D('masahiro', '俺は……最初から死ぬつもりだった。');
      await D('masahiro', 'お前たち全員を道連れにして、富士山で死ぬ。それが俺の計画だった。');
      await D('masahiro', 'でも、途中で欲が出た。「自分だけは生き残れるんじゃないか」ってな。');
      await D('masahiro', '保険金も入る。借金も返せる。新しい人生を始められる。');
      await D('masahiro', '……浅ましいだろ。俺は、最低な人間だ。');

      // 選択肢8: マーシーへの最後の問いかけ
      const choice8 = await C([
        { id: 'surrender', text: '「自首しろ、マーシー。今からでも遅くない」' },
        { id: 'fight_masahiro', text: '「ポケモンバトルで決着をつけよう」', setFlag: { fights_masahiro: true } },
        { id: 'forgive', text: '「俺は……お前を許す」', setFlag: { forgives_masahiro: true } },
        { id: 'arrest', text: '「警察に全て話す。覚悟しろ」' }
      ]);

      if (choice8 === 'surrender') {
        await D('nobu', '自首しろ、マーシー。今からでも遅くない。');
        await D('masahiro', '自首……？　今更、何の意味がある。');
        await D('nobu', '意味はある。罪を認めて、償う。それが人間としてできる最後のことだ。');
        await D('masahiro', '……のぶん。お前はいつもそうだったな。正しいことを言う奴だった。');
        await D('masahiro', 'だが、正しさだけじゃ……俺は救えない。');
        await D('masahiro', '……最後に、勝負させてくれ。');
        Flow.setFlag('fights_masahiro');
      } else if (choice8 === 'fight_masahiro') {
        await D('nobu', 'ポケモンバトルで決着をつけよう。俺が勝ったら、自首しろ。');
        await D('masahiro', '……いいだろう。お前が勝ったら、全てを終わりにする。');
      } else if (choice8 === 'forgive') {
        await D('nobu', '俺は……お前を許す。');
        await D('masahiro', '……何？', { sound: 'shock' });
        await D('nobu', '25年前、俺たちは間違いを犯した。お前だけの責任じゃない。');
        await D('nobu', 'お前が苦しんでいたことを、俺たちは気づかなかった。それも俺たちの罪だ。');
        await D('masahiro', 'のぶん……お前……');
        await D('narrator', 'マーシーの目から、涙がこぼれた。');
        await D('masahiro', '……許されていいのか？　俺は……仲間を殺そうとしたんだぞ……');
        await D('nobu', '許すと言っても、罪が消えるわけじゃない。でも、俺たちは前に進まなきゃいけない。');
        await D('nobu', 'もう、終わりにしよう。一緒に罪を背負って生きよう。');
        await D('masahiro', '…………。');
        await D('narrator', 'マーシーが崩れ落ちた。声を上げて泣いた。');
        await D('narrator', '25年間溜め込んだ全てが、溢れ出していた。');
      } else {
        await D('nobu', '警察に全て話す。覚悟しろ。');
        await D('masahiro', '……そうか。なら、最後の抵抗をさせてもらう。');
        Flow.setFlag('fights_masahiro');
      }

      // ============================================================
      //  シーン13: 最終決戦 — マーシーとのポケモンバトル（伝説：ミュウ）
      // ============================================================
      if (Flow.hasFlag('fights_masahiro')) {
        await D('masahiro', '最後の勝負だ、のぶん。');
        await D('masahiro', '俺の最後の相棒……全てのポケモンの始祖……ミュウよ、来い！');
        await D('narrator', 'マーシーがモンスターボールを投げた。');
        await D('narrator', '虹色の光と共に……ミュウが現れた！', { sound: 'pokemon_appear', effect: 'flash', flashColor: '#F85888' });
        await D('narrator', '幻のポケモン。全ての遺伝子を持つと言われる始祖。');
        await D('narrator', 'その小さな体から、圧倒的なオーラが放たれている……！');

        // ミュウ生成
        const mew = await GameEngine.PokemonAPI.getPokemon(151);
        mew.name = 'ミュウ';
        mew.level = 80;
        mew.hp = Math.floor(mew.hp * 1.0);
        mew.maxHp = mew.hp;
        mew.atk = Math.floor(mew.atk * 2.0);
        mew.def = Math.floor(mew.def * 1.1);

        // 回復の選択肢
        const choice9 = await C([
          { id: 'heal_final', text: 'ポケモンを手当てする（HP・PP 50%回復）' },
          { id: 'no_heal_final', text: 'そのまま最終決戦に挑む' }
        ]);

        if (choice9 === 'heal_final') {
          GameEngine.Data.state.pokemon.forEach(p => {
            p.hp = Math.min(p.maxHp, p.hp + Math.floor(p.maxHp * 0.5));
            p.moves.forEach(m => { m.pp = Math.min(m.maxPp, m.pp + Math.floor(m.maxPp * 0.5)); });
          });
          GameEngine.Save.save();
          await D('narrator', 'ポケモンたちの傷が少し癒えた。');
        }

        // パーティ選抜
        const aliveForFinal = GameEngine.Data.state.pokemon.filter(p => p.hp > 0);
        if (aliveForFinal.length > 4) {
          await D('narrator', '最終決戦。手持ちのポケモンから、バトルに参加させる4体を選べ。');
          await Flow.selectBattleParty(4);
        } else if (aliveForFinal.length === 0) {
          return Flow.gameOver('戦えるポケモンが一体もいない……。のぶんは敗北した。');
        } else {
          GameEngine.Data.state.selectedParty = aliveForFinal;
        }

        await D('nobu', 'マーシー……これで最後だ！');
        await D('masahiro', '来い、のぶん。俺の全てをぶつけてやる！');

        await Effects.playSound('battle');

        const masahiroBattleResult = await Flow.triggerBattle(mew, 'エディマーシー');

        if (masahiroBattleResult) {
          await D('masahiro', '……負けた、か。', { effect: 'flash', flashColor: '#fff' });
          await D('narrator', 'ミュウが光の粒子となって消えていく。');
          await D('nobu', '終わりだ、マーシー。');
          await D('masahiro', '……ああ。終わりだ。');
          Flow.setFlag('defeated_masahiro');
        } else {
          // バトルに負けた場合
          await D('masahiro', '俺の……勝ちだ……');
          await D('narrator', 'のぶんのポケモンが倒れた。');

          // 選択肢10: 敗北時の行動
          const choice10 = await C([
            { id: 'chase', text: '体を張ってマーシーを止める', setFlag: { chased_masahiro: true } },
            { id: 'call_help', text: '仲間を呼ぶ' },
            { id: 'let_go', text: '見送る', setFlag: { let_masahiro_go: true } }
          ]);

          if (choice10 === 'chase') {
            await D('narrator', 'のぶんは最後の力を振り絞り、マーシーに駆け寄った。');
            await D('nobu', '行かせない……！');
            await D('narrator', 'のぶんがマーシーの腕を掴んだ。');
            await D('masahiro', '離せ、のぶん……！');
            await D('nobu', '離さない。お前は俺の友達だ。たとえ何があっても！');
            await D('masahiro', '…………。');
            await D('narrator', 'マーシーの抵抗が、ゆっくりと弱まった。');
            Flow.setFlag('masahiro_surrendered');
          } else if (choice10 === 'call_help') {
            if (Flow.hasFlag('goes_with_allies') || Flow.hasFlag('backup_arrived')) {
              await D('nobu', 'みんな、マーシーを止めろ！');
              await D('narrator', '仲間たちがマーシーを取り囲んだ。');
              await D('masahiro', '……逃げられないか。');
              Flow.setFlag('masahiro_surrounded');
            } else {
              await D('narrator', '一人で来たのぶんには、呼べる仲間がいなかった。');
              await D('narrator', 'マーシーは霧の中に消えていこうとした。');
              await D('nobu', '待て……！　マーシー……！');
              await D('narrator', 'のぶんは必死に走り、マーシーの服を掴んだ。');
              Flow.setFlag('masahiro_surrendered');
            }
          } else {
            await D('narrator', 'のぶんは動けなかった。');
            await D('narrator', 'マーシーが霧の中に消えていく。');
            await D('nobu', 'マーシー……');
          }
        }
      }

      // ============================================================
      //  シーン14: エンディング分岐
      // ============================================================
      Effects.stopFog();
      await Effects.fadeToBlack(1500);
      await new Promise(r => setTimeout(r, 1000));

      // エンディング判定
      let ending = 'normal';
      if (Flow.hasFlag('forgives_masahiro')) {
        ending = 'true';
      } else if (Flow.hasFlag('defeated_masahiro') && (Flow.hasFlag('goes_with_allies') || Flow.hasFlag('backup_arrived'))) {
        ending = 'true';
      } else if (Flow.hasFlag('defeated_masahiro') || Flow.hasFlag('masahiro_surrendered') || Flow.hasFlag('masahiro_surrounded')) {
        ending = 'good';
      } else if (Flow.hasFlag('let_masahiro_go')) {
        ending = 'sad';
      } else {
        ending = 'good';
      }

      // ============================================================
      //  TRUE END
      // ============================================================
      if (ending === 'true') {
        UI.setBackground('linear-gradient(180deg, #FF6B35 0%, #87CEEB 30%, #4a90d9 60%, #1a0a2e 100%)');
        await Effects.fadeFromBlack(1500);

        await D('narrator', '── TRUE END ──「許しの頂」');

        if (Flow.hasFlag('forgives_masahiro')) {
          await D('masahiro', '……のぶん。お前に、許されるとは思わなかった。');
          await D('nobu', '許すと言っても、罪が消えるわけじゃない。');
          await D('nobu', 'でも、俺たちは前に進まなきゃいけない。25年間、俺たちは過去に囚われていた。');
          await D('nobu', 'もう、終わりにしよう。');
          await D('masahiro', '……ああ。終わりにしよう。');
          await D('narrator', 'マーシーは自ら警察に出頭した。');
          await D('narrator', '裁判の結果、執行猶予付きの判決が下った。');
        } else {
          await D('narrator', 'マーシーは取り押さえられ、警察に引き渡された。');
          await D('narrator', '仲間たちと共に、長い戦いを終えたのぶん。');
          await D('narrator', '全ての真実を知り、それでも仲間を信じたのぶんに、運命は微笑んだ。');
        }

        await D('narrator', '事件から1年後──');
        await D('narrator', 'のぶんたちは、25年前の被害者の少年を訪ねた。');
        await D('narrator', '精神病院の静かな病室。窓から見える景色は、穏やかだった。');
        await D('narrator', '少年──今は中年の男性は、車椅子に座っていた。');
        await D('narrator', 'のぶんたちは、深々と頭を下げた。');
        await D('nobu', '……遅くなりました。本当に、申し訳ありませんでした。');
        await D('narrator', '男性は何も言わなかった。しかし、その目から涙が流れた。');
        await D('narrator', '言葉にならない時間が過ぎた。');
        await D('narrator', 'それでも、何かが変わった。');
        await D('narrator', '長い長い冬が終わり、春が来ようとしていた──。');
        Flow.setFlag('true_ending');

      // ============================================================
      //  GOOD END
      // ============================================================
      } else if (ending === 'good') {
        UI.setBackground('linear-gradient(180deg, #667788 0%, #445566 30%, #223344 60%, #1a0a2e 100%)');
        await Effects.fadeFromBlack(1500);

        await D('narrator', '── GOOD END ──「決着の時」');
        await D('narrator', 'マーシーは逮捕され、全ての罪が明らかになった。');
        await D('narrator', '殺人未遂、傷害、詐欺……罪状は多岐にわたった。');
        await D('narrator', 'かとぱんとよっちんも共犯として裁かれた。');
        await D('narrator', 'マーシーは懲役12年。かとぱんは懲役8年。よっちんは執行猶予付き。');
        await D('narrator', '残された仲間たち──のぶん、デブコーン、ちばぶ、おちぷー──は、');
        await D('narrator', '25年前の被害者の家族に謝罪の手紙を書いた。');
        await D('narrator', '返事は来なかった。しかし、書かなければならなかった。');
        await D('nobu', '（俺たちは、これからも罪を背負って生きていく）');
        await D('nobu', '（でも、逃げることはもうしない）');
        await D('narrator', '富士山が、遠くに見える。');
        await D('narrator', '全てが始まり、全てが終わった場所。');
        await D('narrator', 'そこに、のぶんたちの青春の影が、静かに眠っている──。');
        Flow.setFlag('good_ending');

      // ============================================================
      //  SAD END
      // ============================================================
      } else {
        UI.setBackground('linear-gradient(180deg, #333 0%, #222 30%, #111 60%, #000 100%)');
        await Effects.fadeFromBlack(1500);

        await D('narrator', '── SAD END ──「霧の中へ」');
        await D('narrator', 'マーシーは霧の中に消えていった。');
        await D('narrator', 'のぶんは追わなかった。追えなかった。');
        await D('narrator', '数時間後、マーシーの遺体が崖の下で発見された。');
        await D('narrator', '自ら命を絶ったのだった。');
        await D('narrator', '事件は一応の決着を見たが、真相は完全には明らかにならなかった。');
        await D('narrator', 'のぶんは、全てを失った気がした。');
        await D('narrator', '友人を、信頼を、そして……自分自身の一部を。');
        await D('nobu', '（マーシー……お前を救えなかった）');
        await D('nobu', '（俺たちは……何も変われなかった）');
        await D('narrator', '富士山は、今日も変わらずそこにある。');
        await D('narrator', 'しかし、のぶんの心には、永遠に霧がかかったままだった──。');
        Flow.setFlag('sad_ending');
      }

      // ============================================================
      //  エピローグ — 共通
      // ============================================================
      await Effects.fadeToBlack(1500);
      await new Promise(r => setTimeout(r, 2000));

      UI.setBackground('linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)');
      await Effects.fadeFromBlack(1200);

      await D('narrator', '── エピローグ ──');
      await D('narrator', '富士山は、今日も変わらずそこにある。');
      await D('narrator', '3776メートルの高みから、日本を見守っている。');
      await D('narrator', 'その山肌に刻まれた、彼らの足跡は、やがて風に消えるだろう。');
      await D('narrator', 'しかし、心に刻まれた記憶は、決して消えない。');

      if (Flow.hasFlag('true_ending')) {
        await D('narrator', '許しは、終わりではない。始まりだ。');
        await D('narrator', '傷ついた者も、傷つけた者も、共に前に進む。');
        await D('narrator', 'それが、この物語の結末──');
        await D('narrator', 'そして、新しい物語の始まり。');
      } else if (Flow.hasFlag('good_ending')) {
        await D('narrator', '罪は消えない。しかし、人は変われる。');
        await D('narrator', '残された者たちは、その証明として生きていく。');
      } else {
        await D('narrator', '後悔は、一生消えないだろう。');
        await D('narrator', 'しかし、それでも人は生きていかなければならない。');
      }

      // ============================================================
      //  スタッフクレジット
      // ============================================================
      await Effects.fadeToBlack(2000);
      await new Promise(r => setTimeout(r, 1500));
      UI.setBackground('linear-gradient(180deg, #000 0%, #0a0510 50%, #000 100%)');
      await Effects.fadeFromBlack(1000);

      await D('narrator', '');
      await D('narrator', '「富士山の惨劇 ～幼馴染たちの最後の登山～」');
      await D('narrator', '');
      await D('narrator', '── 完 ──');

      await new Promise(r => setTimeout(r, 2000));

      await D('narrator', '── STAFF CREDIT ──');
      await D('narrator', '');
      await D('narrator', 'ゲームデザイン・シナリオ・プログラム: AI');
      await D('narrator', 'ポケモンデータ: PokeAPI');
      await D('narrator', '');
      await D('narrator', '── CAST ──');
      await D('narrator', 'のぶん（主人公）');
      await D('narrator', 'おちぷー');
      await D('narrator', 'ちばぶ');
      await D('narrator', 'デブコーン');
      await D('narrator', 'よっちん');
      await D('narrator', 'エディマーシー');
      await D('narrator', 'ゆっきん');
      await D('narrator', 'かとぱん');
      await D('narrator', 'ミッキー');
      await D('narrator', '');
      await D('narrator', '── SPECIAL THANKS ──');
      await D('narrator', 'プレイしてくれたあなたへ');
      await D('narrator', '');
      await D('narrator', 'ありがとうございました。', { autoAdvance: 4000 });

      await Effects.fadeToBlack(2000);
      await new Promise(r => setTimeout(r, 2000));

      // ============================================================
      //  ゲーム完了
      // ============================================================
      Flow.chapterComplete('chapter5');
    }
  };

  GameEngine.registerChapter('chapter5', Chapter5Script);
  Chapter5Script.chapterTitle = '終焉の頂';

})();
