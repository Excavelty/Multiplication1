document.addEventListener("DOMContentLoaded", setupCalc); //nowocześniejszy sposób wywołania funkcji setup

function setupCalc()//funckja setup
{
    let handle = fastHandle("bt1");
    handle.addEventListener("click", calcFunc);
}

let fastHandle = object => {return document.getElementById(object)};//funkcja strzałkowa zwracająca "uchwyt" do
//danego elementu

let convToStr = number => {return number.toString()};//funkcja strzałkowa skracająca zapis konwersji toString

let displayResult = result => {//funkcja strzałkowa wyświetlająca działania i wynik w textarea
    
    let handle = fastHandle("result");//DO ZROBIENIA "SCHOWANIE" ZER
    handle.value = result;
}

let addZeros1 = resultArray => {//funkcja strzałkowa dopisująca zera z tyłu
     
    x = resultArray.length;
    
    for(let i = 0; i < x; ++i){
        for(let j = 0; j < i; ++j){//pętle dopisujące 0 z tyłu
           resultArray[i] = resultArray[i] + '0';}
     }
    return resultArray;
}

let addZeros2 = result => {//funkcja strzałkowa dodająca z przodu zera w celu ułatwienia obliczeń
    
    let x = result.length;
    let maxSize = 0;
    
    for(let i = 0; i < x; ++i){
        let local = result[i].length;
        if(local > maxSize){
            maxSize = local;
        }
    }
     for(let i = 0; i < x; ++i){
        let local = result[i].length;
        while(local < maxSize){
            result[i] = '0' + result[i];
            ++local;
        }
     }
    return result;
}

let calcSum = result => {//funkcja strzałkowa sumująca
    let x = result.length;
    let a = result[0].length;
    
    let sum = 0;
    let theResult = "";
    
    let restNumber = 0;
    
    for(let j = a - 1; j >= 0; --j){//pętla od ostatniej cyfry do pierwszej
        
        let sum = 0;
        
            sum += restNumber;//dodajemy liczbę pozostałą, jest ona różna od "0", gdy wynik sumowania > 9
        
            for(let i = 0; i < x; ++i){
                sum += parseInt(result[i].charAt(j));//sumowanie
            }
        if(sum > 9){
            let local = convToStr(sum);//konwersja toString
            restNumber = parseInt(local.substr(0, local.length - 1));//przypisanie NIEOSTATNICH cyfr do liczby pozostałej
            theResult = local.charAt(local.length - 1) + theResult;//dopisanie ostatniej cyfry do wyniku
        }else{
            theResult = sum + theResult;//zwykłe przypisanie do wyniku
            restNumber = 0;
        }
    }
    
    if(restNumber != 0){
        theResult = restNumber + theResult;//dopisanie liczby pozostałej do wyniku, o ile jest różna od zera
    }
    
    return theResult;//zwrócenie wartości
}

function calcFunc()//główna funkcja licząca
{
  let result1, result2;
    
  result1 = fastHandle("firstNumber").value; //spisanie wyników
  result2 = fastHandle("secondNumber").value;
   
  let length1 = result2.length; //przypisanie długości
  let length2 = result1.length;//[WAŻNE!!!] PROSZĘ ZWRÓCIĆ UWAGĘ NA ODWROTNĄ KOLEJNOŚĆ, ABY UNIKNĄĆ BŁĘDU  
    //Z NaN!!!
    
 
  let resultArray = new Array(0);//tablica wyników z poszczególnych "POMNOŻEŃ"

  for(let i = length1 - 1; i >= 0; --i)//pętla od ostatniej cyfry pierwszej liczby...
  {
      let lineResult = "";//wynik jednej linijki
      let restNumber = new Number(0);
      
      for(let j = length2 - 1; j >= 0; --j)//...pętla od ostatniej cyfry drugiej liczby
      {
          let localNumber = new Number(0);
          localNumber = parseInt(result2.charAt(i)) * parseInt(result1.charAt(j)) 
              + parseInt(restNumber);//mnożenie i suma z liczbą pozostałą
          //[WAŻNE!!!] NALEŻY UŻYĆ charAt, by uniknąć błędów
          
          if(localNumber < 10)
          {
              lineResult = localNumber + lineResult;//standardowe uzupełnienie wyniku
              restNumber = 0;
          }
          else{
              let x = convToStr(localNumber);//uzupełnienie wyniku, gdy iloczyn + liczba pozostała > 9
              //[WAŻNE!!!] x WYNOSI MAKSYMALNIE 81 + 9 = 90, WOBEC TEGO MOŻEMY ZAŁOŻYĆ, ŻE 
              //lineResult.length == 2
              lineResult = x.charAt(1) + lineResult;
              restNumber = parseInt(x.charAt(0));
          }
      }
      if(restNumber != 0)
      lineResult = restNumber + lineResult;//dopisanie liczby pozostałej jesli jest różna od 0
    resultArray.push(lineResult);//dodanie do tablicy linijki z wynikiem jednego "pomnożenia"
  } 
    let finalResult = "";
    let x = resultArray.length;
    
    resultArray = addZeros1(resultArray);//wywołanie funkcji...
    resultArray = addZeros2(resultArray);//...dopisujących zera
    
    for(let i = 0;  i < x; ++i){
        finalResult += resultArray[i];
        finalResult += "\n";//funkcja dopisująca linie resultArray do finalResult, dla uproszczenia w tej samej funkcji
    }
  
    
    
    let sum = calcSum(resultArray);//wywołanie funkcji sumującej
    
    for(let i = 0; x = sum.length, i < x; ++i){
        finalResult += '-';
    }
    finalResult += "\n";
    finalResult += sum;//drobne zmiany "estetyczne" i dopisanie sumy, dla uproszczenia umieszczone w tej funkcji
    
    displayResult(finalResult);//wywołanie funkcji wyświetlającej wynik
}




















