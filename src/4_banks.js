/* ===== Банки вопросов: [вопрос, варианты, ответ, пояснение] ===== */
const ODD=[
 [[Lx("яблоко","apple"),Lx("груша","pear"),Lx("банан","banana"),Lx("морковь","carrot")],Lx("морковь","carrot"),Lx("Морковь — овощ, остальные — фрукты","A carrot is a vegetable, the others are fruits")],
 [[Lx("кошка","cat"),Lx("собака","dog"),Lx("корова","cow"),Lx("ворона","crow")],Lx("ворона","crow"),Lx("Ворона — птица, остальные — звери","A crow is a bird, the others are animals")],
 [[Lx("машина","car"),Lx("автобус","bus"),Lx("велосипед","bicycle"),Lx("самолёт","plane")],Lx("самолёт","plane"),Lx("Самолёт летает, остальные ездят по земле","A plane flies, the others drive on the ground")],
 [['2','4','7','8'],'7',Lx("7 — нечётное число, остальные чётные","7 is odd, the others are even")],
 [['10','20','35','40'],'35',Lx("35 не делится на 10","35 is not divisible by 10")],
 [[Lx("круг","circle"),Lx("квадрат","square"),Lx("треугольник","triangle"),Lx("куб","cube")],Lx("куб","cube"),Lx("Куб объёмный, остальные фигуры плоские","A cube is 3D, the other shapes are flat")],
 [[Lx("январь","January"),Lx("март","March"),Lx("среда","Wednesday"),Lx("май","May")],Lx("среда","Wednesday"),Lx("Среда — день недели, остальные — месяцы","Wednesday is a day of the week, the others are months")],
 [[Lx("красный","red"),Lx("зелёный","green"),Lx("синий","blue"),Lx("большой","big")],Lx("большой","big"),Lx("«Большой» — размер, остальные — цвета","“Big” is a size, the others are colors")],
 [[Lx("берёза","birch"),Lx("дуб","oak"),Lx("ромашка","daisy"),Lx("клён","maple")],Lx("ромашка","daisy"),Lx("Ромашка — цветок, остальные — деревья","A daisy is a flower, the others are trees")],
 [['3','6','9','11'],'11',Lx("11 не делится на 3","11 is not divisible by 3")],
 [[Lx("стол","table"),Lx("стул","chair"),Lx("шкаф","wardrobe"),Lx("яблоко","apple")],Lx("яблоко","apple"),Lx("Яблоко едят, остальное — мебель","You eat an apple, the others are furniture")],
 [[Lx("лето","summer"),Lx("осень","autumn"),Lx("зима","winter"),Lx("вторник","Tuesday")],Lx("вторник","Tuesday"),Lx("Вторник — день недели, остальные — времена года","Tuesday is a day of the week, the others are seasons")],
 [[Lx("ручка","pen"),Lx("карандаш","pencil"),Lx("фломастер","marker"),Lx("ложка","spoon")],Lx("ложка","spoon"),Lx("Ложкой едят, остальным пишут","You eat with a spoon, you write with the others")],
 [[Lx("волк","wolf"),Lx("лиса","fox"),Lx("медведь","bear"),Lx("корова","cow")],Lx("корова","cow"),Lx("Корова — домашнее животное, остальные дикие","A cow is a farm animal, the others are wild")],
 [['5','15','25','30'],'30',Lx("30 не оканчивается на 5","30 does not end in 5")],
 [[Lx("солнце","sun"),Lx("звезда","star"),Lx("луна","moon"),Lx("мяч","ball")],Lx("мяч","ball"),Lx("Мяч — игрушка, остальное на небе","A ball is a toy, the others are in the sky")],
 [[Lx("Минск","Minsk"),Lx("Гродно","Grodno"),Lx("Беларусь","Belarus"),Lx("Брест","Brest")],Lx("Беларусь","Belarus"),Lx("Беларусь — страна, остальные — города","Belarus is a country, the others are cities")],
 [[Lx("кит","whale"),Lx("акула","shark"),Lx("дельфин","dolphin"),Lx("орёл","eagle")],Lx("орёл","eagle"),Lx("Орёл живёт не в воде","An eagle doesn't live in water")],
 [[Lx("сапоги","boots"),Lx("туфли","shoes"),Lx("кеды","sneakers"),Lx("шапка","hat")],Lx("шапка","hat"),Lx("Шапку носят на голове, остальное — обувь","A hat is worn on the head, the others are shoes")],
 [['12','21','33','45'],'33',Lx("У 33 одинаковые цифры","33 has two identical digits")],
 [[Lx("пчела","bee"),Lx("бабочка","butterfly"),Lx("муравей","ant"),Lx("паук","spider")],Lx("паук","spider"),Lx("У паука 8 ног, это не насекомое","A spider has 8 legs, it's not an insect")],
 [[Lx("скрипка","violin"),Lx("гитара","guitar"),Lx("барабан","drum"),Lx("кисточка","paintbrush")],Lx("кисточка","paintbrush"),Lx("Кисточка — для рисования, остальное — музыка","A paintbrush is for drawing, the others are for music")],
 [['100','200','250','300'],'250',Lx("250 не круглая сотня","250 is not a round hundred")],
 [[Lx("А","A"),Lx("О","E"),Lx("У","O"),Lx("К","K")],Lx("К","K"),Lx("К — согласная, остальные — гласные","K is a consonant, the others are vowels")]];

const TRICKY=[
 [Lx("У Маши 3 брата. У каждого брата одна сестра. Сколько всего детей в семье?","Masha has 3 brothers. Each brother has one sister. How many children are in the family?"),['4','6','3','7'],'4',Lx("Сестра у всех братьев одна — это Маша: 3 брата + Маша","All the brothers have the same sister, Masha: 3 brothers + Masha")],
 [Lx("Бревно распилили на 4 части. Сколько сделали распилов?","A log was sawn into 4 pieces. How many cuts were made?"),['4','3','5','2'],'3',Lx("На 2 части нужен 1 распил, на 4 части — 3","2 pieces need 1 cut, 4 pieces need 3")],
 [Lx("Что тяжелее: килограмм ваты или килограмм железа?","What is heavier: a kilogram of cotton wool or a kilogram of iron?"),[Lx("Вата","Cotton wool"),Lx("Железо","Iron"),Lx("Одинаково","The same")],Lx("Одинаково","The same"),Lx("Килограмм — это килограмм","A kilogram is a kilogram")],
 [Lx("На берёзе выросло 5 яблок. Ветер сорвал 2. Сколько яблок осталось на берёзе?","5 apples grew on a birch tree. The wind blew off 2. How many apples are left on the birch?"),['3','5','0','2'],'0',Lx("На берёзе яблоки не растут","Apples don't grow on birch trees")],
 [Lx("3 кошки за 3 минуты ловят 3 мышки. За сколько минут 1 кошка поймает 1 мышку?","3 cats catch 3 mice in 3 minutes. How many minutes does it take 1 cat to catch 1 mouse?"),['1','3','9','6'],'3',Lx("Каждая кошка ловит свою мышку те же 3 минуты","Each cat catches its own mouse in the same 3 minutes")],
 [Lx("Яйцо варится 4 минуты. Сколько минут варятся 3 яйца в одной кастрюле?","An egg boils in 4 minutes. How many minutes do 3 eggs take in one pot?"),['12','4','7','3'],'4',Lx("Яйца варятся одновременно","The eggs boil at the same time")],
 [Lx("Тройка лошадей проскакала 30 км. Сколько километров проскакала каждая лошадь?","A team of three horses ran 30 km. How many kilometers did each horse run?"),['10','30','90','15'],'30',Lx("Лошади бежали вместе, каждая — все 30 км","The horses ran together, each ran all 30 km")],
 [Lx("У стола 4 угла. Один угол отпилили. Сколько углов стало?","A table has 4 corners. One corner is sawn off. How many corners are there now?"),['3','4','5','6'],'5',Lx("Вместо одного угла появляются два новых","Cutting one corner makes two new ones")],
 [Lx("Гусь на одной ноге весит 2 кг. Сколько он весит на двух ногах?","A goose standing on one leg weighs 2 kg. How much does it weigh on two legs?"),['4','2','1','3'],'2',Lx("Вес не зависит от того, на скольких ногах стоишь","Weight doesn't depend on how many legs you stand on")],
 [Lx("Сколько месяцев в году имеют 28 дней?","How many months of the year have 28 days?"),['1','2','12','11'],'12',Lx("28 дней есть в каждом месяце","Every month has 28 days")],
 [Lx("Сколько раз можно вычесть 5 из числа 25?","How many times can you subtract 5 from 25?"),['5','1','4','0'],'1',Lx("После первого раза будет уже 20, а не 25","After the first time it's 20, not 25")],
 [Lx("В комнате 4 угла. В каждом углу сидит кошка. Напротив каждой кошки сидят 3 кошки. Сколько всего кошек?","A room has 4 corners. A cat sits in each corner. Opposite each cat sit 3 cats. How many cats are there?"),['4','12','16','8'],'4',Lx("Кошки видят друг друга: их всего 4","The cats see each other: there are only 4")],
 [Lx("Улитка ползёт на столб высотой 5 м. Днём поднимается на 2 м, ночью сползает на 1 м. На какой день она будет наверху?","A snail climbs a 5 m pole. By day it climbs 2 m, at night it slides down 1 m. On which day does it reach the top?"),['5','4','3','6'],'4',Lx("За 3 дня — 3 м, на 4-й день поднимется с 3 до 5 м","After 3 days it's at 3 m; on day 4 it climbs from 3 to 5 m")],
 [Lx("Петя старше Коли на 2 года. На сколько лет Петя будет старше Коли через 5 лет?","Peter is 2 years older than Nick. How much older will Peter be in 5 years?"),['7','2','5','3'],'2',Lx("Оба становятся старше одинаково","They both get older by the same amount")],
 [Lx("В тёмной комнате свеча и лампа. У тебя одна спичка. Что зажжёшь первым?","In a dark room there is a candle and a lamp. You have one match. What do you light first?"),[Lx("Свечу","The candle"),Lx("Лампу","The lamp"),Lx("Спичку","The match")],Lx("Спичку","The match"),Lx("Без спички ничего не зажжёшь","You can't light anything without the match")],
 [Lx("Сколько ног у двух кошек и одного петуха?","How many legs do two cats and one rooster have?"),['10','12','8','6'],'10','4 + 4 + 2 = 10'],
 [Lx("Кирпич весит 1 кг и ещё полкирпича. Сколько весит кирпич?","A brick weighs 1 kg plus half a brick. How much does the brick weigh?"),[Lx("1,5 кг","1.5 kg"),Lx("2 кг","2 kg"),Lx("1 кг","1 kg"),Lx("3 кг","3 kg")],Lx("2 кг","2 kg"),Lx("Половина кирпича","Half a brick")+' = '+Lx("1 кг, значит целый — 2 кг","1 kg, so a whole brick is 2 kg")]];

/* Внимательность */
/* Несимметричные картинки: у них хорошо видно поворот и отражение */
const SPOT_EMOJI=['🐟','🐌','🦆','🐘','🚗','🦒','🐢','🎸','🔨','🍌','🦕','🐿️','🦜','🛴','🐈','🚀','🦔','🐇','✏️','🔑','🎺','🐓','🦩','🚲'];
const SPOT_PAIRS=[['🐱','😺'],['🍎','🍅'],['⭐','🌟'],['🌲','🌳'],['🐟','🐠'],['😀','😃'],['🍊','🍑'],['🐻','🐨'],['🌼','🌻'],['🚗','🚙'],['🍪','🍩'],['🐭','🐹'],['💙','💜'],['🌕','🌝'],['😊','🙂'],['🐶','🐕']];
const STROOP=[[Lx("красный","red"),'#e63946'],[Lx("синий","blue"),'#2f6fdc'],[Lx("зелёный","green"),'#2e9e5b'],[Lx("жёлтый","yellow"),'#e0a200'],[Lx("фиолетовый","purple"),'#7a4fd6'],[Lx("оранжевый","orange"),'#f77f00']];
const RECALL=['🐱','🐶','🍎','⭐','🚗','🌸','🐟','🎈','⚽','🍄','🦊','🌙'];
