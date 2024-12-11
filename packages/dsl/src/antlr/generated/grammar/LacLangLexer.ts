// Generated from ./grammar/LacLang.g4 by ANTLR 4.9.0-SNAPSHOT

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
  public static readonly T__18 = 19;
  public static readonly T__19 = 20;
  public static readonly T__20 = 21;
  public static readonly T__21 = 22;
  public static readonly ADDRESS_LITERAL = 23;
  public static readonly BOOL_LITERAL = 24;
  public static readonly NUMBER_LITERAL = 25;
  public static readonly STRING_LITERAL = 26;
  public static readonly BYTES_LITERAL = 27;
  public static readonly IDENTIFIER = 28;
  public static readonly WHITESPACE = 29;
  public static readonly COMMENT = 30;

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
    'T__18',
    'T__19',
    'T__20',
    'T__21',
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
    "'import'",
    "';'",
    "'pragma'",
    "'injected-only'",
    "'var'",
    "'inject'",
    "'('",
    "')'",
    "'constant'",
    "'='",
    "'artifact'",
    "'instance'",
    "'of'",
    "'takes'",
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
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02 \u012E\b\x01' +
    '\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06' +
    '\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r' +
    '\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t' +
    '\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t' +
    '\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t' +
    '\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x03\x02\x03\x02' +
    '\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04' +
    '\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05' +
    '\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05' +
    '\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07' +
    '\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\n\x03' +
    '\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03' +
    '\f\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03' +
    '\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F' +
    '\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11' +
    '\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12' +
    '\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13' +
    '\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15' +
    '\x03\x15\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16' +
    '\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18' +
    '\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18' +
    '\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18' +
    '\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18' +
    '\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18' +
    '\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A' +
    '\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\xFD\n\x1A\x03' +
    '\x1B\x06\x1B\u0100\n\x1B\r\x1B\x0E\x1B\u0101\x03\x1C\x03\x1C\x07\x1C\u0106' +
    '\n\x1C\f\x1C\x0E\x1C\u0109\v\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x07\x1D' +
    '\u010F\n\x1D\f\x1D\x0E\x1D\u0112\v\x1D\x03\x1D\x03\x1D\x03\x1E\x03\x1E' +
    '\x07\x1E\u0118\n\x1E\f\x1E\x0E\x1E\u011B\v\x1E\x03\x1F\x06\x1F\u011E\n' +
    '\x1F\r\x1F\x0E\x1F\u011F\x03\x1F\x03\x1F\x03 \x03 \x03 \x03 \x07 \u0128' +
    '\n \f \x0E \u012B\v \x03 \x03 \x04\u0107\u0110\x02\x02!\x03\x02\x03\x05' +
    '\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13' +
    '\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02' +
    "\x11!\x02\x12#\x02\x13%\x02\x14'\x02\x15)\x02\x16+\x02\x17-\x02\x18/" +
    '\x02\x191\x02\x023\x02\x1A5\x02\x1B7\x02\x1C9\x02\x1D;\x02\x1E=\x02\x1F' +
    '?\x02 \x03\x02\b\x05\x022;CHch\x03\x022;\x05\x02C\\aac|\x06\x022;C\\a' +
    'ac|\x05\x02\v\f\x0F\x0F""\x04\x02\f\f\x0F\x0F\x02\u0133\x02\x03\x03' +
    '\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03' +
    '\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02' +
    '\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02' +
    '\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02' +
    '\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02!\x03\x02' +
    "\x02\x02\x02#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02'\x03\x02\x02\x02" +
    '\x02)\x03\x02\x02\x02\x02+\x03\x02\x02\x02\x02-\x03\x02\x02\x02\x02/\x03' +
    '\x02\x02\x02\x023\x03\x02\x02\x02\x025\x03\x02\x02\x02\x027\x03\x02\x02' +
    '\x02\x029\x03\x02\x02\x02\x02;\x03\x02\x02\x02\x02=\x03\x02\x02\x02\x02' +
    '?\x03\x02\x02\x02\x03A\x03\x02\x02\x02\x05H\x03\x02\x02\x02\x07J\x03\x02' +
    '\x02\x02\tQ\x03\x02\x02\x02\v_\x03\x02\x02\x02\rc\x03\x02\x02\x02\x0F' +
    'j\x03\x02\x02\x02\x11l\x03\x02\x02\x02\x13n\x03\x02\x02\x02\x15w\x03\x02' +
    '\x02\x02\x17y\x03\x02\x02\x02\x19\x82\x03\x02\x02\x02\x1B\x8B\x03\x02' +
    '\x02\x02\x1D\x8E\x03\x02\x02\x02\x1F\x94\x03\x02\x02\x02!\x99\x03\x02' +
    "\x02\x02#\xA2\x03\x02\x02\x02%\xA7\x03\x02\x02\x02'\xAE\x03\x02\x02\x02" +
    ')\xB5\x03\x02\x02\x02+\xBB\x03\x02\x02\x02-\xC3\x03\x02\x02\x02/\xC5\x03' +
    '\x02\x02\x021\xF1\x03\x02\x02\x023\xFC\x03\x02\x02\x025\xFF\x03\x02\x02' +
    '\x027\u0103\x03\x02\x02\x029\u010C\x03\x02\x02\x02;\u0115\x03\x02\x02' +
    '\x02=\u011D\x03\x02\x02\x02?\u0123\x03\x02\x02\x02AB\x07k\x02\x02BC\x07' +
    'o\x02\x02CD\x07r\x02\x02DE\x07q\x02\x02EF\x07t\x02\x02FG\x07v\x02\x02' +
    'G\x04\x03\x02\x02\x02HI\x07=\x02\x02I\x06\x03\x02\x02\x02JK\x07r\x02\x02' +
    'KL\x07t\x02\x02LM\x07c\x02\x02MN\x07i\x02\x02NO\x07o\x02\x02OP\x07c\x02' +
    '\x02P\b\x03\x02\x02\x02QR\x07k\x02\x02RS\x07p\x02\x02ST\x07l\x02\x02T' +
    'U\x07g\x02\x02UV\x07e\x02\x02VW\x07v\x02\x02WX\x07g\x02\x02XY\x07f\x02' +
    '\x02YZ\x07/\x02\x02Z[\x07q\x02\x02[\\\x07p\x02\x02\\]\x07n\x02\x02]^\x07' +
    '{\x02\x02^\n\x03\x02\x02\x02_`\x07x\x02\x02`a\x07c\x02\x02ab\x07t\x02' +
    '\x02b\f\x03\x02\x02\x02cd\x07k\x02\x02de\x07p\x02\x02ef\x07l\x02\x02f' +
    'g\x07g\x02\x02gh\x07e\x02\x02hi\x07v\x02\x02i\x0E\x03\x02\x02\x02jk\x07' +
    '*\x02\x02k\x10\x03\x02\x02\x02lm\x07+\x02\x02m\x12\x03\x02\x02\x02no\x07' +
    'e\x02\x02op\x07q\x02\x02pq\x07p\x02\x02qr\x07u\x02\x02rs\x07v\x02\x02' +
    'st\x07c\x02\x02tu\x07p\x02\x02uv\x07v\x02\x02v\x14\x03\x02\x02\x02wx\x07' +
    '?\x02\x02x\x16\x03\x02\x02\x02yz\x07c\x02\x02z{\x07t\x02\x02{|\x07v\x02' +
    '\x02|}\x07k\x02\x02}~\x07h\x02\x02~\x7F\x07c\x02\x02\x7F\x80\x07e\x02' +
    '\x02\x80\x81\x07v\x02\x02\x81\x18\x03\x02\x02\x02\x82\x83\x07k\x02\x02' +
    '\x83\x84\x07p\x02\x02\x84\x85\x07u\x02\x02\x85\x86\x07v\x02\x02\x86\x87' +
    '\x07c\x02\x02\x87\x88\x07p\x02\x02\x88\x89\x07e\x02\x02\x89\x8A\x07g\x02' +
    '\x02\x8A\x1A\x03\x02\x02\x02\x8B\x8C\x07q\x02\x02\x8C\x8D\x07h\x02\x02' +
    '\x8D\x1C\x03\x02\x02\x02\x8E\x8F\x07v\x02\x02\x8F\x90\x07c\x02\x02\x90' +
    '\x91\x07m\x02\x02\x91\x92\x07g\x02\x02\x92\x93\x07u\x02\x02\x93\x1E\x03' +
    '\x02\x02\x02\x94\x95\x07y\x02\x02\x95\x96\x07k\x02\x02\x96\x97\x07v\x02' +
    '\x02\x97\x98\x07j\x02\x02\x98 \x03\x02\x02\x02\x99\x9A\x07g\x02\x02\x9A' +
    '\x9B\x07x\x02\x02\x9B\x9C\x07c\x02\x02\x9C\x9D\x07n\x02\x02\x9D\x9E\x07' +
    'w\x02\x02\x9E\x9F\x07c\x02\x02\x9F\xA0\x07v\x02\x02\xA0\xA1\x07g\x02\x02' +
    '\xA1"\x03\x02\x02\x02\xA2\xA3\x07d\x02\x02\xA3\xA4\x07q\x02\x02\xA4\xA5' +
    '\x07q\x02\x02\xA5\xA6\x07n\x02\x02\xA6$\x03\x02\x02\x02\xA7\xA8\x07p\x02' +
    '\x02\xA8\xA9\x07w\x02\x02\xA9\xAA\x07o\x02\x02\xAA\xAB\x07d\x02\x02\xAB' +
    '\xAC\x07g\x02\x02\xAC\xAD\x07t\x02\x02\xAD&\x03\x02\x02\x02\xAE\xAF\x07' +
    'u\x02\x02\xAF\xB0\x07v\x02\x02\xB0\xB1\x07t\x02\x02\xB1\xB2\x07k\x02\x02' +
    '\xB2\xB3\x07p\x02\x02\xB3\xB4\x07i\x02\x02\xB4(\x03\x02\x02\x02\xB5\xB6' +
    '\x07d\x02\x02\xB6\xB7\x07{\x02\x02\xB7\xB8\x07v\x02\x02\xB8\xB9\x07g\x02' +
    '\x02\xB9\xBA\x07u\x02\x02\xBA*\x03\x02\x02\x02\xBB\xBC\x07c\x02\x02\xBC' +
    '\xBD\x07f\x02\x02\xBD\xBE\x07f\x02\x02\xBE\xBF\x07t\x02\x02\xBF\xC0\x07' +
    'g\x02\x02\xC0\xC1\x07u\x02\x02\xC1\xC2\x07u\x02\x02\xC2,\x03\x02\x02\x02' +
    '\xC3\xC4\x07.\x02\x02\xC4.\x03\x02\x02\x02\xC5\xC6\x072\x02\x02\xC6\xC7' +
    '\x07z\x02\x02\xC7\xC8\x03\x02\x02\x02\xC8\xC9\x051\x19\x02\xC9\xCA\x05' +
    '1\x19\x02\xCA\xCB\x051\x19\x02\xCB\xCC\x051\x19\x02\xCC\xCD\x051\x19\x02' +
    '\xCD\xCE\x051\x19\x02\xCE\xCF\x051\x19\x02\xCF\xD0\x051\x19\x02\xD0\xD1' +
    '\x051\x19\x02\xD1\xD2\x051\x19\x02\xD2\xD3\x051\x19\x02\xD3\xD4\x051\x19' +
    '\x02\xD4\xD5\x051\x19\x02\xD5\xD6\x051\x19\x02\xD6\xD7\x051\x19\x02\xD7' +
    '\xD8\x051\x19\x02\xD8\xD9\x051\x19\x02\xD9\xDA\x051\x19\x02\xDA\xDB\x05' +
    '1\x19\x02\xDB\xDC\x051\x19\x02\xDC\xDD\x051\x19\x02\xDD\xDE\x051\x19\x02' +
    '\xDE\xDF\x051\x19\x02\xDF\xE0\x051\x19\x02\xE0\xE1\x051\x19\x02\xE1\xE2' +
    '\x051\x19\x02\xE2\xE3\x051\x19\x02\xE3\xE4\x051\x19\x02\xE4\xE5\x051\x19' +
    '\x02\xE5\xE6\x051\x19\x02\xE6\xE7\x051\x19\x02\xE7\xE8\x051\x19\x02\xE8' +
    '\xE9\x051\x19\x02\xE9\xEA\x051\x19\x02\xEA\xEB\x051\x19\x02\xEB\xEC\x05' +
    '1\x19\x02\xEC\xED\x051\x19\x02\xED\xEE\x051\x19\x02\xEE\xEF\x051\x19\x02' +
    '\xEF\xF0\x051\x19\x02\xF00\x03\x02\x02\x02\xF1\xF2\t\x02\x02\x02\xF22' +
    '\x03\x02\x02\x02\xF3\xF4\x07v\x02\x02\xF4\xF5\x07t\x02\x02\xF5\xF6\x07' +
    'w\x02\x02\xF6\xFD\x07g\x02\x02\xF7\xF8\x07h\x02\x02\xF8\xF9\x07c\x02\x02' +
    '\xF9\xFA\x07n\x02\x02\xFA\xFB\x07u\x02\x02\xFB\xFD\x07g\x02\x02\xFC\xF3' +
    '\x03\x02\x02\x02\xFC\xF7\x03\x02\x02\x02\xFD4\x03\x02\x02\x02\xFE\u0100' +
    '\t\x03\x02\x02\xFF\xFE\x03\x02\x02\x02\u0100\u0101\x03\x02\x02\x02\u0101' +
    '\xFF\x03\x02\x02\x02\u0101\u0102\x03\x02\x02\x02\u01026\x03\x02\x02\x02' +
    '\u0103\u0107\x07$\x02\x02\u0104\u0106\v\x02\x02\x02\u0105\u0104\x03\x02' +
    '\x02\x02\u0106\u0109\x03\x02\x02\x02\u0107\u0108\x03\x02\x02\x02\u0107' +
    '\u0105\x03\x02\x02\x02\u0108\u010A\x03\x02\x02\x02\u0109\u0107\x03\x02' +
    '\x02\x02\u010A\u010B\x07$\x02\x02\u010B8\x03\x02\x02\x02\u010C\u0110\x07' +
    ')\x02\x02\u010D\u010F\v\x02\x02\x02\u010E\u010D\x03\x02\x02\x02\u010F' +
    '\u0112\x03\x02\x02\x02\u0110\u0111\x03\x02\x02\x02\u0110\u010E\x03\x02' +
    '\x02\x02\u0111\u0113\x03\x02\x02\x02\u0112\u0110\x03\x02\x02\x02\u0113' +
    '\u0114\x07)\x02\x02\u0114:\x03\x02\x02\x02\u0115\u0119\t\x04\x02\x02\u0116' +
    '\u0118\t\x05\x02\x02\u0117\u0116\x03\x02\x02\x02\u0118\u011B\x03\x02\x02' +
    '\x02\u0119\u0117\x03\x02\x02\x02\u0119\u011A\x03\x02\x02\x02\u011A<\x03' +
    '\x02\x02\x02\u011B\u0119\x03\x02\x02\x02\u011C\u011E\t\x06\x02\x02\u011D' +
    '\u011C\x03\x02\x02\x02\u011E\u011F\x03\x02\x02\x02\u011F\u011D\x03\x02' +
    '\x02\x02\u011F\u0120\x03\x02\x02\x02\u0120\u0121\x03\x02\x02\x02\u0121' +
    '\u0122\b\x1F\x02\x02\u0122>\x03\x02\x02\x02\u0123\u0124\x071\x02\x02\u0124' +
    '\u0125\x071\x02\x02\u0125\u0129\x03\x02\x02\x02\u0126\u0128\n\x07\x02' +
    '\x02\u0127\u0126\x03\x02\x02\x02\u0128\u012B\x03\x02\x02\x02\u0129\u0127' +
    '\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02\u012A\u012C\x03\x02\x02\x02' +
    '\u012B\u0129\x03\x02\x02\x02\u012C\u012D\b \x02\x02\u012D@\x03\x02\x02' +
    '\x02\n\x02\xFC\u0101\u0107\u0110\u0119\u011F\u0129\x03\b\x02\x02';
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
