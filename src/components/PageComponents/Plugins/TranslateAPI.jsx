import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import withObjectData from "../../../HOC/withObjectInfo";
import { do_action } from "../../../services/userServices";
import { getMenuLanguage } from "../../../services/appServices";
const LANGUAGES = [
{ code: "bg", name: "Български", flag: "https://flagcdn.com/24x18/bg.png" },
{ code: "ab", name: "Абхазки", flag: "" },
{ code: "ace", name: "Ачински", flag: "https://flagcdn.com/24x18/id.png" },
{ code: "ady", name: "Адигейски", flag: "" },
{ code: "af", name: "Африканс", flag: "https://flagcdn.com/24x18/za.png" },
{ code: "ain", name: "Айну", flag: "https://flagcdn.com/24x18/jp.png" },
{ code: "ak", name: "Акан", flag: "https://flagcdn.com/24x18/gh.png" },
{ code: "alt", name: "Южен алтайски", flag: "" },
{ code: "am", name: "Амхарски", flag: "https://flagcdn.com/24x18/et.png" },
{ code: "an", name: "Арагонски", flag: "https://flagcdn.com/24x18/es.png" },
{ code: "ar", name: "Арабски", flag: "https://flagcdn.com/24x18/sa.png" },
{ code: "arn", name: "Мапуче", flag: "https://flagcdn.com/24x18/cl.png" },
{ code: "as", name: "Асамски", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "av", name: "Аварски", flag: "" },
{ code: "ay", name: "Аймара", flag: "https://flagcdn.com/24x18/bo.png" },
{ code: "az", name: "Азербайджански", flag: "https://flagcdn.com/24x18/az.png" },
{ code: "bal", name: "Балучи", flag: "https://flagcdn.com/24x18/pk.png" },
{ code: "ban", name: "Балийски", flag: "https://flagcdn.com/24x18/id.png" },
{ code: "bar", name: "Баварски", flag: "https://flagcdn.com/24x18/de.png" },
{ code: "bcl", name: "Биколски", flag: "https://flagcdn.com/24x18/ph.png" },
{ code: "be", name: "Беларуски", flag: "https://flagcdn.com/24x18/by.png" },
{ code: "bho", name: "Бходжпури", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "bi", name: "Бислама", flag: "https://flagcdn.com/24x18/vu.png" },
{ code: "bm", name: "Бамбара", flag: "https://flagcdn.com/24x18/ml.png" },
{ code: "bn", name: "Бенгалски", flag: "https://flagcdn.com/24x18/bd.png" },
{ code: "bo", name: "Тибетски", flag: "" },
{ code: "br", name: "Бретонски", flag: "https://flagcdn.com/24x18/fr.png" },
{ code: "bs", name: "Босненски", flag: "https://flagcdn.com/24x18/ba.png" },
{ code: "bug", name: "Бугийски", flag: "https://flagcdn.com/24x18/id.png" },
{ code: "ca", name: "Каталонски", flag: "https://flagcdn.com/24x18/es.png" },
{ code: "ceb", name: "Себуано", flag: "https://flagcdn.com/24x18/ph.png" },
{ code: "ceb", name: "Себуански", flag: "https://flagcdn.com/24x18/ph.png" },
{ code: "chr", name: "Чироки", flag: "https://flagcdn.com/24x18/us.png" },
{ code: "chy", name: "Шейенски", flag: "https://flagcdn.com/24x18/us.png" },
{ code: "ckb", name: "Кюрдски (Сорани)", flag: "" },
{ code: "co", name: "Корсикански", flag: "https://flagcdn.com/24x18/fr.png" },
{ code: "cr", name: "Крии", flag: "https://flagcdn.com/24x18/ca.png" },
{ code: "cs", name: "Чешки", flag: "https://flagcdn.com/24x18/cz.png" },
{ code: "cu", name: "Църковнославянски", flag: "" },
{ code: "cy", name: "Уелски", flag: "https://flagcdn.com/24x18/gb.png" },
{ code: "da", name: "Датски", flag: "https://flagcdn.com/24x18/dk.png" },
{ code: "de", name: "Немски", flag: "https://flagcdn.com/24x18/de.png" },
{ code: "doi", name: "Догри", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "dv", name: "Дивехи", flag: "https://flagcdn.com/24x18/mv.png" },
{ code: "dz", name: "Дзонгкха", flag: "https://flagcdn.com/24x18/bt.png" },
{ code: "ee", name: "Еве", flag: "https://flagcdn.com/24x18/gh.png" },
{ code: "el", name: "Гръцки", flag: "https://flagcdn.com/24x18/gr.png" },
{ code: "en", name: "Английски", flag: "https://flagcdn.com/24x18/gb.png" },
{ code: "eo", name: "Есперанто", flag: "" },
{ code: "es", name: "Испански", flag: "https://flagcdn.com/24x18/es.png" },
{ code: "et", name: "Естонски", flag: "https://flagcdn.com/24x18/ee.png" },
{ code: "eu", name: "Баски", flag: "https://flagcdn.com/24x18/es.png" },
{ code: "fa", name: "Персийски", flag: "https://flagcdn.com/24x18/ir.png" },
{ code: "fi", name: "Фински", flag: "https://flagcdn.com/24x18/fi.png" },
{ code: "fil", name: "Филипински", flag: "https://flagcdn.com/24x18/ph.png" },
{ code: "fj", name: "Фиджийски", flag: "https://flagcdn.com/24x18/fj.png" },
{ code: "fr", name: "Френски", flag: "https://flagcdn.com/24x18/fr.png" },
{ code: "fy", name: "Западнофризийски", flag: "https://flagcdn.com/24x18/nl.png" },
{ code: "fy", name: "Фризийски", flag: "https://flagcdn.com/24x18/nl.png" },
{ code: "ga", name: "Ирландски", flag: "https://flagcdn.com/24x18/ie.png" },
{ code: "gag", name: "Гагаузки", flag: "" },
{ code: "gan", name: "Ган (Китайски диалект)", flag: "https://flagcdn.com/24x18/cn.png" },
{ code: "gd", name: "Шотландски галски", flag: "https://flagcdn.com/24x18/gb.png" },
{ code: "gl", name: "Галисийски", flag: "https://flagcdn.com/24x18/es.png" },
{ code: "gn", name: "Гуарани", flag: "https://flagcdn.com/24x18/py.png" },
{ code: "gom", name: "Конкани", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "gsw", name: "Швейцарски немски", flag: "https://flagcdn.com/24x18/ch.png" },
{ code: "gu", name: "Гуджарати", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "ha", name: "Хауса", flag: "https://flagcdn.com/24x18/ng.png" },
{ code: "haw", name: "Хавайски", flag: "https://flagcdn.com/24x18/us.png" },
{ code: "he", name: "Иврит", flag: "https://flagcdn.com/24x18/il.png" },
{ code: "hi", name: "Хинди", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "hil", name: "Хилигайнон", flag: "https://flagcdn.com/24x18/ph.png" },
{ code: "hmn", name: "Хмонг", flag: "" },
{ code: "ho", name: "Хири моту", flag: "https://flagcdn.com/24x18/pg.png" },
{ code: "hr", name: "Хърватски", flag: "https://flagcdn.com/24x18/hr.png" },
{ code: "hsb", name: "Горнолужишки", flag: "https://flagcdn.com/24x18/de.png" },
{ code: "ht", name: "Хаитянски креолски", flag: "https://flagcdn.com/24x18/ht.png" },
{ code: "hu", name: "Унгарски", flag: "https://flagcdn.com/24x18/hu.png" },
{ code: "hy", name: "Арменски", flag: "https://flagcdn.com/24x18/am.png" },
{ code: "hz", name: "Хереро", flag: "https://flagcdn.com/24x18/na.png" },
{ code: "iba", name: "Ибански", flag: "https://flagcdn.com/24x18/my.png" },
{ code: "id", name: "Индонезийски", flag: "https://flagcdn.com/24x18/id.png" },
{ code: "ig", name: "Игбо", flag: "https://flagcdn.com/24x18/ng.png" },
{ code: "ik", name: "Инупиак", flag: "https://flagcdn.com/24x18/us.png" },
{ code: "ilo", name: "Илокански", flag: "https://flagcdn.com/24x18/ph.png" },
{ code: "inh", name: "Ингушки", flag: "" },
{ code: "is", name: "Исландски", flag: "https://flagcdn.com/24x18/is.png" },
{ code: "it", name: "Италиански", flag: "https://flagcdn.com/24x18/it.png" },
{ code: "ja", name: "Японски", flag: "https://flagcdn.com/24x18/jp.png" },
{ code: "jam", name: "Ямайски креолски", flag: "https://flagcdn.com/24x18/jm.png" },
{ code: "jv", name: "Явански", flag: "https://flagcdn.com/24x18/id.png" },
{ code: "jw", name: "Явански", flag: "https://flagcdn.com/24x18/id.png" },
{ code: "ka", name: "Грузински", flag: "https://flagcdn.com/24x18/ge.png" },
{ code: "kab", name: "Кабилски", flag: "https://flagcdn.com/24x18/dz.png" },
{ code: "kha", name: "Кхаси", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "kj", name: "Кунама", flag: "" },
{ code: "kk", name: "Казахски", flag: "https://flagcdn.com/24x18/kz.png" },
{ code: "km", name: "Кхмерски", flag: "https://flagcdn.com/24x18/kh.png" },
{ code: "kn", name: "Каннада", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "ko", name: "Корейски", flag: "https://flagcdn.com/24x18/kr.png" },
{ code: "kr", name: "Канури", flag: "" },
{ code: "krc", name: "Карачаево-балкарски", flag: "" },
{ code: "kri", name: "Крио", flag: "https://flagcdn.com/24x18/sl.png" },
{ code: "ks", name: "Кашмирски", flag: "" },
{ code: "ku", name: "Кюрдски", flag: "" },
{ code: "ku", name: "Кюрдски", flag: "" },
{ code: "kv", name: "Коми", flag: "" },
{ code: "kw", name: "Корнуолски", flag: "https://flagcdn.com/24x18/gb.png" },
{ code: "ky", name: "Киргизки", flag: "https://flagcdn.com/24x18/kg.png" },
{ code: "la", name: "Латински", flag: "" },
{ code: "lb", name: "Люксембургски", flag: "https://flagcdn.com/24x18/lu.png" },
{ code: "lez", name: "Лезгински", flag: "" },
{ code: "lg", name: "Луганда", flag: "https://flagcdn.com/24x18/ug.png" },
{ code: "li", name: "Лимбургски", flag: "https://flagcdn.com/24x18/nl.png" },
{ code: "ln", name: "Лингала", flag: "https://flagcdn.com/24x18/cd.png" },
{ code: "lo", name: "Лаоски", flag: "https://flagcdn.com/24x18/la.png" },
{ code: "lt", name: "Литовски", flag: "https://flagcdn.com/24x18/lt.png" },
{ code: "lus", name: "Мизо", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "lv", name: "Латвийски", flag: "https://flagcdn.com/24x18/lv.png" },
{ code: "lzh", name: "Класически китайски", flag: "https://flagcdn.com/24x18/cn.png" },
{ code: "mai", name: "Майтхили", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "mdf", name: "Мокшански", flag: "" },
{ code: "mfe", name: "Маврицийски креолски", flag: "https://flagcdn.com/24x18/mu.png" },
{ code: "mg", name: "Малгашки", flag: "https://flagcdn.com/24x18/mg.png" },
{ code: "mgh", name: "Макуа", flag: "https://flagcdn.com/24x18/mz.png" },
{ code: "mi", name: "Маорски", flag: "https://flagcdn.com/24x18/nz.png" },
{ code: "mic", name: "Микмак", flag: "https://flagcdn.com/24x18/ca.png" },
{ code: "min", name: "Минангкабау", flag: "https://flagcdn.com/24x18/id.png" },
{ code: "mk", name: "Македонски", flag: "https://flagcdn.com/24x18/mk.png" },
{ code: "ml", name: "Малаялам", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "mn", name: "Монголски", flag: "https://flagcdn.com/24x18/mn.png" },
{ code: "mnc", name: "Манджурски", flag: "" },
{ code: "mni-Mtei", name: "Мейтейлон (Манипури)", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "moh", name: "Мохоук", flag: "https://flagcdn.com/24x18/ca.png" },
{ code: "mr", name: "Маратхи", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "ms", name: "Малайски", flag: "https://flagcdn.com/24x18/my.png" },
{ code: "mt", name: "Малтийски", flag: "https://flagcdn.com/24x18/mt.png" },
{ code: "mus", name: "Крик", flag: "https://flagcdn.com/24x18/us.png" },
{ code: "my", name: "Бирмански", flag: "https://flagcdn.com/24x18/mm.png" },
{ code: "na", name: "Науру", flag: "https://flagcdn.com/24x18/nr.png" },
{ code: "nap", name: "Неаполитански", flag: "https://flagcdn.com/24x18/it.png" },
{ code: "nds", name: "Долносаксонски", flag: "https://flagcdn.com/24x18/de.png" },
{ code: "ne", name: "Непалски", flag: "https://flagcdn.com/24x18/np.png" },
{ code: "ng", name: "Ндонга", flag: "https://flagcdn.com/24x18/na.png" },
{ code: "niu", name: "Ниуейски", flag: "https://flagcdn.com/24x18/nu.png" },
{ code: "nl", name: "Холандски", flag: "https://flagcdn.com/24x18/nl.png" },
{ code: "no", name: "Норвежки", flag: "https://flagcdn.com/24x18/no.png" },
{ code: "nog", name: "Ногайски", flag: "" },
{ code: "nqo", name: "Нко", flag: "" },
{ code: "nr", name: "Южен ндебеле", flag: "https://flagcdn.com/24x18/za.png" },
{ code: "nso", name: "Сепеди", flag: "https://flagcdn.com/24x18/za.png" },
{ code: "ny", name: "Нянджа", flag: "https://flagcdn.com/24x18/mw.png" },
{ code: "ny", name: "Чичева", flag: "https://flagcdn.com/24x18/mw.png" },
{ code: "nyn", name: "Няколе", flag: "https://flagcdn.com/24x18/ug.png" },
{ code: "oc", name: "Окситански", flag: "https://flagcdn.com/24x18/fr.png" },
{ code: "oj", name: "Оджибве", flag: "https://flagcdn.com/24x18/ca.png" },
{ code: "om", name: "Оромо", flag: "https://flagcdn.com/24x18/et.png" },
{ code: "or", name: "Одия", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "os", name: "Осетински", flag: "" },
{ code: "pa", name: "Панджабски", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "pa", name: "Пунджаби", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "pam", name: "Капампанган", flag: "https://flagcdn.com/24x18/ph.png" },
{ code: "pap", name: "Папиаменто", flag: "" },
{ code: "pdc", name: "Пенсилвански немски", flag: "https://flagcdn.com/24x18/us.png" },
{ code: "pih", name: "Питкернски", flag: "" },
{ code: "pl", name: "Полски", flag: "https://flagcdn.com/24x18/pl.png" },
{ code: "pon", name: "Понпейски", flag: "https://flagcdn.com/24x18/fm.png" },
{ code: "prg", name: "Пруски", flag: "" },
{ code: "ps", name: "Пущунски", flag: "https://flagcdn.com/24x18/af.png" },
{ code: "pt", name: "Португалски", flag: "https://flagcdn.com/24x18/pt.png" },
{ code: "qu", name: "Кечуа", flag: "https://flagcdn.com/24x18/pe.png" },
{ code: "quc", name: "Киче", flag: "https://flagcdn.com/24x18/gt.png" },
{ code: "rar", name: "Раротонга", flag: "https://flagcdn.com/24x18/ck.png" },
{ code: "rm", name: "Реторомански", flag: "https://flagcdn.com/24x18/ch.png" },
{ code: "rn", name: "Рунди", flag: "https://flagcdn.com/24x18/bi.png" },
{ code: "ro", name: "Румънски", flag: "https://flagcdn.com/24x18/ro.png" },
{ code: "ru", name: "Руски", flag: "https://flagcdn.com/24x18/ru.png" },
{ code: "rup", name: "Аромънски", flag: "" },
{ code: "rw", name: "Киняруанда", flag: "https://flagcdn.com/24x18/rw.png" },
{ code: "sa", name: "Санскрит", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "sc", name: "Сардински", flag: "https://flagcdn.com/24x18/it.png" },
{ code: "scn", name: "Сицилиански", flag: "https://flagcdn.com/24x18/it.png" },
{ code: "sd", name: "Синдхи", flag: "https://flagcdn.com/24x18/pk.png" },
{ code: "sgs", name: "Жемайтски", flag: "https://flagcdn.com/24x18/lt.png" },
{ code: "shn", name: "Шански", flag: "https://flagcdn.com/24x18/mm.png" },
{ code: "si", name: "Синхалски", flag: "https://flagcdn.com/24x18/lk.png" },
{ code: "sid", name: "Сидамо", flag: "https://flagcdn.com/24x18/et.png" },
{ code: "sk", name: "Словашки", flag: "https://flagcdn.com/24x18/sk.png" },
{ code: "sl", name: "Словенски", flag: "https://flagcdn.com/24x18/si.png" },
{ code: "sm", name: "Самоански", flag: "https://flagcdn.com/24x18/ws.png" },
{ code: "sn", name: "Шона", flag: "https://flagcdn.com/24x18/zw.png" },
{ code: "so", name: "Сомалийски", flag: "https://flagcdn.com/24x18/so.png" },
{ code: "sq", name: "Албански", flag: "https://flagcdn.com/24x18/al.png" },
{ code: "sr", name: "Сръбски", flag: "https://flagcdn.com/24x18/rs.png" },
{ code: "srn", name: "Сранан тонго", flag: "https://flagcdn.com/24x18/sr.png" },
{ code: "ss", name: "Свати", flag: "https://flagcdn.com/24x18/sz.png" },
{ code: "st", name: "Сесото", flag: "https://flagcdn.com/24x18/ls.png" },
{ code: "su", name: "Сундански", flag: "https://flagcdn.com/24x18/id.png" },
{ code: "sux", name: "Шумерски", flag: "" },
{ code: "sv", name: "Шведски", flag: "https://flagcdn.com/24x18/se.png" },
{ code: "sw", name: "Суахили", flag: "https://flagcdn.com/24x18/tz.png" },
{ code: "szl", name: "Силезки", flag: "https://flagcdn.com/24x18/pl.png" },
{ code: "ta", name: "Тамилски", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "te", name: "Телугу", flag: "https://flagcdn.com/24x18/in.png" },
{ code: "tet", name: "Тетум", flag: "https://flagcdn.com/24x18/tl.png" },
{ code: "tg", name: "Таджикски", flag: "https://flagcdn.com/24x18/tj.png" },
{ code: "th", name: "Тайски", flag: "https://flagcdn.com/24x18/th.png" },
{ code: "ti", name: "Тигриня", flag: "https://flagcdn.com/24x18/er.png" },
{ code: "tiv", name: "Тив", flag: "https://flagcdn.com/24x18/ng.png" },
{ code: "tk", name: "Туркменски", flag: "https://flagcdn.com/24x18/tm.png" },
{ code: "tkl", name: "Токелау", flag: "https://flagcdn.com/24x18/tk.png" },
{ code: "tl", name: "Тагалог", flag: "https://flagcdn.com/24x18/ph.png" },
{ code: "tlh", name: "Клингонски", flag: "" },
{ code: "tpi", name: "Ток писин", flag: "https://flagcdn.com/24x18/pg.png" },
{ code: "tr", name: "Турски", flag: "https://flagcdn.com/24x18/tr.png" },
{ code: "ts", name: "Тсонга", flag: "https://flagcdn.com/24x18/za.png" },
{ code: "tt", name: "Татарски", flag: "https://flagcdn.com/24x18/ru.png" },
{ code: "ty", name: "Таитянски", flag: "https://flagcdn.com/24x18/pf.png" },
{ code: "udm", name: "Удмуртски", flag: "" },
{ code: "ug", name: "Уйгурски", flag: "https://flagcdn.com/24x18/cn.png" },
{ code: "uk", name: "Украински", flag: "https://flagcdn.com/24x18/ua.png" },
{ code: "umb", name: "Умбунду", flag: "https://flagcdn.com/24x18/ao.png" },
{ code: "ur", name: "Урду", flag: "https://flagcdn.com/24x18/pk.png" },
{ code: "uz", name: "Узбекски", flag: "https://flagcdn.com/24x18/uz.png" },
{ code: "ve", name: "Венда", flag: "https://flagcdn.com/24x18/za.png" },
{ code: "vi", name: "Виетнамски", flag: "https://flagcdn.com/24x18/vn.png" },
{ code: "vo", name: "Волапюк", flag: "" },
{ code: "vro", name: "Выруски", flag: "https://flagcdn.com/24x18/ee.png" },
{ code: "wa", name: "Валонски", flag: "https://flagcdn.com/24x18/be.png" },
{ code: "war", name: "Варей", flag: "https://flagcdn.com/24x18/ph.png" },
{ code: "xal", name: "Калмик", flag: "" },
{ code: "xh", name: "Кхоса", flag: "https://flagcdn.com/24x18/za.png" },
{ code: "yav", name: "Янгбен", flag: "https://flagcdn.com/24x18/cm.png" },
{ code: "yi", name: "Идиш", flag: "" },
{ code: "yo", name: "Йоруба", flag: "https://flagcdn.com/24x18/ng.png" },
{ code: "za", name: "Джуан", flag: "https://flagcdn.com/24x18/cn.png" },
{ code: "zh", name: "Китайски", flag: "https://flagcdn.com/24x18/cn.png" },
{ code: "zh-CN", name: "Китайски (Опростен)", flag: "https://flagcdn.com/24x18/cn.png" },
{ code: "zh-TW", name: "Китайски (Традиционен)", flag: "https://flagcdn.com/24x18/tw.png" },
{ code: "zu", name: "Зулу", flag: "https://flagcdn.com/24x18/za.png" },


];

const getUniqueLanguagesByCode = (languages) => {
  const seenCodes = new Set();

  return languages.filter((language) => {
    if (seenCodes.has(language.code)) {
      return false;
    }

    seenCodes.add(language.code);
    return true;
  });
};

const UNIQUE_LANGUAGES = getUniqueLanguagesByCode(LANGUAGES);
const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";

function TranslateAPI({ objectData }) {
  const DEFAULT_LANGUAGE = objectData.objectInformation.menu_language || 'bg';
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const getPageLanguage = () => {
    const supportedLanguages = ['bg', 'en', 'de', 'fr', 'ru', 'tr', 'ro'];

    if (supportedLanguages.includes(objectData.objectInformation.menu_language)) {
      return objectData.objectInformation.menu_language;
    } else {
      return 'bg';
    }
  }
useEffect(() => {
  if (!objectData) return;
  const langSettings = objectData?.MODULES?.OBJECT_INFO?.ENABLED_LANGUAGES;
  if (!langSettings) {
    setIsTranslationEnabled(false);
    return;
  }

  const filteredLanguages = langSettings.useAllAvailableLanguages
    ? UNIQUE_LANGUAGES
    : UNIQUE_LANGUAGES.filter(lang => langSettings.options.includes(lang.code));
  setAvailableLanguages(filteredLanguages);

  const DEFAULT_LANGUAGE = objectData.objectInformation.menu_language || 'bg';
  setCurrentLanguage(DEFAULT_LANGUAGE);

  const initializeGoogleTranslate = () => {
    const translateElement = document.getElementById("google_translate_element");

    if (!translateElement || translateElement.dataset.initialized === "true") {
      return;
    }

    if (!window.google?.translate?.TranslateElement) {
      return;
    }

    translateElement.innerHTML = "";
    translateElement.dataset.initialized = "true";

    new window.google.translate.TranslateElement(
      {
        pageLanguage: getPageLanguage(),
        includedLanguages: UNIQUE_LANGUAGES.map(lang => lang.code).join(','),
        layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
      },
      "google_translate_element"
    );

    setTimeout(() => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.style.display = 'none';

        if (DEFAULT_LANGUAGE !== getPageLanguage()) {
          select.value = DEFAULT_LANGUAGE;
          select.dispatchEvent(new Event('change'));
        }
      }
    }, 500);
  };

  window.googleTranslateElementInit = initializeGoogleTranslate;

  const existingScript = document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID);
  if (existingScript) {
    initializeGoogleTranslate();
  } else {
    const script = document.createElement("script");
    script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }

  return () => {
    const el = document.getElementById("google_translate_element");
    if (el) {
      el.innerHTML = "";
      delete el.dataset.initialized;
    }
  };
}, [objectData]);



  /**
   * Sets the Google Translate cookie.
   * @param {String} lang - The language code to set the cookie to.
   * @description
   * If the language is "bg" (Bulgarian), the cookie is deleted.
   * Otherwise, the cookie is set to the provided language and expires in 30 days.
   */
  const setGoogleTranslateCookie = (lang) => {
    if (lang === getPageLanguage()) {
      // Delete the cookie if the language is "bg" (Bulgarian)
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else {
      // Set the cookie to the provided language and expires in 30 days
      document.cookie = `googtrans=/bg/${lang}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/;`;
    }
  };

/**
 * Changes the language of the translation.
 * @param {String} langCode - The code of the language to change to.
 */
const changeLanguage = (langCode) => {
  // Update the current language state
  setCurrentLanguage(langCode);

  // Perform an action indicating the language change
  do_action("change_language", { message: "Езика бе сменен на " + langCode });

  // Select the Google Translate dropdown element
  const select = document.querySelector('.goog-te-combo');
  if (select) {
    // Set the selected language in the dropdown
    select.value = langCode;

    // Trigger change event to update translation
    select.dispatchEvent(new Event('change'));
  }
};

  /**
   * Resets the translation settings to the default language (Bulgarian).
   * This function performs the following actions:
   * - Calls an action to reset the translation.
   * - Sets the Google Translate cookie to the default language.
   * - Updates the current language in the state.
   * - Reloads the page to apply the changes.
   */
  const resetTranslation = () => {
    // Perform an action to reset the translation
    do_action("reset_translation", { message: "Translation reset" });

    // Set the Google Translate cookie to the default language ('bg')
    setGoogleTranslateCookie(getPageLanguage());

    // Update the current language in the state to 'bg'
    setCurrentLanguage(getPageLanguage());

    // Reload the page to apply the language changes
    window.location.reload();
  };
  const menuLanguage = getMenuLanguage();
  return (
    
    <HelmetProvider>
      <Helmet>{/* V-MENU.API.TRANSLATION */}</Helmet>
      {isTranslationEnabled ? (
        <>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "8px",
            marginBottom: "12px"
          }}>
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  border: `1px solid ${currentLanguage === lang.code ? '#4285f4' : '#ddd'}`,
                  background: currentLanguage === lang.code ? '#e8f0fe' : '#fff',
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
              >
                <img 
                  src={lang.flag} 
                  alt={lang.name} 
                  style={{ 
                    width: "18px", 
                    height: "12px",
                    marginRight: "6px",
                    objectFit: "cover"
                  }} 
                />
                {lang.name}
              </button>
            ))}
          </div>

          <div id="google_translate_element" style={{ display: "none" }}></div>

          <button
            onClick={resetTranslation}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              background: "#f8f9fa",
              border: "1px solid #dadce0",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {menuLanguage.API_LIST.Google_Services.Reset_Options.Text}
          </button>
        </>
      ) : (
        <div style={{ color: "#d9534f", fontWeight: "bold", marginTop: "10px" }}>
          🌍 Translation is not enabled for this object.
        </div>
      )}
    </HelmetProvider>
  );
}

const ShowTranslateAPI = withObjectData(TranslateAPI);
export default ShowTranslateAPI;
