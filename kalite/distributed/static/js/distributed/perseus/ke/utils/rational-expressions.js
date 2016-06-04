(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$.extend(KhanUtil,{getPermutations:function(t){function i(t){for(var n=0;n<t.length;n++){var s=t.splice(n,1)[0];r.push(s),0===t.length&&e.push(r.slice()),i(t),t.splice(n,0,s),r.pop()}return e}var e=[],r=[];return i(t)},writeExpressionFraction:function(t,i){return"1"===i.toString()?t.toString():"-1"===i.toString()?t.multiply(-1).toString():t.isNegative()?"-\\dfrac{"+t.multiply(-1).toString()+"}{"+i.toString()+"}":i.isNegative()?"-\\dfrac{"+t.toString()+"}{"+i.multiply(-1).toString()+"}":"\\dfrac{"+t.toString()+"}{"+i.toString()+"}"},Term:function(t,i,e){if(this.coefficient=t,this.variables={},void 0===e&&(e=1),"string"==typeof i)for(var r=0;r<i.length;r++)this.variables[i.charAt(r)]=e;else void 0!==i&&(this.variables=i);this.variableString="";for(var n in this.variables)0!==this.variables[n]?this.variableString+=n+this.variables[n]:delete this.variables[n];this.isNegative=function(){return this.coefficient<0},this.add=function(t){var i=[this.coefficient,this.variables];return t instanceof KhanUtil.RationalExpression?t.add(this):t instanceof KhanUtil.Term?new KhanUtil.RationalExpression([i,[t.coefficient,t.variables]]):new KhanUtil.RationalExpression([i,t])},this.isOne=function(){return"1"===this.toString()},this.evaluate=function(t){var i=this.coefficient;return"number"==typeof t?_.each(this.variables,function(e){i*=Math.pow(t,e)}):_.each(this.variables,function(e,r){i*=Math.pow(t[r],e)}),i},this.multiply=function(t){if(t instanceof KhanUtil.RationalExpression)return t.multiply(this);var i=this.coefficient,e=_.clone(this.variables);if("number"==typeof t)i*=t;else{i*=t.coefficient;for(var r in t.variables)null!=e[r]?e[r]+=t.variables[r]:e[r]=t.variables[r]}return new KhanUtil.Term(i,e)},this.divide=function(t){var i=this.coefficient,e=_.clone(this.variables);if("number"==typeof t)i/=t;else{i/=t.coefficient;for(var r in t.variables)e[r]?e[r]-=t.variables[r]:e[r]=-t.variables[r]}return new KhanUtil.Term(i,e)},this.getGCD=function(t){if(t instanceof KhanUtil.RationalExpression)return t.getGCD(this);if("number"==typeof t)return KhanUtil.getGCD(this.coefficient,t);var i=KhanUtil.getGCD(this.coefficient,t.coefficient),e={};for(var r in this.variables)t.variables[r]&&(e[r]=Math.min(this.variables[r],t.variables[r]));return new KhanUtil.Term(i,e)},this.toString=function(t){if(0===this.coefficient)return"";var i="";t?i+=this.coefficient>=0?" + ":" - ":this.coefficient<0&&(i+="-");var e=Math.abs(this.coefficient);return 1===e&&""!==this.variableString||(i+=e),_.each(this.variables,function(t,e){0!==t&&(i+=e,1!==t&&(i+="^"+t))}),i},this.toStringFactored=function(){return this.toString()},this.getEvaluateString=function(t,i,e){var r="";i?r+=this.coefficient>=0?" + ":" - ":this.coefficient<0&&(r+="-");var n=Math.abs(this.coefficient);return 1===n&&""!==this.variableString||(r+=n,""!==this.variableString&&(r+="\\cdot")),_.each(this.variables,function(i,n){var s="number"==typeof t?t:t[n];void 0!==e&&(s="\\"+e+"{"+s+"}"),r+=0>s||1===i?s:"("+s+")^"+i}),r},this.regex=function(){return"^"+this.regexForExpression()+"$"},this.regexForExpression=function(t){if(0===this.coefficient)return"";var i;i=this.coefficient<0?t?"[-\\u2212]\\s*":"\\s*[-\\u2212]\\s*":t?"\\+\\s*":"\\s*",1===Math.abs(this.coefficient)&&""!==this.variableString||(i+=Math.abs(this.coefficient));var e=[];for(var r in this.variables)0!==o&&e.push([r,this.variables[r]]);if(e.length>1){var n=KhanUtil.getPermutations(e);i+="(?:";for(var s=0;s<n.length;s++){var a=n[s];i+="(?:";for(var h=0;h<a.length;h++){var r=a[h][0],o=a[h][1];i+=o>1?r+"\\s*\\^\\s*"+o:r}i+=s<n.length-1?")|":")"}i+=")"}else if(1===e.length){var r=e[0][0],o=e[0][1];i+=o>1?r+"\\s*\\^\\s*"+o:r}return i+"\\s*"}},RationalExpression:function(t){this.terms=[];for(var i=0;i<t.length;i++){var e,r=t[i];e="number"==typeof r?new KhanUtil.Term(r):r instanceof KhanUtil.Term?new KhanUtil.Term(r.coefficient,r.variables):new KhanUtil.Term(r[0],r[1]),0!==e.coefficient&&this.terms.push(e)}this.getCoefficient=function(t){for(var i=0,e=0;e<this.terms.length;e++)this.terms[e].variableString===t&&(i+=this.terms[e].coefficient);return i},this.combineLikeTerms=function(){for(var t={},i=0;i<this.terms.length;i++){var e=this.terms[i],r=e.variableString;t[r]?t[r].coefficient+=e.coefficient:t[r]=e}this.terms=[];for(var n in t)0!==t[n].coefficient&&this.terms.push(t[n])},this.combineLikeTerms(),this.isEqualTo=function(t){var i=this.terms.length,e=t.terms.length;if(i!==e)return!1;for(var r=0;i>r;r++){for(var n=this.terms[r],s=!1,a=0;e>a;a++){var h=t.terms[a];if(n.coefficient===h.coefficient&&n.variableString===h.variableString){s=!0;break}}if(!s)return!1}return!0},this.isNegative=function(){return this.terms[0].coefficient<0},this.getCoefficentOfTerm=function(t,i){var e="";""===t?e="":void 0!==t&&0!==i&&(i=i||1,e=t+i);for(var r=0;r<this.terms.length;r++)if(this.terms[r].variableString===e)return this.terms[r].coefficient;return 0},this.evaluate=function(t){for(var i=0,e=0;e<this.terms.length;e++)i+=this.terms[e].evaluate(t);return i},this.add=function(t){for(var i=[],e=0;e<this.terms.length;e++){var r=this.terms[e];i.push([r.coefficient,r.variables])}if(t instanceof KhanUtil.Term)i.push(new KhanUtil.Term(t.coefficient,t.variables));else if("number"==typeof t)i.push(new KhanUtil.Term(t));else for(var e=0;e<t.terms.length;e++){var r=t.terms[e];i.push([r.coefficient,r.variables])}var n=new KhanUtil.RationalExpression(i);return n.combineLikeTerms(),n},this.multiply=function(t){var i;i=t instanceof KhanUtil.RationalExpression?t.terms:"number"==typeof t||t instanceof KhanUtil.Term?[t]:[new KhanUtil.Term(1,t)];for(var e=[],r=0;r<i.length;r++)for(var n=i[r],s=0;s<this.terms.length;s++)e.push(this.terms[s].multiply(n));return new KhanUtil.RationalExpression(e)},this.divide=function(t){if(t instanceof KhanUtil.RationalExpression){if(1===t.terms.length)return this.divide(t.terms[0]);var i=this.factor(),e=t.factor();if(i[1].isEqualTo(e[1])){var r=i[0].divide(e[0]);return new KhanUtil.RationalExpression([r])}if(i[1].isEqualTo(e[1].multiply(-1))){var r=i[0].divide(e[0]).multiply(-1);return new KhanUtil.RationalExpression([r])}return!1}for(var n=[],s=0;s<this.terms.length;s++)n.push(this.terms[s].divide(t));return new KhanUtil.RationalExpression(n)},this.getGCD=function(t){var i,e=this.getTermsGCD();if(t instanceof KhanUtil.Term)i=e.getGCD(t);else{if(!(t instanceof KhanUtil.RationalExpression))return KhanUtil.getGCD(t,e.coefficient);i=e.getGCD(t.getTermsGCD())}return i.coefficient<0&&(i.coefficient*=-1),i},this.getTermsGCD=function(){for(var t=this.terms[0],i=0;i<this.terms.length;i++)t=t.getGCD(this.terms[i]);return this.isNegative()&&(t=t.multiply(-1)),t},this.factor=function(){var t=this.getTermsGCD(),i=this.divide(t);return[t,i]},this.toString=function(){if(0===this.terms.length)return"0";for(var t=this.terms[0].toString(),i=1;i<this.terms.length;i++)t+=this.terms[i].toString(""!==t);return""!==t?t:"0"},this.toStringFactored=function(t){var i=this.factor();if(1===this.terms.length||i[0].isOne())return t?"("+this.toString()+")":this.toString();var e="-1"===i[0].toString()?"-":i[0].toString();return e+="("+i[1].toString()+")"},this.getEvaluateString=function(t,i){for(var e=this.terms[0].getEvaluateString(t,!1,i),r=1;r<this.terms.length;r++)e+=this.terms[r].getEvaluateString(t,!0,i);return""!==e?e:"0"},this.getTermsRegex=function(t,i,e){var r="";i=i?"|(?:^"+i:"|(?:^",e=e?e+"$)":"$)";for(var n=0;n<t.length;n++){r+=i;for(var s=t[n],a=0;a<s.length;a++)r+=s[a].regexForExpression(a);r+=e}return r},this.regex=function(t){var i=KhanUtil.getPermutations(this.terms),e=this.getTermsRegex(i).slice(1);if(!t||1===this.terms.length)return e;var r=this.factor();return i=KhanUtil.getPermutations(r[1].terms),e+=r[0].isOne()?this.getTermsRegex(i,"\\s*\\(","\\)\\s*"):"-1"===r[0].toString()?this.getTermsRegex(i,"\\s*[-\\u2212]\\s*\\(","\\)\\s*"):this.getTermsRegex(i,r[0].regexForExpression()+"\\*?\\s*\\(","\\)\\s*"),r[0]=r[0].multiply(-1),r[1]=r[1].multiply(-1),i=KhanUtil.getPermutations(r[1].terms),e+=r[0].isOne()?this.getTermsRegex(i,"\\s*\\(","\\)\\s*"):"-1"===r[0].toString?this.getTermsRegex(i,"\\s*[-\\u2212]\\s*\\(","\\)\\s*"):this.getTermsRegex(i,r[0].regexForExpression()+"\\*?\\s*\\(","\\)\\s*")}}});
},{}]},{},[1]);
