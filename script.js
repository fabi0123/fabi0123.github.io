let sign;
let signup;
let signdown;

function coefficient(n, k) {
  nfac = factorialize(n)
  kfac = factorialize(k)
  nkfac = factorialize(n-k)
  let coe = nfac/(kfac*nkfac)
  return coe
}

function binomialpdf(n, k, p) {
  let result = coefficient(n, k)*Math.pow(p, k)*Math.pow(1-p,n-k)
  return result
}

function binomialcdf(n, k, p, sign, kl, kr) {
  let res = 0
  let calcHelp = 0;
  let calcHelpl = 0;
  let calcHelpr = 0;
  if (sign === "<=") {
    for (let i = 0; i <= k; i++) {
      res += binomialpdf(n, i, p)  
    }

  } else if (sign === ">=") {
    for (let i = 0; i <= k-1; i++) {
      calcHelp += binomialpdf(n, i, p)  
    }
    res = 1-calcHelp

  } else if (sign === ">") {
    for (let i = 0; i <= k; i++) {
      calcHelp += binomialpdf(n, i, p)  
    }
    res = 1-calcHelp
  } else if (sign === "<") {
    for (let i = 0; i <= k-1; i++) {
      res += binomialpdf(n, i, p)  
    }
  } else if (sign === 'k') {
    if (signup === "<-up") {
      for (let i = 0; i <= kl-1; i++) {
        calcHelpl += binomialpdf(n, i, p)  
      }
    } else if (signup === "<=-up") {
      for (let i = 0; i <= kl; i++) {
        calcHelpl += binomialpdf(n, i, p)  
      }
    }
    if (signdown === "<-down") {
      for (let i = 0; i <= kr-1; i++) {
        calcHelpr += binomialpdf(n, i, p)  
      }
    } else if (signdown === "<=-down") {
      for (let i = 0; i <= kr; i++) {
        calcHelpr += binomialpdf(n, i, p)  
      }
    }
    res = calcHelpr - calcHelpl
  }

  displayAns(res)
}

function factorialize(num) {
  var result = num
  if (num === 0 || num === 1) return 1;
  while (num > 1) { 
    num--
    result *= num
  }
  return result
}

function displayAns(ans, error) {
  if (error) {
    document.getElementById('answer').innerHTML = `Error: ${ans}`
  } else {
    document.getElementById('answer').innerHTML = `Answer: ${ans}`
  }
}


//Button Listener
document.querySelectorAll('.sign-selector').forEach(button => {
  button.addEventListener('click', (e) => {
    //Style
    document.querySelectorAll('.sign-selector').forEach(but => {
     but.classList.remove('greyed-out')
     but.classList.remove('selected')
    })

    if (button.id === "k") {
      document.getElementById('k').classList.add('greyed-out')
      document.querySelectorAll('.sign-selector2').forEach(but => {
        but.classList.remove('disabled')
        but.addEventListener('click', b => {

          if (but.id === '<-up') {
            document.getElementById('<=-up').classList.add('greyed-out')
            document.getElementById('<-up').classList.remove('greyed-out')
            signup = but.id
          } else if (but.id === '<=-up') {
            signup = but.id
            document.getElementById('<-up').classList.add('greyed-out')
            document.getElementById('<=-up').classList.remove('greyed-out')
          }

          if (but.id === '<-down') {
            document.getElementById('<=-down').classList.add('greyed-out')
            document.getElementById('<-down').classList.remove('greyed-out')
            signdown = but.id
          } else if (but.id === '<=-down') {
            signdown = but.id
            document.getElementById('<-down').classList.add('greyed-out')
            document.getElementById('<=-down').classList.remove('greyed-out')
          }
        })
      })
    } else {
      document.getElementById('k').classList.remove('greyed-out')
      document.querySelectorAll('.sign-selector2').forEach(but => {
        but.classList.add('disabled')
      })
    }

    button.classList.add('selected')
    sign = button.id
    document.querySelectorAll('.sign-selector').forEach(but => {
      if (!but.classList.contains('selected')) {
        but.classList.add('greyed-out')
      }
    })
  })
})

//Calc Button
document.getElementById('calc').addEventListener('click', () => {
    //Read inputs
    let n = parseInt(document.getElementById('n').value)
    let k = parseInt(document.getElementById('k').value)
    let p = parseFloat(document.getElementById('p').value)
    let kleft = parseInt(document.getElementById('k-left').value)
    let kright = parseInt(document.getElementById('k-right').value)
    

    //Calc

    if (typeof kleft !== 'number' || typeof kright !== 'number' || typeof n !== 'number' || typeof k !== 'number' || typeof p !== 'number') return displayAns("The inputs can't be empty", true)
    if (isNaN(n) || isNaN(k) || isNaN(p)) return displayAns("The inputs can't be empty", true)
    if (p > 1 || p < 0) return displayAns("0<=p<=1", true);
    if (k < 0) return displayAns("0>=k", true);
    if (n < 0) return displayAns("0>=n", true);
    if (n < k) return displayAns("n>=k", true);
    if (typeof sign === 'undefined') return displayAns('No sign selected', true);
    if (typeof signup === 'undefined' && sign === 'k') return displayAns('No sign selected', true);
    if (typeof signdown === 'undefined' && sign === 'k') return displayAns('No sign selected', true);
    if (sign === 'k' && kleft < 0 || sign === 'k' && kleft > kright) displayAns("Invalid input", true);
    if (sign === 'k' && kright < 0 || sign === 'k' && kright > n) displayAns("Invalid input", true);

  if (sign === '=') {
    displayAns(binomialpdf(n, k, p))
  } else {
    binomialcdf(n, k, p, sign, kleft, kright)
  }

})




//?<n<?
// setInterval(() => {
//   document.getElementById('display-k').innerHTML = document.getElementById('k').value 
// }, 50);
