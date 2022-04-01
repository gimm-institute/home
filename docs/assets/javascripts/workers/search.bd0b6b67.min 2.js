(()=>{var ge=Object.create;var z=Object.defineProperty,ye=Object.defineProperties,me=Object.getOwnPropertyDescriptor,ve=Object.getOwnPropertyDescriptors,xe=Object.getOwnPropertyNames,G=Object.getOwnPropertySymbols,Se=Object.getPrototypeOf,X=Object.prototype.hasOwnProperty,Qe=Object.prototype.propertyIsEnumerable;var J=(t,e,r)=>e in t?z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,M=(t,e)=>{for(var r in e||(e={}))X.call(e,r)&&J(t,r,e[r]);if(G)for(var r of G(e))Qe.call(e,r)&&J(t,r,e[r]);return t},Z=(t,e)=>ye(t,ve(e)),be=t=>z(t,"__esModule",{value:!0});var K=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Le=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of xe(e))!X.call(t,i)&&(r||i!=="default")&&z(t,i,{get:()=>e[i],enumerable:!(n=me(e,i))||n.enumerable});return t},W=(t,e)=>Le(be(z(t!=null?ge(Se(t)):{},"default",!e&&t&&t.__esModule?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var U=(t,e,r)=>new Promise((n,i)=>{var s=u=>{try{a(r.next(u))}catch(c){i(c)}},o=u=>{try{a(r.throw(u))}catch(c){i(c)}},a=u=>u.done?n(u.value):Promise.resolve(u.value).then(s,o);a((r=r.apply(t,e)).next())});var re=K((ee,te)=>{/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */(function(){var t=function(e){var r=new t.Builder;return r.pipeline.add(t.trimmer,t.stopWordFilter,t.stemmer),r.searchPipeline.add(t.stemmer),e.call(r,r),r.build()};t.version="2.3.9";/*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */t.utils={},t.utils.warn=function(e){return function(r){e.console&&console.warn&&console.warn(r)}}(this),t.utils.asString=function(e){return e==null?"":e.toString()},t.utils.clone=function(e){if(e==null)return e;for(var r=Object.create(null),n=Object.keys(e),i=0;i<n.length;i++){var s=n[i],o=e[s];if(Array.isArray(o)){r[s]=o.slice();continue}if(typeof o=="string"||typeof o=="number"||typeof o=="boolean"){r[s]=o;continue}throw new TypeError("clone is not deep and does not support nested objects")}return r},t.FieldRef=function(e,r,n){this.docRef=e,this.fieldName=r,this._stringValue=n},t.FieldRef.joiner="/",t.FieldRef.fromString=function(e){var r=e.indexOf(t.FieldRef.joiner);if(r===-1)throw"malformed field ref string";var n=e.slice(0,r),i=e.slice(r+1);return new t.FieldRef(i,n,e)},t.FieldRef.prototype.toString=function(){return this._stringValue==null&&(this._stringValue=this.fieldName+t.FieldRef.joiner+this.docRef),this._stringValue};/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */t.Set=function(e){if(this.elements=Object.create(null),e){this.length=e.length;for(var r=0;r<this.length;r++)this.elements[e[r]]=!0}else this.length=0},t.Set.complete={intersect:function(e){return e},union:function(){return this},contains:function(){return!0}},t.Set.empty={intersect:function(){return this},union:function(e){return e},contains:function(){return!1}},t.Set.prototype.contains=function(e){return!!this.elements[e]},t.Set.prototype.intersect=function(e){var r,n,i,s=[];if(e===t.Set.complete)return this;if(e===t.Set.empty)return e;this.length<e.length?(r=this,n=e):(r=e,n=this),i=Object.keys(r.elements);for(var o=0;o<i.length;o++){var a=i[o];a in n.elements&&s.push(a)}return new t.Set(s)},t.Set.prototype.union=function(e){return e===t.Set.complete?t.Set.complete:e===t.Set.empty?this:new t.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))},t.idf=function(e,r){var n=0;for(var i in e)i!="_index"&&(n+=Object.keys(e[i]).length);var s=(r-n+.5)/(n+.5);return Math.log(1+Math.abs(s))},t.Token=function(e,r){this.str=e||"",this.metadata=r||{}},t.Token.prototype.toString=function(){return this.str},t.Token.prototype.update=function(e){return this.str=e(this.str,this.metadata),this},t.Token.prototype.clone=function(e){return e=e||function(r){return r},new t.Token(e(this.str,this.metadata),this.metadata)};/*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */t.tokenizer=function(e,r){if(e==null||e==null)return[];if(Array.isArray(e))return e.map(function(y){return new t.Token(t.utils.asString(y).toLowerCase(),t.utils.clone(r))});for(var n=e.toString().toLowerCase(),i=n.length,s=[],o=0,a=0;o<=i;o++){var u=n.charAt(o),c=o-a;if(u.match(t.tokenizer.separator)||o==i){if(c>0){var h=t.utils.clone(r)||{};h.position=[a,c],h.index=s.length,s.push(new t.Token(n.slice(a,o),h))}a=o+1}}return s},t.tokenizer.separator=/[\s\-]+/;/*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */t.Pipeline=function(){this._stack=[]},t.Pipeline.registeredFunctions=Object.create(null),t.Pipeline.registerFunction=function(e,r){r in this.registeredFunctions&&t.utils.warn("Overwriting existing registered function: "+r),e.label=r,t.Pipeline.registeredFunctions[e.label]=e},t.Pipeline.warnIfFunctionNotRegistered=function(e){var r=e.label&&e.label in this.registeredFunctions;r||t.utils.warn(`Function is not registered with pipeline. This may cause problems when serialising the index.
`,e)},t.Pipeline.load=function(e){var r=new t.Pipeline;return e.forEach(function(n){var i=t.Pipeline.registeredFunctions[n];if(i)r.add(i);else throw new Error("Cannot load unregistered function: "+n)}),r},t.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(r){t.Pipeline.warnIfFunctionNotRegistered(r),this._stack.push(r)},this)},t.Pipeline.prototype.after=function(e,r){t.Pipeline.warnIfFunctionNotRegistered(r);var n=this._stack.indexOf(e);if(n==-1)throw new Error("Cannot find existingFn");n=n+1,this._stack.splice(n,0,r)},t.Pipeline.prototype.before=function(e,r){t.Pipeline.warnIfFunctionNotRegistered(r);var n=this._stack.indexOf(e);if(n==-1)throw new Error("Cannot find existingFn");this._stack.splice(n,0,r)},t.Pipeline.prototype.remove=function(e){var r=this._stack.indexOf(e);r!=-1&&this._stack.splice(r,1)},t.Pipeline.prototype.run=function(e){for(var r=this._stack.length,n=0;n<r;n++){for(var i=this._stack[n],s=[],o=0;o<e.length;o++){var a=i(e[o],o,e);if(!(a==null||a===""))if(Array.isArray(a))for(var u=0;u<a.length;u++)s.push(a[u]);else s.push(a)}e=s}return e},t.Pipeline.prototype.runString=function(e,r){var n=new t.Token(e,r);return this.run([n]).map(function(i){return i.toString()})},t.Pipeline.prototype.reset=function(){this._stack=[]},t.Pipeline.prototype.toJSON=function(){return this._stack.map(function(e){return t.Pipeline.warnIfFunctionNotRegistered(e),e.label})};/*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */t.Vector=function(e){this._magnitude=0,this.elements=e||[]},t.Vector.prototype.positionForIndex=function(e){if(this.elements.length==0)return 0;for(var r=0,n=this.elements.length/2,i=n-r,s=Math.floor(i/2),o=this.elements[s*2];i>1&&(o<e&&(r=s),o>e&&(n=s),o!=e);)i=n-r,s=r+Math.floor(i/2),o=this.elements[s*2];if(o==e||o>e)return s*2;if(o<e)return(s+1)*2},t.Vector.prototype.insert=function(e,r){this.upsert(e,r,function(){throw"duplicate index"})},t.Vector.prototype.upsert=function(e,r,n){this._magnitude=0;var i=this.positionForIndex(e);this.elements[i]==e?this.elements[i+1]=n(this.elements[i+1],r):this.elements.splice(i,0,e,r)},t.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var e=0,r=this.elements.length,n=1;n<r;n+=2){var i=this.elements[n];e+=i*i}return this._magnitude=Math.sqrt(e)},t.Vector.prototype.dot=function(e){for(var r=0,n=this.elements,i=e.elements,s=n.length,o=i.length,a=0,u=0,c=0,h=0;c<s&&h<o;)a=n[c],u=i[h],a<u?c+=2:a>u?h+=2:a==u&&(r+=n[c+1]*i[h+1],c+=2,h+=2);return r},t.Vector.prototype.similarity=function(e){return this.dot(e)/this.magnitude()||0},t.Vector.prototype.toArray=function(){for(var e=new Array(this.elements.length/2),r=1,n=0;r<this.elements.length;r+=2,n++)e[n]=this.elements[r];return e},t.Vector.prototype.toJSON=function(){return this.elements};/*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */t.stemmer=function(){var e={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},r={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},n="[^aeiou]",i="[aeiouy]",s=n+"[^aeiouy]*",o=i+"[aeiou]*",a="^("+s+")?"+o+s,u="^("+s+")?"+o+s+"("+o+")?$",c="^("+s+")?"+o+s+o+s,h="^("+s+")?"+i,y=new RegExp(a),g=new RegExp(c),b=new RegExp(u),m=new RegExp(h),Q=/^(.+?)(ss|i)es$/,p=/^(.+?)([^s])s$/,d=/^(.+?)eed$/,w=/^(.+?)(ed|ing)$/,L=/.$/,k=/(at|bl|iz)$/,I=new RegExp("([^aeiouylsz])\\1$"),j=new RegExp("^"+s+i+"[^aeiouwxy]$"),F=/^(.+?[^aeiou])y$/,A=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,N=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,C=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,$=/^(.+?)(s|t)(ion)$/,T=/^(.+?)e$/,V=/ll$/,B=new RegExp("^"+s+i+"[^aeiouwxy]$"),D=function(l){var v,P,E,f,x,R,_;if(l.length<3)return l;if(E=l.substr(0,1),E=="y"&&(l=E.toUpperCase()+l.substr(1)),f=Q,x=p,f.test(l)?l=l.replace(f,"$1$2"):x.test(l)&&(l=l.replace(x,"$1$2")),f=d,x=w,f.test(l)){var S=f.exec(l);f=y,f.test(S[1])&&(f=L,l=l.replace(f,""))}else if(x.test(l)){var S=x.exec(l);v=S[1],x=m,x.test(v)&&(l=v,x=k,R=I,_=j,x.test(l)?l=l+"e":R.test(l)?(f=L,l=l.replace(f,"")):_.test(l)&&(l=l+"e"))}if(f=F,f.test(l)){var S=f.exec(l);v=S[1],l=v+"i"}if(f=A,f.test(l)){var S=f.exec(l);v=S[1],P=S[2],f=y,f.test(v)&&(l=v+e[P])}if(f=N,f.test(l)){var S=f.exec(l);v=S[1],P=S[2],f=y,f.test(v)&&(l=v+r[P])}if(f=C,x=$,f.test(l)){var S=f.exec(l);v=S[1],f=g,f.test(v)&&(l=v)}else if(x.test(l)){var S=x.exec(l);v=S[1]+S[2],x=g,x.test(v)&&(l=v)}if(f=T,f.test(l)){var S=f.exec(l);v=S[1],f=g,x=b,R=B,(f.test(v)||x.test(v)&&!R.test(v))&&(l=v)}return f=V,x=g,f.test(l)&&x.test(l)&&(f=L,l=l.replace(f,"")),E=="y"&&(l=E.toLowerCase()+l.substr(1)),l};return function(O){return O.update(D)}}(),t.Pipeline.registerFunction(t.stemmer,"stemmer");/*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */t.generateStopWordFilter=function(e){var r=e.reduce(function(n,i){return n[i]=i,n},{});return function(n){if(n&&r[n.toString()]!==n.toString())return n}},t.stopWordFilter=t.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),t.Pipeline.registerFunction(t.stopWordFilter,"stopWordFilter");/*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */t.trimmer=function(e){return e.update(function(r){return r.replace(/^\W+/,"").replace(/\W+$/,"")})},t.Pipeline.registerFunction(t.trimmer,"trimmer");/*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */t.TokenSet=function(){this.final=!1,this.edges={},this.id=t.TokenSet._nextId,t.TokenSet._nextId+=1},t.TokenSet._nextId=1,t.TokenSet.fromArray=function(e){for(var r=new t.TokenSet.Builder,n=0,i=e.length;n<i;n++)r.insert(e[n]);return r.finish(),r.root},t.TokenSet.fromClause=function(e){return"editDistance"in e?t.TokenSet.fromFuzzyString(e.term,e.editDistance):t.TokenSet.fromString(e.term)},t.TokenSet.fromFuzzyString=function(e,r){for(var n=new t.TokenSet,i=[{node:n,editsRemaining:r,str:e}];i.length;){var s=i.pop();if(s.str.length>0){var o=s.str.charAt(0),a;o in s.node.edges?a=s.node.edges[o]:(a=new t.TokenSet,s.node.edges[o]=a),s.str.length==1&&(a.final=!0),i.push({node:a,editsRemaining:s.editsRemaining,str:s.str.slice(1)})}if(s.editsRemaining!=0){if("*"in s.node.edges)var u=s.node.edges["*"];else{var u=new t.TokenSet;s.node.edges["*"]=u}if(s.str.length==0&&(u.final=!0),i.push({node:u,editsRemaining:s.editsRemaining-1,str:s.str}),s.str.length>1&&i.push({node:s.node,editsRemaining:s.editsRemaining-1,str:s.str.slice(1)}),s.str.length==1&&(s.node.final=!0),s.str.length>=1){if("*"in s.node.edges)var c=s.node.edges["*"];else{var c=new t.TokenSet;s.node.edges["*"]=c}s.str.length==1&&(c.final=!0),i.push({node:c,editsRemaining:s.editsRemaining-1,str:s.str.slice(1)})}if(s.str.length>1){var h=s.str.charAt(0),y=s.str.charAt(1),g;y in s.node.edges?g=s.node.edges[y]:(g=new t.TokenSet,s.node.edges[y]=g),s.str.length==1&&(g.final=!0),i.push({node:g,editsRemaining:s.editsRemaining-1,str:h+s.str.slice(2)})}}}return n},t.TokenSet.fromString=function(e){for(var r=new t.TokenSet,n=r,i=0,s=e.length;i<s;i++){var o=e[i],a=i==s-1;if(o=="*")r.edges[o]=r,r.final=a;else{var u=new t.TokenSet;u.final=a,r.edges[o]=u,r=u}}return n},t.TokenSet.prototype.toArray=function(){for(var e=[],r=[{prefix:"",node:this}];r.length;){var n=r.pop(),i=Object.keys(n.node.edges),s=i.length;n.node.final&&(n.prefix.charAt(0),e.push(n.prefix));for(var o=0;o<s;o++){var a=i[o];r.push({prefix:n.prefix.concat(a),node:n.node.edges[a]})}}return e},t.TokenSet.prototype.toString=function(){if(this._str)return this._str;for(var e=this.final?"1":"0",r=Object.keys(this.edges).sort(),n=r.length,i=0;i<n;i++){var s=r[i],o=this.edges[s];e=e+s+o.id}return e},t.TokenSet.prototype.intersect=function(e){for(var r=new t.TokenSet,n=void 0,i=[{qNode:e,output:r,node:this}];i.length;){n=i.pop();for(var s=Object.keys(n.qNode.edges),o=s.length,a=Object.keys(n.node.edges),u=a.length,c=0;c<o;c++)for(var h=s[c],y=0;y<u;y++){var g=a[y];if(g==h||h=="*"){var b=n.node.edges[g],m=n.qNode.edges[h],Q=b.final&&m.final,p=void 0;g in n.output.edges?(p=n.output.edges[g],p.final=p.final||Q):(p=new t.TokenSet,p.final=Q,n.output.edges[g]=p),i.push({qNode:m,output:p,node:b})}}}return r},t.TokenSet.Builder=function(){this.previousWord="",this.root=new t.TokenSet,this.uncheckedNodes=[],this.minimizedNodes={}},t.TokenSet.Builder.prototype.insert=function(e){var r,n=0;if(e<this.previousWord)throw new Error("Out of order word insertion");for(var i=0;i<e.length&&i<this.previousWord.length&&e[i]==this.previousWord[i];i++)n++;this.minimize(n),this.uncheckedNodes.length==0?r=this.root:r=this.uncheckedNodes[this.uncheckedNodes.length-1].child;for(var i=n;i<e.length;i++){var s=new t.TokenSet,o=e[i];r.edges[o]=s,this.uncheckedNodes.push({parent:r,char:o,child:s}),r=s}r.final=!0,this.previousWord=e},t.TokenSet.Builder.prototype.finish=function(){this.minimize(0)},t.TokenSet.Builder.prototype.minimize=function(e){for(var r=this.uncheckedNodes.length-1;r>=e;r--){var n=this.uncheckedNodes[r],i=n.child.toString();i in this.minimizedNodes?n.parent.edges[n.char]=this.minimizedNodes[i]:(n.child._str=i,this.minimizedNodes[i]=n.child),this.uncheckedNodes.pop()}};/*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */t.Index=function(e){this.invertedIndex=e.invertedIndex,this.fieldVectors=e.fieldVectors,this.tokenSet=e.tokenSet,this.fields=e.fields,this.pipeline=e.pipeline},t.Index.prototype.search=function(e){return this.query(function(r){var n=new t.QueryParser(e,r);n.parse()})},t.Index.prototype.query=function(e){for(var r=new t.Query(this.fields),n=Object.create(null),i=Object.create(null),s=Object.create(null),o=Object.create(null),a=Object.create(null),u=0;u<this.fields.length;u++)i[this.fields[u]]=new t.Vector;e.call(r,r);for(var u=0;u<r.clauses.length;u++){var c=r.clauses[u],h=null,y=t.Set.empty;c.usePipeline?h=this.pipeline.runString(c.term,{fields:c.fields}):h=[c.term];for(var g=0;g<h.length;g++){var b=h[g];c.term=b;var m=t.TokenSet.fromClause(c),Q=this.tokenSet.intersect(m).toArray();if(Q.length===0&&c.presence===t.Query.presence.REQUIRED){for(var p=0;p<c.fields.length;p++){var d=c.fields[p];o[d]=t.Set.empty}break}for(var w=0;w<Q.length;w++)for(var L=Q[w],k=this.invertedIndex[L],I=k._index,p=0;p<c.fields.length;p++){var d=c.fields[p],j=k[d],F=Object.keys(j),A=L+"/"+d,N=new t.Set(F);if(c.presence==t.Query.presence.REQUIRED&&(y=y.union(N),o[d]===void 0&&(o[d]=t.Set.complete)),c.presence==t.Query.presence.PROHIBITED){a[d]===void 0&&(a[d]=t.Set.empty),a[d]=a[d].union(N);continue}if(i[d].upsert(I,c.boost,function(pe,de){return pe+de}),!s[A]){for(var C=0;C<F.length;C++){var $=F[C],T=new t.FieldRef($,d),V=j[$],B;(B=n[T])===void 0?n[T]=new t.MatchData(L,d,V):B.add(L,d,V)}s[A]=!0}}}if(c.presence===t.Query.presence.REQUIRED)for(var p=0;p<c.fields.length;p++){var d=c.fields[p];o[d]=o[d].intersect(y)}}for(var D=t.Set.complete,O=t.Set.empty,u=0;u<this.fields.length;u++){var d=this.fields[u];o[d]&&(D=D.intersect(o[d])),a[d]&&(O=O.union(a[d]))}var l=Object.keys(n),v=[],P=Object.create(null);if(r.isNegated()){l=Object.keys(this.fieldVectors);for(var u=0;u<l.length;u++){var T=l[u],E=t.FieldRef.fromString(T);n[T]=new t.MatchData}}for(var u=0;u<l.length;u++){var E=t.FieldRef.fromString(l[u]),f=E.docRef;if(!!D.contains(f)&&!O.contains(f)){var x=this.fieldVectors[E],R=i[E.fieldName].similarity(x),_;if((_=P[f])!==void 0)_.score+=R,_.matchData.combine(n[E]);else{var S={ref:f,score:R,matchData:n[E]};P[f]=S,v.push(S)}}}return v.sort(function(he,fe){return fe.score-he.score})},t.Index.prototype.toJSON=function(){var e=Object.keys(this.invertedIndex).sort().map(function(n){return[n,this.invertedIndex[n]]},this),r=Object.keys(this.fieldVectors).map(function(n){return[n,this.fieldVectors[n].toJSON()]},this);return{version:t.version,fields:this.fields,fieldVectors:r,invertedIndex:e,pipeline:this.pipeline.toJSON()}},t.Index.load=function(e){var r={},n={},i=e.fieldVectors,s=Object.create(null),o=e.invertedIndex,a=new t.TokenSet.Builder,u=t.Pipeline.load(e.pipeline);e.version!=t.version&&t.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+t.version+"' does not match serialized index '"+e.version+"'");for(var c=0;c<i.length;c++){var h=i[c],y=h[0],g=h[1];n[y]=new t.Vector(g)}for(var c=0;c<o.length;c++){var h=o[c],b=h[0],m=h[1];a.insert(b),s[b]=m}return a.finish(),r.fields=e.fields,r.fieldVectors=n,r.invertedIndex=s,r.tokenSet=a.root,r.pipeline=u,new t.Index(r)};/*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */t.Builder=function(){this._ref="id",this._fields=Object.create(null),this._documents=Object.create(null),this.invertedIndex=Object.create(null),this.fieldTermFrequencies={},this.fieldLengths={},this.tokenizer=t.tokenizer,this.pipeline=new t.Pipeline,this.searchPipeline=new t.Pipeline,this.documentCount=0,this._b=.75,this._k1=1.2,this.termIndex=0,this.metadataWhitelist=[]},t.Builder.prototype.ref=function(e){this._ref=e},t.Builder.prototype.field=function(e,r){if(/\//.test(e))throw new RangeError("Field '"+e+"' contains illegal character '/'");this._fields[e]=r||{}},t.Builder.prototype.b=function(e){e<0?this._b=0:e>1?this._b=1:this._b=e},t.Builder.prototype.k1=function(e){this._k1=e},t.Builder.prototype.add=function(e,r){var n=e[this._ref],i=Object.keys(this._fields);this._documents[n]=r||{},this.documentCount+=1;for(var s=0;s<i.length;s++){var o=i[s],a=this._fields[o].extractor,u=a?a(e):e[o],c=this.tokenizer(u,{fields:[o]}),h=this.pipeline.run(c),y=new t.FieldRef(n,o),g=Object.create(null);this.fieldTermFrequencies[y]=g,this.fieldLengths[y]=0,this.fieldLengths[y]+=h.length;for(var b=0;b<h.length;b++){var m=h[b];if(g[m]==null&&(g[m]=0),g[m]+=1,this.invertedIndex[m]==null){var Q=Object.create(null);Q._index=this.termIndex,this.termIndex+=1;for(var p=0;p<i.length;p++)Q[i[p]]=Object.create(null);this.invertedIndex[m]=Q}this.invertedIndex[m][o][n]==null&&(this.invertedIndex[m][o][n]=Object.create(null));for(var d=0;d<this.metadataWhitelist.length;d++){var w=this.metadataWhitelist[d],L=m.metadata[w];this.invertedIndex[m][o][n][w]==null&&(this.invertedIndex[m][o][n][w]=[]),this.invertedIndex[m][o][n][w].push(L)}}}},t.Builder.prototype.calculateAverageFieldLengths=function(){for(var e=Object.keys(this.fieldLengths),r=e.length,n={},i={},s=0;s<r;s++){var o=t.FieldRef.fromString(e[s]),a=o.fieldName;i[a]||(i[a]=0),i[a]+=1,n[a]||(n[a]=0),n[a]+=this.fieldLengths[o]}for(var u=Object.keys(this._fields),s=0;s<u.length;s++){var c=u[s];n[c]=n[c]/i[c]}this.averageFieldLength=n},t.Builder.prototype.createFieldVectors=function(){for(var e={},r=Object.keys(this.fieldTermFrequencies),n=r.length,i=Object.create(null),s=0;s<n;s++){for(var o=t.FieldRef.fromString(r[s]),a=o.fieldName,u=this.fieldLengths[o],c=new t.Vector,h=this.fieldTermFrequencies[o],y=Object.keys(h),g=y.length,b=this._fields[a].boost||1,m=this._documents[o.docRef].boost||1,Q=0;Q<g;Q++){var p=y[Q],d=h[p],w=this.invertedIndex[p]._index,L,k,I;i[p]===void 0?(L=t.idf(this.invertedIndex[p],this.documentCount),i[p]=L):L=i[p],k=L*((this._k1+1)*d)/(this._k1*(1-this._b+this._b*(u/this.averageFieldLength[a]))+d),k*=b,k*=m,I=Math.round(k*1e3)/1e3,c.insert(w,I)}e[o]=c}this.fieldVectors=e},t.Builder.prototype.createTokenSet=function(){this.tokenSet=t.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())},t.Builder.prototype.build=function(){return this.calculateAverageFieldLengths(),this.createFieldVectors(),this.createTokenSet(),new t.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:Object.keys(this._fields),pipeline:this.searchPipeline})},t.Builder.prototype.use=function(e){var r=Array.prototype.slice.call(arguments,1);r.unshift(this),e.apply(this,r)},t.MatchData=function(e,r,n){for(var i=Object.create(null),s=Object.keys(n||{}),o=0;o<s.length;o++){var a=s[o];i[a]=n[a].slice()}this.metadata=Object.create(null),e!==void 0&&(this.metadata[e]=Object.create(null),this.metadata[e][r]=i)},t.MatchData.prototype.combine=function(e){for(var r=Object.keys(e.metadata),n=0;n<r.length;n++){var i=r[n],s=Object.keys(e.metadata[i]);this.metadata[i]==null&&(this.metadata[i]=Object.create(null));for(var o=0;o<s.length;o++){var a=s[o],u=Object.keys(e.metadata[i][a]);this.metadata[i][a]==null&&(this.metadata[i][a]=Object.create(null));for(var c=0;c<u.length;c++){var h=u[c];this.metadata[i][a][h]==null?this.metadata[i][a][h]=e.metadata[i][a][h]:this.metadata[i][a][h]=this.metadata[i][a][h].concat(e.metadata[i][a][h])}}}},t.MatchData.prototype.add=function(e,r,n){if(!(e in this.metadata)){this.metadata[e]=Object.create(null),this.metadata[e][r]=n;return}if(!(r in this.metadata[e])){this.metadata[e][r]=n;return}for(var i=Object.keys(n),s=0;s<i.length;s++){var o=i[s];o in this.metadata[e][r]?this.metadata[e][r][o]=this.metadata[e][r][o].concat(n[o]):this.metadata[e][r][o]=n[o]}},t.Query=function(e){this.clauses=[],this.allFields=e},t.Query.wildcard=new String("*"),t.Query.wildcard.NONE=0,t.Query.wildcard.LEADING=1,t.Query.wildcard.TRAILING=2,t.Query.presence={OPTIONAL:1,REQUIRED:2,PROHIBITED:3},t.Query.prototype.clause=function(e){return"fields"in e||(e.fields=this.allFields),"boost"in e||(e.boost=1),"usePipeline"in e||(e.usePipeline=!0),"wildcard"in e||(e.wildcard=t.Query.wildcard.NONE),e.wildcard&t.Query.wildcard.LEADING&&e.term.charAt(0)!=t.Query.wildcard&&(e.term="*"+e.term),e.wildcard&t.Query.wildcard.TRAILING&&e.term.slice(-1)!=t.Query.wildcard&&(e.term=""+e.term+"*"),"presence"in e||(e.presence=t.Query.presence.OPTIONAL),this.clauses.push(e),this},t.Query.prototype.isNegated=function(){for(var e=0;e<this.clauses.length;e++)if(this.clauses[e].presence!=t.Query.presence.PROHIBITED)return!1;return!0},t.Query.prototype.term=function(e,r){if(Array.isArray(e))return e.forEach(function(i){this.term(i,t.utils.clone(r))},this),this;var n=r||{};return n.term=e.toString(),this.clause(n),this},t.QueryParseError=function(e,r,n){this.name="QueryParseError",this.message=e,this.start=r,this.end=n},t.QueryParseError.prototype=new Error,t.QueryLexer=function(e){this.lexemes=[],this.str=e,this.length=e.length,this.pos=0,this.start=0,this.escapeCharPositions=[]},t.QueryLexer.prototype.run=function(){for(var e=t.QueryLexer.lexText;e;)e=e(this)},t.QueryLexer.prototype.sliceString=function(){for(var e=[],r=this.start,n=this.pos,i=0;i<this.escapeCharPositions.length;i++)n=this.escapeCharPositions[i],e.push(this.str.slice(r,n)),r=n+1;return e.push(this.str.slice(r,this.pos)),this.escapeCharPositions.length=0,e.join("")},t.QueryLexer.prototype.emit=function(e){this.lexemes.push({type:e,str:this.sliceString(),start:this.start,end:this.pos}),this.start=this.pos},t.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1),this.pos+=1},t.QueryLexer.prototype.next=function(){if(this.pos>=this.length)return t.QueryLexer.EOS;var e=this.str.charAt(this.pos);return this.pos+=1,e},t.QueryLexer.prototype.width=function(){return this.pos-this.start},t.QueryLexer.prototype.ignore=function(){this.start==this.pos&&(this.pos+=1),this.start=this.pos},t.QueryLexer.prototype.backup=function(){this.pos-=1},t.QueryLexer.prototype.acceptDigitRun=function(){var e,r;do e=this.next(),r=e.charCodeAt(0);while(r>47&&r<58);e!=t.QueryLexer.EOS&&this.backup()},t.QueryLexer.prototype.more=function(){return this.pos<this.length},t.QueryLexer.EOS="EOS",t.QueryLexer.FIELD="FIELD",t.QueryLexer.TERM="TERM",t.QueryLexer.EDIT_DISTANCE="EDIT_DISTANCE",t.QueryLexer.BOOST="BOOST",t.QueryLexer.PRESENCE="PRESENCE",t.QueryLexer.lexField=function(e){return e.backup(),e.emit(t.QueryLexer.FIELD),e.ignore(),t.QueryLexer.lexText},t.QueryLexer.lexTerm=function(e){if(e.width()>1&&(e.backup(),e.emit(t.QueryLexer.TERM)),e.ignore(),e.more())return t.QueryLexer.lexText},t.QueryLexer.lexEditDistance=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(t.QueryLexer.EDIT_DISTANCE),t.QueryLexer.lexText},t.QueryLexer.lexBoost=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(t.QueryLexer.BOOST),t.QueryLexer.lexText},t.QueryLexer.lexEOS=function(e){e.width()>0&&e.emit(t.QueryLexer.TERM)},t.QueryLexer.termSeparator=t.tokenizer.separator,t.QueryLexer.lexText=function(e){for(;;){var r=e.next();if(r==t.QueryLexer.EOS)return t.QueryLexer.lexEOS;if(r.charCodeAt(0)==92){e.escapeCharacter();continue}if(r==":")return t.QueryLexer.lexField;if(r=="~")return e.backup(),e.width()>0&&e.emit(t.QueryLexer.TERM),t.QueryLexer.lexEditDistance;if(r=="^")return e.backup(),e.width()>0&&e.emit(t.QueryLexer.TERM),t.QueryLexer.lexBoost;if(r=="+"&&e.width()===1||r=="-"&&e.width()===1)return e.emit(t.QueryLexer.PRESENCE),t.QueryLexer.lexText;if(r.match(t.QueryLexer.termSeparator))return t.QueryLexer.lexTerm}},t.QueryParser=function(e,r){this.lexer=new t.QueryLexer(e),this.query=r,this.currentClause={},this.lexemeIdx=0},t.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes;for(var e=t.QueryParser.parseClause;e;)e=e(this);return this.query},t.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},t.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme();return this.lexemeIdx+=1,e},t.QueryParser.prototype.nextClause=function(){var e=this.currentClause;this.query.clause(e),this.currentClause={}},t.QueryParser.parseClause=function(e){var r=e.peekLexeme();if(r!=null)switch(r.type){case t.QueryLexer.PRESENCE:return t.QueryParser.parsePresence;case t.QueryLexer.FIELD:return t.QueryParser.parseField;case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var n="expected either a field or a term, found "+r.type;throw r.str.length>=1&&(n+=" with value '"+r.str+"'"),new t.QueryParseError(n,r.start,r.end)}},t.QueryParser.parsePresence=function(e){var r=e.consumeLexeme();if(r!=null){switch(r.str){case"-":e.currentClause.presence=t.Query.presence.PROHIBITED;break;case"+":e.currentClause.presence=t.Query.presence.REQUIRED;break;default:var n="unrecognised presence operator'"+r.str+"'";throw new t.QueryParseError(n,r.start,r.end)}var i=e.peekLexeme();if(i==null){var n="expecting term or field, found nothing";throw new t.QueryParseError(n,r.start,r.end)}switch(i.type){case t.QueryLexer.FIELD:return t.QueryParser.parseField;case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var n="expecting term or field, found '"+i.type+"'";throw new t.QueryParseError(n,i.start,i.end)}}},t.QueryParser.parseField=function(e){var r=e.consumeLexeme();if(r!=null){if(e.query.allFields.indexOf(r.str)==-1){var n=e.query.allFields.map(function(o){return"'"+o+"'"}).join(", "),i="unrecognised field '"+r.str+"', possible fields: "+n;throw new t.QueryParseError(i,r.start,r.end)}e.currentClause.fields=[r.str];var s=e.peekLexeme();if(s==null){var i="expecting term, found nothing";throw new t.QueryParseError(i,r.start,r.end)}switch(s.type){case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var i="expecting term, found '"+s.type+"'";throw new t.QueryParseError(i,s.start,s.end)}}},t.QueryParser.parseTerm=function(e){var r=e.consumeLexeme();if(r!=null){e.currentClause.term=r.str.toLowerCase(),r.str.indexOf("*")!=-1&&(e.currentClause.usePipeline=!1);var n=e.peekLexeme();if(n==null){e.nextClause();return}switch(n.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:var i="Unexpected lexeme type '"+n.type+"'";throw new t.QueryParseError(i,n.start,n.end)}}},t.QueryParser.parseEditDistance=function(e){var r=e.consumeLexeme();if(r!=null){var n=parseInt(r.str,10);if(isNaN(n)){var i="edit distance must be numeric";throw new t.QueryParseError(i,r.start,r.end)}e.currentClause.editDistance=n;var s=e.peekLexeme();if(s==null){e.nextClause();return}switch(s.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:var i="Unexpected lexeme type '"+s.type+"'";throw new t.QueryParseError(i,s.start,s.end)}}},t.QueryParser.parseBoost=function(e){var r=e.consumeLexeme();if(r!=null){var n=parseInt(r.str,10);if(isNaN(n)){var i="boost must be numeric";throw new t.QueryParseError(i,r.start,r.end)}e.currentClause.boost=n;var s=e.peekLexeme();if(s==null){e.nextClause();return}switch(s.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:var i="Unexpected lexeme type '"+s.type+"'";throw new t.QueryParseError(i,s.start,s.end)}}},function(e,r){typeof define=="function"&&define.amd?define(r):typeof ee=="object"?te.exports=r():e.lunr=r()}(this,function(){return t})})()});var H=K((Ie,ne)=>{"use strict";/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */var we=/["'&<>]/;ne.exports=Ee;function Ee(t){var e=""+t,r=we.exec(e);if(!r)return e;var n,i="",s=0,o=0;for(s=r.index;s<e.length;s++){switch(e.charCodeAt(s)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 39:n="&#39;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}o!==s&&(i+=e.substring(o,s)),o=s+1,i+=n}return o!==s?i+e.substring(o,s):i}});var le=W(re());Object.entries||(Object.entries=function(t){let e=[];for(let r of Object.keys(t))e.push([r,t[r]]);return e});Object.values||(Object.values=function(t){let e=[];for(let r of Object.keys(t))e.push(t[r]);return e});typeof Element!="undefined"&&(Element.prototype.scrollTo||(Element.prototype.scrollTo=function(t,e){typeof t=="object"?(this.scrollLeft=t.left,this.scrollTop=t.top):(this.scrollLeft=t,this.scrollTop=e)}),Element.prototype.replaceWith||(Element.prototype.replaceWith=function(...t){let e=this.parentNode;if(e){t.length===0&&e.removeChild(this);for(let r=t.length-1;r>=0;r--){let n=t[r];typeof n!="object"?n=document.createTextNode(n):n.parentNode&&n.parentNode.removeChild(n),r?e.insertBefore(this.previousSibling,n):e.replaceChild(n,this)}}}));var ie=W(H());function se(t){let e=new Map,r=new Set;for(let n of t){let[i,s]=n.location.split("#"),o=n.location,a=n.title,u=n.tags,c=(0,ie.default)(n.text).replace(/\s+(?=[,.:;!?])/g,"").replace(/\s+/g," ");if(s){let h=e.get(i);r.has(h)?e.set(o,{location:o,title:a,text:c,parent:h}):(h.title=n.title,h.text=c,r.add(h))}else e.set(o,M({location:o,title:a,text:c},u&&{tags:u}))}return e}var oe=W(H());function ae(t,e){let r=new RegExp(t.separator,"img"),n=(i,s,o)=>`${s}<mark data-md-highlight>${o}</mark>`;return i=>{i=i.replace(/[\s*+\-:~^]+/g," ").trim();let s=new RegExp(`(^|${t.separator})(${i.replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&").replace(r,"|")})`,"img");return o=>(e?(0,oe.default)(o):o).replace(s,n).replace(/<\/mark>(\s+)<mark[^>]*>/img,"$1")}}function ue(t){let e=new lunr.Query(["title","text"]);return new lunr.QueryParser(t,e).parse(),e.clauses}function ce(t,e){var i;let r=new Set(t),n={};for(let s=0;s<e.length;s++)for(let o of r)e[s].startsWith(o.term)&&(n[o.term]=!0,r.delete(o));for(let s of r)((i=lunr.stopWordFilter)==null?void 0:i.call(lunr,s.term))&&(n[s.term]=!1);return n}function ke(t,e){let[r,n]=[new Set(t),new Set(e)];return[...new Set([...r].filter(i=>!n.has(i)))]}var q=class{constructor({config:e,docs:r,options:n}){this.options=n,this.documents=se(r),this.highlight=ae(e,!1),lunr.tokenizer.separator=new RegExp(e.separator),this.index=lunr(function(){e.lang.length===1&&e.lang[0]!=="en"?this.use(lunr[e.lang[0]]):e.lang.length>1&&this.use(lunr.multiLanguage(...e.lang));let i=ke(["trimmer","stopWordFilter","stemmer"],n.pipeline);for(let s of e.lang.map(o=>o==="en"?lunr:lunr[o]))for(let o of i)this.pipeline.remove(s[o]),this.searchPipeline.remove(s[o]);this.ref("location"),this.field("title",{boost:1e3}),this.field("text"),this.field("tags",{boost:1e6});for(let s of r)this.add(s)})}search(e){if(e)try{let r=this.highlight(e),n=ue(e).filter(o=>o.presence!==lunr.Query.presence.PROHIBITED),i=this.index.search(`${e}*`).reduce((o,{ref:a,score:u,matchData:c})=>{let h=this.documents.get(a);if(typeof h!="undefined"){let{location:y,title:g,text:b,tags:m,parent:Q}=h,p=ce(n,Object.keys(c.metadata)),d=+!Q+ +Object.values(p).every(w=>w);o.push(Z(M({location:y,title:r(g),text:r(b)},m&&{tags:m.map(r)}),{score:u*(1+d),terms:p}))}return o},[]).sort((o,a)=>a.score-o.score).reduce((o,a)=>{let u=this.documents.get(a.location);if(typeof u!="undefined"){let c="parent"in u?u.parent.location:u.location;o.set(c,[...o.get(c)||[],a])}return o},new Map),s;if(this.options.suggestions){let o=this.index.query(a=>{for(let u of n)a.term(u.term,{fields:["title"],presence:lunr.Query.presence.REQUIRED,wildcard:lunr.Query.wildcard.TRAILING})});s=o.length?Object.keys(o[0].matchData.metadata):[]}return M({items:[...i.values()]},typeof s!="undefined"&&{suggestions:s})}catch(r){console.warn(`Invalid query: ${e} \u2013 see https://bit.ly/2s3ChXG`)}return{items:[]}}};var Y;function Te(t){return U(this,null,function*(){let e="../lunr";if(typeof parent!="undefined"&&"IFrameWorker"in parent){let n=document.querySelector("script[src]"),[i]=n.src.split("/worker");e=e.replace("..",i)}let r=[];for(let n of t.lang){switch(n){case"ja":r.push(`${e}/tinyseg.js`);break;case"hi":case"th":r.push(`${e}/wordcut.js`);break}n!=="en"&&r.push(`${e}/min/lunr.${n}.min.js`)}t.lang.length>1&&r.push(`${e}/min/lunr.multi.min.js`),r.length&&(yield importScripts(`${e}/min/lunr.stemmer.support.min.js`,...r))})}function Pe(t){return U(this,null,function*(){switch(t.type){case 0:return yield Te(t.data.config),Y=new q(t.data),{type:1};case 2:return{type:3,data:Y?Y.search(t.data):{items:[]}};default:throw new TypeError("Invalid message type")}})}self.lunr=le.default;addEventListener("message",t=>U(void 0,null,function*(){postMessage(yield Pe(t.data))}));})();
//# sourceMappingURL=search.bd0b6b67.min.js.map

