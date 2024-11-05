// Generated from ./dsl/grammar/LacLang.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { LexerATNSimulator } from 'antlr4ts/atn/LexerATNSimulator';
import { CharStream } from 'antlr4ts/CharStream';
import { Lexer } from 'antlr4ts/Lexer';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

export class LacLangLexer extends Lexer {
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;
  public static readonly T__2 = 3;
  public static readonly T__3 = 4;
  public static readonly T__4 = 5;
  public static readonly T__5 = 6;
  public static readonly T__6 = 7;
  public static readonly T__7 = 8;
  public static readonly T__8 = 9;
  public static readonly T__9 = 10;
  public static readonly T__10 = 11;
  public static readonly T__11 = 12;
  public static readonly T__12 = 13;
  public static readonly T__13 = 14;
  public static readonly T__14 = 15;
  public static readonly T__15 = 16;
  public static readonly T__16 = 17;
  public static readonly T__17 = 18;
  public static readonly ADDRESS_LITERAL = 19;
  public static readonly BOOL_LITERAL = 20;
  public static readonly NUMBER_LITERAL = 21;
  public static readonly STRING_LITERAL = 22;
  public static readonly BYTES_LITERAL = 23;
  public static readonly IDENTIFIER = 24;
  public static readonly WHITESPACE = 25;
  public static readonly COMMENT = 26;

  // tslint:disable:no-trailing-whitespace
  public static readonly channelNames: string[] = [
    'DEFAULT_TOKEN_CHANNEL',
    'HIDDEN',
  ];

  // tslint:disable:no-trailing-whitespace
  public static readonly modeNames: string[] = ['DEFAULT_MODE'];

  public static readonly ruleNames: string[] = [
    'T__0',
    'T__1',
    'T__2',
    'T__3',
    'T__4',
    'T__5',
    'T__6',
    'T__7',
    'T__8',
    'T__9',
    'T__10',
    'T__11',
    'T__12',
    'T__13',
    'T__14',
    'T__15',
    'T__16',
    'T__17',
    'ADDRESS_LITERAL',
    'HEX_DIGIT',
    'BOOL_LITERAL',
    'NUMBER_LITERAL',
    'STRING_LITERAL',
    'BYTES_LITERAL',
    'IDENTIFIER',
    'WHITESPACE',
    'COMMENT',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'var'",
    "';'",
    "'constant'",
    "'='",
    "'artifact'",
    "'instance'",
    "'of'",
    "'takes'",
    "'('",
    "')'",
    "'with'",
    "'evaluate'",
    "'bool'",
    "'number'",
    "'string'",
    "'bytes'",
    "'address'",
    "','",
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'ADDRESS_LITERAL',
    'BOOL_LITERAL',
    'NUMBER_LITERAL',
    'STRING_LITERAL',
    'BYTES_LITERAL',
    'IDENTIFIER',
    'WHITESPACE',
    'COMMENT',
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    LacLangLexer._LITERAL_NAMES,
    LacLangLexer._SYMBOLIC_NAMES,
    [],
  );

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return LacLangLexer.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  constructor(input: CharStream) {
    super(input);
    this._interp = new LexerATNSimulator(LacLangLexer._ATN, this);
  }

  // @Override
  public get grammarFileName(): string {
    return 'LacLang.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return LacLangLexer.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return LacLangLexer._serializedATN;
  }

  // @Override
  public get channelNames(): string[] {
    return LacLangLexer.channelNames;
  }

  // @Override
  public get modeNames(): string[] {
    return LacLangLexer.modeNames;
  }

  public static readonly _serializedATN: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x1C\u0103\b\x01' +
    '\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06' +
    '\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r' +
    '\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t' +
    '\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t' +
    '\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t' +
    '\x1C\x03\x02\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03' +
    '\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03' +
    '\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03' +
    '\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03' +
    '\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\v\x03' +
    '\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03' +
    '\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F' +
    '\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11' +
    '\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13' +
    '\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14' +
    '\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14' +
    '\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14' +
    '\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14' +
    '\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14' +
    '\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16' +
    '\x03\x16\x03\x16\x05\x16\xD2\n\x16\x03\x17\x06\x17\xD5\n\x17\r\x17\x0E' +
    '\x17\xD6\x03\x18\x03\x18\x07\x18\xDB\n\x18\f\x18\x0E\x18\xDE\v\x18\x03' +
    '\x18\x03\x18\x03\x19\x03\x19\x07\x19\xE4\n\x19\f\x19\x0E\x19\xE7\v\x19' +
    '\x03\x19\x03\x19\x03\x1A\x03\x1A\x07\x1A\xED\n\x1A\f\x1A\x0E\x1A\xF0\v' +
    '\x1A\x03\x1B\x06\x1B\xF3\n\x1B\r\x1B\x0E\x1B\xF4\x03\x1B\x03\x1B\x03\x1C' +
    '\x03\x1C\x03\x1C\x03\x1C\x07\x1C\xFD\n\x1C\f\x1C\x0E\x1C\u0100\v\x1C\x03' +
    '\x1C\x03\x1C\x04\xDC\xE5\x02\x02\x1D\x03\x02\x03\x05\x02\x04\x07\x02\x05' +
    '\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17' +
    '\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13' +
    "%\x02\x14'\x02\x15)\x02\x02+\x02\x16-\x02\x17/\x02\x181\x02\x193\x02" +
    '\x1A5\x02\x1B7\x02\x1C\x03\x02\b\x05\x022;CHch\x03\x022;\x05\x02C\\aa' +
    'c|\x06\x022;C\\aac|\x05\x02\v\f\x0F\x0F""\x04\x02\f\f\x0F\x0F\x02\u0108' +
    '\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02' +
    '\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02' +
    '\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02' +
    '\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02' +
    '\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02' +
    "!\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02'\x03" +
    '\x02\x02\x02\x02+\x03\x02\x02\x02\x02-\x03\x02\x02\x02\x02/\x03\x02\x02' +
    '\x02\x021\x03\x02\x02\x02\x023\x03\x02\x02\x02\x025\x03\x02\x02\x02\x02' +
    '7\x03\x02\x02\x02\x039\x03\x02\x02\x02\x05=\x03\x02\x02\x02\x07?\x03\x02' +
    '\x02\x02\tH\x03\x02\x02\x02\vJ\x03\x02\x02\x02\rS\x03\x02\x02\x02\x0F' +
    '\\\x03\x02\x02\x02\x11_\x03\x02\x02\x02\x13e\x03\x02\x02\x02\x15g\x03' +
    '\x02\x02\x02\x17i\x03\x02\x02\x02\x19n\x03\x02\x02\x02\x1Bw\x03\x02\x02' +
    '\x02\x1D|\x03\x02\x02\x02\x1F\x83\x03\x02\x02\x02!\x8A\x03\x02\x02\x02' +
    "#\x90\x03\x02\x02\x02%\x98\x03\x02\x02\x02'\x9A\x03\x02\x02\x02)\xC6" +
    '\x03\x02\x02\x02+\xD1\x03\x02\x02\x02-\xD4\x03\x02\x02\x02/\xD8\x03\x02' +
    '\x02\x021\xE1\x03\x02\x02\x023\xEA\x03\x02\x02\x025\xF2\x03\x02\x02\x02' +
    '7\xF8\x03\x02\x02\x029:\x07x\x02\x02:;\x07c\x02\x02;<\x07t\x02\x02<\x04' +
    '\x03\x02\x02\x02=>\x07=\x02\x02>\x06\x03\x02\x02\x02?@\x07e\x02\x02@A' +
    '\x07q\x02\x02AB\x07p\x02\x02BC\x07u\x02\x02CD\x07v\x02\x02DE\x07c\x02' +
    '\x02EF\x07p\x02\x02FG\x07v\x02\x02G\b\x03\x02\x02\x02HI\x07?\x02\x02I' +
    '\n\x03\x02\x02\x02JK\x07c\x02\x02KL\x07t\x02\x02LM\x07v\x02\x02MN\x07' +
    'k\x02\x02NO\x07h\x02\x02OP\x07c\x02\x02PQ\x07e\x02\x02QR\x07v\x02\x02' +
    'R\f\x03\x02\x02\x02ST\x07k\x02\x02TU\x07p\x02\x02UV\x07u\x02\x02VW\x07' +
    'v\x02\x02WX\x07c\x02\x02XY\x07p\x02\x02YZ\x07e\x02\x02Z[\x07g\x02\x02' +
    '[\x0E\x03\x02\x02\x02\\]\x07q\x02\x02]^\x07h\x02\x02^\x10\x03\x02\x02' +
    '\x02_`\x07v\x02\x02`a\x07c\x02\x02ab\x07m\x02\x02bc\x07g\x02\x02cd\x07' +
    'u\x02\x02d\x12\x03\x02\x02\x02ef\x07*\x02\x02f\x14\x03\x02\x02\x02gh\x07' +
    '+\x02\x02h\x16\x03\x02\x02\x02ij\x07y\x02\x02jk\x07k\x02\x02kl\x07v\x02' +
    '\x02lm\x07j\x02\x02m\x18\x03\x02\x02\x02no\x07g\x02\x02op\x07x\x02\x02' +
    'pq\x07c\x02\x02qr\x07n\x02\x02rs\x07w\x02\x02st\x07c\x02\x02tu\x07v\x02' +
    '\x02uv\x07g\x02\x02v\x1A\x03\x02\x02\x02wx\x07d\x02\x02xy\x07q\x02\x02' +
    'yz\x07q\x02\x02z{\x07n\x02\x02{\x1C\x03\x02\x02\x02|}\x07p\x02\x02}~\x07' +
    'w\x02\x02~\x7F\x07o\x02\x02\x7F\x80\x07d\x02\x02\x80\x81\x07g\x02\x02' +
    '\x81\x82\x07t\x02\x02\x82\x1E\x03\x02\x02\x02\x83\x84\x07u\x02\x02\x84' +
    '\x85\x07v\x02\x02\x85\x86\x07t\x02\x02\x86\x87\x07k\x02\x02\x87\x88\x07' +
    'p\x02\x02\x88\x89\x07i\x02\x02\x89 \x03\x02\x02\x02\x8A\x8B\x07d\x02\x02' +
    '\x8B\x8C\x07{\x02\x02\x8C\x8D\x07v\x02\x02\x8D\x8E\x07g\x02\x02\x8E\x8F' +
    '\x07u\x02\x02\x8F"\x03\x02\x02\x02\x90\x91\x07c\x02\x02\x91\x92\x07f' +
    '\x02\x02\x92\x93\x07f\x02\x02\x93\x94\x07t\x02\x02\x94\x95\x07g\x02\x02' +
    '\x95\x96\x07u\x02\x02\x96\x97\x07u\x02\x02\x97$\x03\x02\x02\x02\x98\x99' +
    '\x07.\x02\x02\x99&\x03\x02\x02\x02\x9A\x9B\x072\x02\x02\x9B\x9C\x07z\x02' +
    '\x02\x9C\x9D\x03\x02\x02\x02\x9D\x9E\x05)\x15\x02\x9E\x9F\x05)\x15\x02' +
    '\x9F\xA0\x05)\x15\x02\xA0\xA1\x05)\x15\x02\xA1\xA2\x05)\x15\x02\xA2\xA3' +
    '\x05)\x15\x02\xA3\xA4\x05)\x15\x02\xA4\xA5\x05)\x15\x02\xA5\xA6\x05)\x15' +
    '\x02\xA6\xA7\x05)\x15\x02\xA7\xA8\x05)\x15\x02\xA8\xA9\x05)\x15\x02\xA9' +
    '\xAA\x05)\x15\x02\xAA\xAB\x05)\x15\x02\xAB\xAC\x05)\x15\x02\xAC\xAD\x05' +
    ')\x15\x02\xAD\xAE\x05)\x15\x02\xAE\xAF\x05)\x15\x02\xAF\xB0\x05)\x15\x02' +
    '\xB0\xB1\x05)\x15\x02\xB1\xB2\x05)\x15\x02\xB2\xB3\x05)\x15\x02\xB3\xB4' +
    '\x05)\x15\x02\xB4\xB5\x05)\x15\x02\xB5\xB6\x05)\x15\x02\xB6\xB7\x05)\x15' +
    '\x02\xB7\xB8\x05)\x15\x02\xB8\xB9\x05)\x15\x02\xB9\xBA\x05)\x15\x02\xBA' +
    '\xBB\x05)\x15\x02\xBB\xBC\x05)\x15\x02\xBC\xBD\x05)\x15\x02\xBD\xBE\x05' +
    ')\x15\x02\xBE\xBF\x05)\x15\x02\xBF\xC0\x05)\x15\x02\xC0\xC1\x05)\x15\x02' +
    '\xC1\xC2\x05)\x15\x02\xC2\xC3\x05)\x15\x02\xC3\xC4\x05)\x15\x02\xC4\xC5' +
    '\x05)\x15\x02\xC5(\x03\x02\x02\x02\xC6\xC7\t\x02\x02\x02\xC7*\x03\x02' +
    '\x02\x02\xC8\xC9\x07v\x02\x02\xC9\xCA\x07t\x02\x02\xCA\xCB\x07w\x02\x02' +
    '\xCB\xD2\x07g\x02\x02\xCC\xCD\x07h\x02\x02\xCD\xCE\x07c\x02\x02\xCE\xCF' +
    '\x07n\x02\x02\xCF\xD0\x07u\x02\x02\xD0\xD2\x07g\x02\x02\xD1\xC8\x03\x02' +
    '\x02\x02\xD1\xCC\x03\x02\x02\x02\xD2,\x03\x02\x02\x02\xD3\xD5\t\x03\x02' +
    '\x02\xD4\xD3\x03\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6\xD4\x03\x02\x02' +
    '\x02\xD6\xD7\x03\x02\x02\x02\xD7.\x03\x02\x02\x02\xD8\xDC\x07$\x02\x02' +
    '\xD9\xDB\v\x02\x02\x02\xDA\xD9\x03\x02\x02\x02\xDB\xDE\x03\x02\x02\x02' +
    '\xDC\xDD\x03\x02\x02\x02\xDC\xDA\x03\x02\x02\x02\xDD\xDF\x03\x02\x02\x02' +
    '\xDE\xDC\x03\x02\x02\x02\xDF\xE0\x07$\x02\x02\xE00\x03\x02\x02\x02\xE1' +
    '\xE5\x07)\x02\x02\xE2\xE4\v\x02\x02\x02\xE3\xE2\x03\x02\x02\x02\xE4\xE7' +
    '\x03\x02\x02\x02\xE5\xE6\x03\x02\x02\x02\xE5\xE3\x03\x02\x02\x02\xE6\xE8' +
    '\x03\x02\x02\x02\xE7\xE5\x03\x02\x02\x02\xE8\xE9\x07)\x02\x02\xE92\x03' +
    '\x02\x02\x02\xEA\xEE\t\x04\x02\x02\xEB\xED\t\x05\x02\x02\xEC\xEB\x03\x02' +
    '\x02\x02\xED\xF0\x03\x02\x02\x02\xEE\xEC\x03\x02\x02\x02\xEE\xEF\x03\x02' +
    '\x02\x02\xEF4\x03\x02\x02\x02\xF0\xEE\x03\x02\x02\x02\xF1\xF3\t\x06\x02' +
    '\x02\xF2\xF1\x03\x02\x02\x02\xF3\xF4\x03\x02\x02\x02\xF4\xF2\x03\x02\x02' +
    '\x02\xF4\xF5\x03\x02\x02\x02\xF5\xF6\x03\x02\x02\x02\xF6\xF7\b\x1B\x02' +
    '\x02\xF76\x03\x02\x02\x02\xF8\xF9\x071\x02\x02\xF9\xFA\x071\x02\x02\xFA' +
    '\xFE\x03\x02\x02\x02\xFB\xFD\n\x07\x02\x02\xFC\xFB\x03\x02\x02\x02\xFD' +
    '\u0100\x03\x02\x02\x02\xFE\xFC\x03\x02\x02\x02\xFE\xFF\x03\x02\x02\x02' +
    '\xFF\u0101\x03\x02\x02\x02\u0100\xFE\x03\x02\x02\x02\u0101\u0102\b\x1C' +
    '\x02\x02\u01028\x03\x02\x02\x02\n\x02\xD1\xD6\xDC\xE5\xEE\xF4\xFE\x03' +
    '\b\x02\x02';
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!LacLangLexer.__ATN) {
      LacLangLexer.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(LacLangLexer._serializedATN),
      );
    }

    return LacLangLexer.__ATN;
  }
}
