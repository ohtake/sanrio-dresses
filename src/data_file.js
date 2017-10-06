export default class DataFile {
  /**
   * @param {string} name File name of data File
   * @param {string} seriesSymbol
   * @param {string} nameJa
   * @param {string} nameEn
   * @param {string} picUrl URL of the image. Use Flickr's Square 150 format.
   */
  constructor(name, seriesSymbol, nameJa, nameEn, picUrl) {
    this.name = name;
    this.seriesSymbol = seriesSymbol;
    this.nameJa = nameJa;
    this.nameEn = nameEn;
    this.picUrl = picUrl;
  }
  /**
   * @returns {string}
   */
  getDisplayName() {
    return `${this.seriesSymbol} ${this.nameJa} (${this.nameEn})`;
  }
}

DataFile.all = [
  DataFile.bnButtonNose = new DataFile('bn-button_nose', 'BN', 'トリシュ', 'Button Nose',
    // https://www.flickr.com/photos/ohtake_tomohiro/9471261149/
    'https://c2.staticflickr.com/4/3743/9471261149_df68d034d2_q.jpg'),
  DataFile.boRibbon = new DataFile('bo-ribbon', 'BO', 'りぼん', 'Bonbonribbon',
    // https://www.flickr.com/photos/ohtake_tomohiro/26615555253/
    'https://c2.staticflickr.com/8/7356/26615555253_f77c7410de_q.jpg'),
  DataFile.cnCinnamon = new DataFile('cn-cinnamon', 'CN', 'シナモン', 'Cinnamon',
    // https://www.flickr.com/photos/ohtake_tomohiro/9544085163/
    'https://c1.staticflickr.com/3/2818/9544085163_5092625ee9_q.jpg'),
  DataFile.coChococat = new DataFile('co-chococat', 'CO', 'チョコキャット', 'Chococat', ''),
  DataFile.cyCharmmy = new DataFile('cy-charmmy', 'CY', 'チャーミー', 'Charmmy Kitty',
    // https://www.flickr.com/photos/ohtake_tomohiro/10671752346/
    'https://c2.staticflickr.com/8/7451/10671752346_15ebdc7e66_q.jpg'),
  DataFile.dnDaniel = new DataFile('dn-daniel', 'DN', 'ダニエル', 'Daniel', ''),
  DataFile.gpGochan = new DataFile('gp-gochan', 'GP', 'ゴーちゃん。', 'Go-chan.',
    // https://www.flickr.com/photos/ohtake_tomohiro/8784705396/
    'https://c2.staticflickr.com/8/7401/8784705396_669ef592b3_q.jpg'),
  DataFile.guGudetama = new DataFile('gu-gudetama', 'GU', 'ぐでたま', 'Gudetama',
    // https://www.flickr.com/photos/ohtake_tomohiro/14834955654/
    'https://c2.staticflickr.com/6/5556/14834955654_c2887b9976_q.jpg'),
  DataFile.jlRuby = new DataFile('jl-ruby', 'JL', 'ルビー', 'Ruby',
    // https://www.flickr.com/photos/ohtake_tomohiro/30901115623/
    'https://c1.staticflickr.com/1/756/30901115623_e7cf5c0feb_q.jpg'),
  DataFile.jlSapphie = new DataFile('jl-sapphie', 'JL', 'サフィー', 'Sapphie',
    // https://www.flickr.com/photos/ohtake_tomohiro/9949531066/
    'https://c2.staticflickr.com/6/5447/9949531066_f8208d0926_q.jpg'),
  DataFile.jlGarnet = new DataFile('jl-garnet', 'JL', 'ガーネット', 'Garnet',
    // https://www.flickr.com/photos/ohtake_tomohiro/14661129166/
    'https://c2.staticflickr.com/4/3898/14661129166_8fbb0740de_q.jpg'),
  DataFile.jlLabra = new DataFile('jl-labra', 'JL', 'ラブラ', 'Labra',
    // https://www.flickr.com/photos/ohtake_tomohiro/11613918416/
    'https://c1.staticflickr.com/3/2823/11613918416_9f08436c62_q.jpg'),
  DataFile.jlAngela = new DataFile('jl-angela', 'JL', 'エンジェラ', 'Angela',
    // https://www.flickr.com/photos/ohtake_tomohiro/9656279138/
    'https://c1.staticflickr.com/3/2864/9656279138_488a2fc3ea_q.jpg'),
  DataFile.jlJasper = new DataFile('jl-jasper', 'JL', 'ジャスパー', 'Jasper',
    // https://www.flickr.com/photos/ohtake_tomohiro/8783847357/
    'https://c2.staticflickr.com/4/3822/8783847357_3ac439a015_q.jpg'),
  DataFile.jlCharotte = new DataFile('jl-charotte', 'JL', 'チャロット', 'Charotte',
    // https://www.flickr.com/photos/ohtake_tomohiro/13899465871/
    'https://c1.staticflickr.com/3/2927/13899465871_44857c623f_q.jpg'),
  DataFile.jlRosa = new DataFile('jl-rosa', 'JL', 'ローサ', 'Rosa',
    // https://www.flickr.com/photos/ohtake_tomohiro/8784665190/
    'https://c2.staticflickr.com/8/7294/8784665190_9f00aa10ca_q.jpg'),
  DataFile.jlLuea = new DataFile('jl-luea', 'JL', 'ルーア', 'Luea',
    // https://www.flickr.com/photos/ohtake_tomohiro/14834580258/
    'https://c2.staticflickr.com/6/5566/14834580258_1bae608a62_q.jpg'),
  DataFile.jlLuna = new DataFile('jl-luna', 'JL', 'ルナ', 'Luna',
    // https://www.flickr.com/photos/ohtake_tomohiro/21704083916/
    'https://c1.staticflickr.com/1/755/21704083916_c4541ac66a_q.jpg'),
  DataFile.jlLarimar = new DataFile('jl-larimar', 'JL', 'ラリマー', 'Larimar',
    // https://www.flickr.com/photos/ohtake_tomohiro/27947731372/
    'https://c2.staticflickr.com/8/7478/27947731372_c2342408de_q.jpg'),
  DataFile.kiKirimi = new DataFile('ki-kirimi', 'KI', 'きりみちゃん', 'Kirimi-chan',
    // https://www.flickr.com/photos/ohtake_tomohiro/22245218264/
    'https://c2.staticflickr.com/6/5758/22245218264_3b78fd1f86_q.jpg'),
  DataFile.kiSaba = new DataFile('ki-saba', 'KI', 'さばくん', 'Saba-kun',
    // https://www.flickr.com/photos/ohtake_tomohiro/16516747738/
    'https://c1.staticflickr.com/9/8581/16516747738_3b48875288_q.jpg'),
  DataFile.kiSame = new DataFile('ki-same', 'KI', 'サメせんぱい', 'Same-senpai',
    // https://www.flickr.com/photos/ohtake_tomohiro/21062320769/
    'https://c2.staticflickr.com/6/5628/21062320769_9cfaa521bd_q.jpg'),
  DataFile.krKeroppi = new DataFile('kr-keroppi', 'KR', 'けろっぴ', 'Keroppi',
    // https://www.flickr.com/photos/ohtake_tomohiro/9899607996/
    'https://c2.staticflickr.com/4/3665/9899607996_06ac4f8fa0_q.jpg'),
  DataFile.ktKitty = new DataFile('kt-kitty', 'KT', 'キティ', 'Kitty',
    // https://www.flickr.com/photos/ohtake_tomohiro/16492066909/
    'https://c1.staticflickr.com/9/8575/16492066909_3fcda0e4e4_q.jpg'),
  DataFile.ktMimmy = new DataFile('kt-mimmy', 'KT', 'ミミィ', 'Mimmy',
    // https://www.flickr.com/photos/ohtake_tomohiro/12611815833/
    'https://c2.staticflickr.com/4/3669/12611815833_3b5df2b753_q.jpg'),
  DataFile.ktGeorge = new DataFile('kt-george', 'KT', 'ジョージ', 'George',
    // https://www.flickr.com/photos/ohtake_tomohiro/11267932706/
    'https://c2.staticflickr.com/8/7412/11267932706_0fa0c3be17_q.jpg'),
  DataFile.ktTinyChum = new DataFile('kt-tiny_chum', 'KT', 'タイニーチャム', 'Tiny Chum',
    // https://www.flickr.com/photos/ohtake_tomohiro/14914616744/
    'https://c2.staticflickr.com/6/5615/14914616744_f9dbf8bb21_q.jpg'),
  DataFile.maMarron = new DataFile('ma-marron', 'MA', 'マロン', 'Marroncream',
    // https://www.flickr.com/photos/ohtake_tomohiro/8920484088/
    'https://c2.staticflickr.com/8/7399/8920484088_2cc2d90ac8_q.jpg'),
  DataFile.mmMelody = new DataFile('mm-melody', 'MM', 'メロディ', 'My Melody',
    // https://www.flickr.com/photos/ohtake_tomohiro/36403930305/
    'https://c1.staticflickr.com/5/4403/36403930305_046b88a615_q.jpg'),
  DataFile.mpPiano = new DataFile('mp-piano', 'MP', 'ピアノ', 'Piano',
    // https://www.flickr.com/photos/ohtake_tomohiro/14516998051/
    'https://c2.staticflickr.com/4/3858/14516998051_193a041d57_q.jpg'),
  DataFile.omMonkichi = new DataFile('om-monkichi', 'OM', 'もんきち', 'Monkichi',
    // https://www.flickr.com/photos/ohtake_tomohiro/8815679895/
    'https://c2.staticflickr.com/8/7321/8815679895_2d371a9d73_q.jpg'),
  DataFile.pcPochacco = new DataFile('pc-pochacco', 'PC', 'ポチャッコ', 'Pochacco',
    // https://www.flickr.com/photos/ohtake_tomohiro/14753386901/
    'https://c1.staticflickr.com/3/2901/14753386901_f334102638_q.jpg'),
  DataFile.pnPurin = new DataFile('pn-purin', 'PN', 'プリン', 'Pompompurin',
    // https://www.flickr.com/photos/ohtake_tomohiro/14771707617/
    'https://c2.staticflickr.com/4/3861/14771707617_2f9f4d367e_q.jpg'),
  DataFile.siMomohana = new DataFile('si-momohana', 'SI', 'ももうさ・はなうさ', 'Momousa & Hanausa',
    // https://www.flickr.com/photos/ohtake_tomohiro/10113617364/
    'https://c2.staticflickr.com/4/3672/10113617364_3746095a60_q.jpg'),
  DataFile.tfTurfy = new DataFile('tf-turfy', 'TF', 'ターフィー', 'Turfy',
    // https://www.flickr.com/photos/ohtake_tomohiro/26537496203/
    'https://c2.staticflickr.com/8/7723/26537496203_32e46680ca_q.jpg'),
  DataFile.tpTinyPoem = new DataFile('tp-tiny_poem', 'TP', 'さっちゃん', 'Tiny Poem',
    // https://www.flickr.com/photos/ohtake_tomohiro/10495659564/
    'https://c2.staticflickr.com/8/7390/10495659564_ab4960f63f_q.jpg'),
  DataFile.tsKikiLala = new DataFile('ts-kikilala', 'TS', 'キキ・ララ', 'Kiki & Lala',
    // https://www.flickr.com/photos/ohtake_tomohiro/34278547216/
    'https://c1.staticflickr.com/3/2853/34278547216_91403ea35f_q.jpg'),
  DataFile.txSam = new DataFile('tx-sam', 'TX', 'サム', 'Tuxedo Sam',
    // https://www.flickr.com/photos/ohtake_tomohiro/8794417176/
    'https://c2.staticflickr.com/6/5466/8794417176_313c011089_q.jpg'),
  DataFile.usUsahana = new DataFile('us-usahana', 'US', 'ウサハナ', 'Usahana',
    // https://www.flickr.com/photos/ohtake_tomohiro/35231231671/
    'https://c1.staticflickr.com/5/4245/35231231671_32d4e72ea1_q.jpg'),
  DataFile.usUsahana = new DataFile('va-eddy_emmy', 'VA', 'エディ・エミィ', 'Eddy & Emmy',
    // https://www.flickr.com/photos/ohtake_tomohiro/11267998663/
    'https://c2.staticflickr.com/6/5472/11267998663_4c1c04d0b0_q.jpg'),
  DataFile.wiMell = new DataFile('wi-mell', 'WI', 'メル', 'Mell',
    // https://www.flickr.com/photos/ohtake_tomohiro/15033242479/
    'https://c2.staticflickr.com/4/3883/15033242479_45ded95457_q.jpg'),
  DataFile.xoBadtzmaru = new DataFile('xo-badtzmaru', 'XO', 'ばつ丸', 'Badtz-Maru',
    // https://www.flickr.com/photos/ohtake_tomohiro/11150739286/
    'https://c2.staticflickr.com/6/5477/11150739286_bc5251bf3d_q.jpg'),
  DataFile.xoTsunko = new DataFile('xo-tsunko', 'XO', 'つん子', 'Tsunko',
    // https://www.flickr.com/photos/ohtake_tomohiro/14045681142/
    'https://c2.staticflickr.com/6/5270/14045681142_bb5acc9708_q.jpg'),
  DataFile.xoPandaba = new DataFile('xo-pandaba', 'XO', 'パンダバ', 'Pandaba',
    // https://www.flickr.com/photos/ohtake_tomohiro/11486667956/
    'https://c2.staticflickr.com/4/3686/11486667956_5bddc54c75_q.jpg'),
];

const map = {};
DataFile.all.forEach((df) => {
  map[df.name] = df;
});
/**
 * @param {string} name e.g. kt-kitty
 * @returns {DataFile}
 */
DataFile.findByName = name => map[name];
