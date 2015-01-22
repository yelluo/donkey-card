/**Donkey Card by yelluo 2013-2-17*/
/**赶毛驴扑克游戏，老黄编写*/

var domCanvas=document.getElementById('myowncanvas');
var canvas=domCanvas.getContext('2d');

var array=new Array(54),comarray=new Array(),peoarray=new Array(),comarray2=new Array(),comarray3=new Array();
var sleft=new Array(13),hleft=new Array(13),dleft=new Array(13),cleft=new Array(13),leftnums=new Array(4);
var card,cardcolor,cardnum,handnum,gamenum=0,peowinnum=0,playernum=2;
var xc,yc,xp,yp,xt,yt,xc2,yc2,xc3,yc3;
var xm,ym,height,size,width,span,webwidth,webheight,displaynum,tsize;
var comcardnum,peocardnum,firstplayer='people',current='',tnum,firstcard,secondcard,lastcomcard,lastpeocard;
var gamestata,showcomcard,nocolor,onecolor;

NewGame();

setInterval("IntCheck()",500);

function NewGame()
{	
	document.getElementById("javamessage").style.display="none";		//如果Javascript代码能运行，则不显示相关提示信息。
	playernum=2;
	
	//domCanvas.width="900";
	//if(window.screen.width > 900)
	webwidth=document.documentElement.clientWidth;
	webheight=document.documentElement.clientHeight;
	domCanvas.width=webwidth;														//parseInt(window.screen.width*0.98);
	
	//alert(document.body.offsetHeight+','+document.body.scrollHeight+','+document.body.clientHeight);
	if(webwidth > 580)							//window.screen.height
	{
		xc=10,yc=30,xp=10,yp=530,xt=77,yt=280;
		xm=10,ym=30,height=400,size=60,width=47,span=20,tsize=20;
		xm=parseInt(webwidth/2)-190;
		domCanvas.height="600";
	}
	else if(webwidth > 330)
	{		
		xc=10,yc=30,xp=10,yp=430,xt=77,yt=230;
		xm=10,ym=30,height=300,size=60,width=47,span=20,tsize=18;
		domCanvas.height="500";
		xm=parseInt(webwidth/2)-190;
		if(playernum == 4)
		{
			xm=70,xc2=2,yc2=230,xc3=350,yc3=230;
		}
	}
	else
	{
		xc=5,yc=5,xp=10,yp=230,xt=77,yt=100;
		xm=5,ym=30,height=100,size=60,width=47,span=5,tsize=15;
		xm=parseInt(webwidth/2)-140;
		domCanvas.height="300";
	}
	
	displaynum=parseInt(webwidth/width);
	xt=parseInt(webwidth/2)-width;
	
	if(firstplayer == 'people')					//第一次打开网页，人先出牌，后面的新游戏，电脑和人轮流先出牌
	{
		current='people';
		firstplayer='computer';
	}
	else
	{
		current='computer';
		firstplayer='people';
	}
	
	handnum=7;
	leftcardnum=0;
	showcomcard=1;						//=1表示显示电脑手牌，调试代码时用
		
	comcardnum=0;
	peocardnum=0;
	firstcard=0;
	secondcard=0;
	lastcomcard=0;
	lastpeocard=0;
	gamestata=0;
	nocolor='';							//人手牌没有的花色（通过抓牌看出）
	onecolor='';						//人手牌只有一张的花色（通过拿牌看出）
	tnum=0;
	comarray=[];
	peoarray=[];
	
	canvas.clearRect(xt,yt,width*2,size*2+span);
	
	RandomCards();
	ShowText();		
	
	var i;
	for(i=0;i<13;i++)
	{
		dleft[i]=13-i;					//Diamond A,K,Q...3,2
		cleft[i]=26-i;
		hleft[i]=39-i;
		sleft[i]=52-i;
	}
	
	for(i=0;i<handnum;i++)
	{
		//ShowCard(xc+i*width,yc);
		//ShowCard(xp+i*width,yp);
		ComGetCard();
		PeoGetCard();
	}
	//current='computer';																//测试用
	//comarray=Array(6,7,8,18,20,21,34,31,30);
	//comarray=Array(2,3,4,6,7,9,10,12,13,26);
	//comarray=Array(2,3,4,14,15,16,17,27,28,29,45);		//测试用
	//peoarray=Array(53,54,13);							//测试用
	
	ShowCards();
	
	peoarray.sort(sortNumber);
	comarray.sort(sortNumber);
	setTimeout("ShowCards()",1000);
}

function RandomCards()
{
	for (var i=0;i<54;i++) {
		array[i]=i+1;
	}
	for(var i=0,len=array.length;i<len-1;i++){
		 var pos = i + Math.floor((len - i)*Math.random());
		 var tmp = array[pos];
		 array[pos] = array[i];
		 array[i] = tmp;
	}
	//alert(array.join(', '));
}

function ComGetCard()
{
	if(array.length <= leftcardnum)
	{
		//alert('No card!');
		return 0;
	}
	var card=array.shift();
	comarray.push(card);
	LeftCards(card);
	return card;
}

function PeoGetCard()
{
	if(array.length <= leftcardnum)
	{
		//alert('No card!');
		return 0;
	}
	var card=array.shift();
	peoarray.push(card);
	return card;
}

function GetCardColor(card)
{
	var tmp=parseInt((card-1)/13);
	var color;
	switch(tmp)
	{
	case 0:
		color='diamond';
		break;
	case 1:
		color='club';
		break;
	case 2:
		color='heart';
		break;
	case 3:
		color='spade';
		break;
	default:
		if(card == 53)
			color='s';
		else
			color='h';
	}
	return color;
}

function GetCardNum(card)
{
	var tmp=(card-1) % 13;
	var num;
	switch(tmp)
	{
	case 0:
		if (card == 53)
			num='joker';
		else
			num='2';
		break;
	case 1:
		if (card == 54)
			num='joker';
		else
			num='3';
		break;
	case 9:
		num='j';
		break;
	case 10:
		num='q';
		break;
	case 11:
		num='k';
		break;
	case 12:
		num='a';
		break;
	default:
		num=String(tmp+2);
	}
	return num;
}

function ShowCard(x,y,card,sz)
{
	var cardcolor=GetCardColor(card);
	var cardnum=GetCardNum(card);
	canvas.drawPokerCard(x, y, sz, cardcolor, cardnum);
}

function ShowCards()
{
	var wd,sz;
	
	if(comarray.length > displaynum)
	{
		wd=parseInt(width*displaynum/comarray.length);
		sz=parseInt(wd*4/3);
	}
	else
	{
		wd=width;
		sz=size;
	}

	canvas.clearRect(0,yc,webwidth,size);
	canvas.clearRect(0,yp,webwidth,size);
	xc=webwidth/2-comarray.length/2*wd;
	
	for(var i=0;i<comarray.length;i++)
	{
		if(showcomcard == 1)
		{
			var card=comarray[i];
			var cardcolor=GetCardColor(card);
			var cardnum=GetCardNum(card);
			//alert(cardcolor+' '+cardnum);
			canvas.drawPokerCard(xc+i*wd, yc, sz, cardcolor, cardnum);
		}
		else
			canvas.drawPokerBack(xc+i*wd, yc, sz, '#5C72C2', '#2B4299');
	}
	
	if(peoarray.length > displaynum)
	{
		wd=parseInt(width*displaynum/peoarray.length);
		sz=parseInt(wd*4/3);
	}
	else
	{
		wd=width;
		sz=size;
	}
	xp=webwidth/2-peoarray.length/2*wd;
	for(i=0;i<peoarray.length;i++)
	{
		var card=peoarray[i];
		var cardcolor=GetCardColor(card);
		var cardnum=GetCardNum(card);
		//alert(cardcolor+' '+cardnum);
		canvas.drawPokerCard(xp+i*wd, yp, sz, cardcolor, cardnum);
	}
	ShowText();
}

function ShowText()
{
	canvas.clearRect(xm,ym+height/2,1400,tsize);
	canvas.fillStyle='#00f';
	canvas.font=tsize+'px sans-serif';
	canvas.textBaseline='top';
	canvas.fillText('牌堆剩'+array.length+'张。你的获胜局数/总局数：'+peowinnum+'/'+gamenum,xm,ym+height/2);
	//canvas.fillText('牌堆剩余'+array.length+'张：'+array.join(', '),x,y+height/2);
	//canvas.font='bold 30px sans-serif';
	//轮廓字符串    canvas.strokeText('示例文字',x,y+height/2+100);
}

function PeoClick(x,y)
{
	var wd,sz;
	
	if(peoarray.length > displaynum)
	{
		wd=parseInt(width*displaynum/peoarray.length);
		sz=parseInt(wd*4/3);
	}
	else
	{
		wd=width;
		sz=size;
	}
	
	if (y >= yp && y <= yp+sz)
	{
		var i=parseInt((x-xp)/wd);
		if (i < peoarray.length && x-xp-i*wd <= parseInt(sz*3/4))
		{
			var card=peoarray[i];
			if(card < 53 || peoarray.length == 1 || (peoarray.length == 2 && peoarray[0] >=53 && peoarray[1] >=53))
			{
				peoarray.splice(i,1);
				ShowCards();
				if(GetCardColor(card) == onecolor)			//人打出的牌为手牌中该花色唯一的牌，电脑知道人手牌再无该花色牌
				{
					nocolor=onecolor;
					onecolor='';
				}
				LeftCards(card);
				return card;
			}
		}
	}
	return 0;
}

function PeoAnswer(x,y,card)
{
	var wd,sz,tcard,i,j;
	
	for(j=0;j<peoarray.length;j++)
	{
		tcard=peoarray[j];
		if(GetCardColor(tcard) == GetCardColor(card) || peoarray[j] >= 53)
			break;		
	}
	if(j >= peoarray.length)		//无此花色的牌和王牌，鼠标点击任意位置都开始抓牌
		return 0;
	
	if(peoarray.length > displaynum)
	{
		wd=parseInt(width*displaynum/peoarray.length);
		sz=parseInt(wd*4/3);
	}
	else
	{
		wd=width;
		sz=size;
	}
	
	if (y >= yp && y <= yp+sz)
	{
		i=parseInt((x-xp)/wd);
		if (i < peoarray.length && x-xp-i*wd <= parseInt(sz*3/4))		//有效点击
		{
			tcard=peoarray[i];
			if(GetCardColor(tcard) == GetCardColor(card))
			{
				peoarray.splice(i,1);
				ShowCards();
				//if(peoarray.length == 0)
				//	current='stop';				
				if(GetCardColor(tcard) == onecolor)			//人打出的牌为手牌中该花色唯一的牌，电脑知道人手牌再无该花色牌
				{
					nocolor=onecolor;
					onecolor='';
				}				
				LeftCards(tcard);
				return tcard;
			}
			else
			{
				for(j=0;j<peoarray.length;j++)
				{
					tcard=peoarray[j];
					if(GetCardColor(tcard) == GetCardColor(card))
					{
						break;
					}
				}
				if(j >= peoarray.length)		//无此花色的牌
				{
					if(peoarray[i] >= 53)				//点中王牌
					{
						tcard=peoarray[i];
						peoarray.splice(i,1);
						ShowCards();
						nocolor=GetCardColor(card);
						return tcard;
					}
					else if(peoarray[0] >= 53)	//有王牌，但未点中，等待再次选择
					{
						return -1;
					}
				}
				else													//有该花色，但未点中，等待再次选择
				{
					return -1;
				}
			}					
			return 0;														//无可出的牌
		}
	}
	return -1;
}

function ComAnswer(card)
{
	var maxi=-1,mini=-1,tcard;
	if(card >= 53)
	{
		if(comarray[0] >= 53)
		{
			tcard=comarray[0];
			comarray.splice(0,1);
			ShowCards();
			return tcard;
		}
		else
			return 0;
	}
	for(var i=comarray.length-1;i>=0;i--)
	{
		if(GetCardColor(comarray[i]) == GetCardColor(card))
		{
			maxi=i;
			if(mini == -1)					//记录最小的同花色牌
				mini=i;
			if(comarray[i] > card)
				break;
		}
	}
	if(maxi >= 0)
	{
		if(comarray[maxi] > card)		//找到比对方大的牌，出其中最小的牌
		{
			tcard=comarray[maxi];
			comarray.splice(maxi,1);
		}
		else												//没有比对方大的牌，出最小的同花色牌
		{
			tcard=comarray[mini];
			comarray.splice(mini,1);			
		}
		ShowCards();
		return tcard;
	}
	else if(comarray[0] >= 53)
	{
		tcard=comarray[0];
		comarray.splice(0,1);
		ShowCards();
		return tcard;
	}
	return 0;
}

function ComSelect()
{
	//var card=comarray.pop();
	//alert(nocolor);
	var snum=0,hnum=0,dnum=0,cnum=0,i,ti,flag=0;
	var num,card,index,mini,maxi,mcolor,minit;
	
	num=comarray.length;
	for(i=0;i<num;i++)
	{
		switch(GetCardColor(comarray[i]))
		{
		case 'spade':
			snum++;
			break;
		case 'heart':
			hnum++;
			break;
		case 'club':
			cnum++;
			break;
		case 'diamond':
			dnum++;		
		}
	}
	
	switch(num)
	{
	case 1:
		card=comarray.pop();
		break;
	case 2:
		if(comarray[0] >= 53)																		//不先出王牌
			card=comarray.pop();
		else if(GetCardColor(comarray[1]) == nocolor)
		{
			if(GetCardColor(comarray[0]) != nocolor)							//优先出对方没有的花色牌
				card=comarray.pop();
			else if(array.length > leftcardnum)									//两张都是对方没有的花色牌，如果牌堆有牌，则出大牌
				card=comarray.shift();
			else																									//两张都是对方没有的花色牌，如果牌堆没牌，则出小牌
				card=comarray.pop();
		}
		else if((comarray[0]-1)%13 < (comarray[1]-1)%13)			//没有对方没有的花色牌，出大牌
			card=comarray.pop();
		else 
			card=comarray.shift();
		break;
	default:
		if(comarray[1] >= 53)
			i=2;										//card=comarray.splice(2,1);
		else if(comarray[0] >= 53)
			i=1;										//card=comarray.splice(1,1);
		else
			i=0;										//card=comarray.shift();
		index=i;						//寻找手牌中的点数最大牌
		ti=i;								//记录开始搜寻的位置
		while(i < num-1)
		{
			if(GetCardColor(comarray[i]) == nocolor)						//找到人手牌没有的花色（根据前面出牌情况）
			{
				if(array.length > leftcardnum)											//牌堆还有牌，则出点数大的牌
				{
					if(comarray[i] != comarray[i+1]+1)										//没有同色套牌，就选择该花色最大的牌
					{
						index=i;
						flag=1;
						break;
					}
					else																									//选择同色套牌(如987)中的最小牌(7)
					{
						i++;
						index=i;
					}
				}
				else																								//牌堆没有牌，则出点数小的牌
				{
					if(GetCardColor(comarray[i+1]) == nocolor)
					{
						i++;
						index=i;
					}
					else
					{
						index=i;
						flag=1;
						break;
					}
				}
			}
			else
				i++;
		}
		if(flag == 0)									//找不到人手牌没有的花色，则寻找是否有比某一剩余花色牌都大的手牌（选其中的最小牌）
		{
			for(i=num-1;i >= ti;i--)				//起始搜寻点（0，1或2）
			{	
				card=comarray[i];
				switch(GetCardColor(card))
				{
				case 'diamond':
					if(card > dleft[0])
					{
						flag=1;										//找到比剩余方块牌都大的最小手牌
						index=i;
					}
					break;
				case 'club':
					if(card > cleft[0])
					{
						flag=1;										//找到比剩余梅花牌都大的最小手牌
						index=i;
					}
					break;
				case 'heart':
					if(card > hleft[0])
					{
						flag=1;										//找到比剩余红桃牌都大的最小手牌
						index=i;
					}
					break;
				case 'spade':
					if(card > sleft[0])
					{
						flag=1;										//找到比剩余黑桃牌都大的最小手牌
						index=i;
					}
				}
				if(flag == 1)
					break;
			}
		}
		if(flag == 0)									//找不到人手牌没有的花色，则寻找最大点数；如果存在几张最大点数牌，记录第一张的序号
		{
			i=ti;															//开始搜寻点
			while(i < num-1)
			{	
				if((comarray[i+1]-1)%13 > (comarray[index]-1)%13)
					index=i+1;
				i++;
			}
									//如果没找到人手牌没有的花色牌，则需要再搜寻套牌中的最小牌
			
			var tnum=0,tacolor=new Array('','','',''),tncolor=new Array(0,0,0,0),maxcolors=new Array(0,0,0,0);
			for(i=0;i<num;i++)
			{
				if((comarray[i]-1)%13 == (comarray[index]-1)%13)			//存在2张以上的相同点数大牌
				{
					switch(GetCardColor(comarray[i]))
					{
					case 'spade':
						tncolor[3]=snum;
						tacolor[3]='spade';
						break;
					case 'heart':
						tncolor[2]=hnum;
						tacolor[2]='heart';
						break;
					case 'club':
						tncolor[1]=cnum;
						tacolor[1]='club';
						break;
					case 'diamond':
						tncolor[0]=dnum;
						tacolor[0]='diamond';
					}
					tnum++;
				}
			}
			//alert(tnum+':'+tncolor);
			var maxnum=0,maxcolor='';
			if(snum > maxnum && tncolor[3] != 0)
			{
				maxnum=snum;
				maxcolor='spade';
			}
			if(hnum > maxnum && tncolor[2] != 0)
			{
				maxnum=hnum;
				maxcolor='heart';
			}
			if(cnum > maxnum && tncolor[1] != 0)
			{
				maxnum=cnum;
				maxcolor='club';
			}
			if(dnum > maxnum && tncolor[0] != 0)
			{
				maxnum=dnum;
				maxcolor='diamond';
			}
			
			if(dnum == maxnum && tncolor[0] != 0)							//存储最大牌的花色
				maxcolors[0]=1;
			if(cnum == maxnum && tncolor[1] != 0)
				maxcolors[1]=1;
			if(hnum == maxnum && tncolor[2] != 0)
				maxcolors[2]=1;
			if(snum == maxnum && tncolor[3] != 0)
				maxcolors[3]=1;
			//alert(comarray[index]+';'+maxcolors);
			mini=-1;																		//几个套牌的最小牌
			maxi=index;																		//套牌的当前牌
			mcolor=GetCardColor(comarray[index]);					//当前套牌的花色
			for(i=index;i < num;i++)
			{
				//alert(parseInt((comarray[i]-1)/13)+','+i+','+comarray[i]);
				if(maxcolors[parseInt((comarray[i]-1)/13)] != 1)			//只分析有最大点的花色
					continue;
				else
				{
					if(mini == -1)							//记录套牌中更小的牌
					{
						mini=i;						
					}
					if(i == 0 || parseInt((comarray[i]-1)/13) != parseInt((comarray[i-1]-1)/13))		//套牌起点
					{
						maxi=i;
						mcolor=GetCardColor(comarray[i]);
					}
				}
				if(comarray[maxi] == comarray[i+1]+1 && GetCardColor(comarray[i+1]) == mcolor)	//找到同色套牌
				{
					maxi++;
					minit=i+1;
					if((comarray[minit]-1)%13 < (comarray[mini]-1)%13)							//记录套牌中更小的牌
						mini=minit;
					//alert(comarray[minit]);
				}
			}
			index=mini;		
		}
		card=comarray[index];
		comarray.splice(index,1);
		if(card == 0)
			alert("代码bug, index="+index+"。我正在修复这个问题。");
		card=1.2;
	}
	ShowCards();
	return card;
}

function sortNumber(a,b)
{
	return b - a;
}

function OnClickEvent(x,y)
{
	var tcard;
		
	if (current == 'stop')
	{
		alert('游戏结束');
	}
	else
	{
		if (current == 'people')
		{
			if(tnum%2 == 0)							//人先出牌
			{
				firstcard=PeoClick(x,y);				
			}
			else											//人跟牌
			{
				secondcard=PeoAnswer(x,y,firstcard);				
			}
		}
	}
	if(tnum == 0)
	{
		canvas.clearRect(xt,yt,width*2,size*2+span);		
	}	
}

function IntCheck()									//电脑和人出牌或跟牌，每半秒检查一次
{
	//var t=new Date();
	//document.getElementById("clock").value=t;
	
	//document.getElementById("clock").value=current+':'+firstcard+','+secondcard;
	//document.getElementById("javamessage").innerHTML='';
	//document.getElementById("javamessage").style.display="block";			//调试时显示相关信息用
	//document.getElementById("javamessage").innerHTML=current+':'+firstcard+','+secondcard+'.'+peoarray.length;
	//document.getElementById("javamessage").innerHTML="S"+sleft.length+":"+sleft+",<br>H"+hleft.length+":"+hleft+",<br>C"+cleft.length+":"+cleft+",<br>D"+dleft.length+":"+dleft+".";

	if(current == 'computer')
	{
		if(tnum%2 == 0)							//电脑出牌
		{
			firstcard=ComSelect();
			tnum++;							
			//ShowCard(xt+parseInt(tnum/2)*width,yt,firstcard);
			canvas.clearRect(xt+size*3/4+2,yt,size*3/4+2,size*2+span);
			ShowCard(xt+size*3/4+2,yt,firstcard,size);
			if(lastpeocard > 0)
			{
				canvas.clearRect(xt,yt,size*3/4+2,size*2+span);
				ShowCard(xt,yt,lastcomcard,parseInt(size*3/4));
				ShowCard(xt,yt+size+span,lastpeocard,parseInt(size*3/4));
			}
			lastcomcard=firstcard;
			if(comarray.length > 0)
			{
				current='people';
				secondcard=-1;
			}
			else
			{
				current='stop';
				gamenum++;
				ShowText();
				alert('你输了！');
			}
		}
		else											//电脑跟牌
		{
			if(gamestata == 0)
			{
				secondcard=ComAnswer(firstcard);
				if(secondcard != 0)					//有牌可跟
				{
					lastcomcard=secondcard;
					//ShowCard(xt+parseInt(tnum/2)*width,yt,secondcard);
					ShowCard(xt+size*3/4+2,yt,secondcard,size);	
					tnum++;
					if(comarray.length == 0)
					{
						current='stop';
						gamenum++;
						ShowText();
						alert('你输了！');
					}
					else if(secondcard < firstcard)	//电脑跟牌比人出的牌小
					{
						current='people';
						firstcard=0;
					}
					else															//电脑跟牌比人出的牌大，下一轮先出牌
					{
						firstcard=0;
					}						
				}
				else
					gamestata=1;
			}
			if(gamestata == 1)												//电脑无牌可跟
			{
				var tcard;
				if(firstcard < 53)
					tcard=ComGetCard();
				if(firstcard >= 53 || tcard == 0)					//人倒数第二张出王牌，或牌堆无牌
				{
					comarray.push(firstcard);											//电脑获得人刚才出的牌
					comarray.sort(sortNumber);
					ShowCards();
					//canvas.clearRect(xt+parseInt(tnum/2)*width,yt+size+span,width,size);
					canvas.clearRect(xt+size*3/4+2,yt+size+span,size*3/4+2,size);
					tnum--;
					current='people';														//下一轮人先出牌
					firstcard=0;
					lastcomcard=0;
					gamestata=0;
				}
				else										//电脑从牌堆抓牌
				{
					if(GetCardColor(tcard) == GetCardColor(firstcard) || tcard >= 53)
					{
						secondcard=tcard;
						comarray.pop();
						ShowCards();
						lastcomcard=secondcard;						
						//ShowCard(xt+parseInt(tnum/2)*width,yt,secondcard);
						ShowCard(xt+size*3/4+2,yt,secondcard,size);	
						tnum++;
						if(secondcard < firstcard)	//电脑跟牌比人出的牌小
						{
							current='people';
							firstcard=0;
						}
						else											//电脑跟牌比人出的牌大，下一轮先出牌
						{
							firstcard=0;
						}
						gamestata=0;
					}
					else										//没抓到同花色牌或王牌
					{									
						comarray.sort(sortNumber);
						ShowCards();
					}
				}
			}			
		}
	}
	else if(current == 'people')
	{
		if(tnum%2 == 0)							//人先出牌
		{
			if (firstcard != 0)
			{
				//ShowCard(xt+parseInt(tnum/2)*width,yt+size+span,firstcard);
				canvas.clearRect(xt+size*3/4+2,yt,size*3/4+2,size*2+span);
				ShowCard(xt+size*3/4+2,yt+size+span,firstcard,size);
				if(lastcomcard > 0)
				{
					canvas.clearRect(xt,yt,size*3/4+2,size*2+span);
					ShowCard(xt,yt,lastcomcard,parseInt(size*3/4));
					ShowCard(xt,yt+size+span,lastpeocard,parseInt(size*3/4));
				}
				lastpeocard=firstcard;
				tnum++;
				if(peoarray.length > 0)
				{
					current='computer';
					secondcard=-1;
				}
				else
				{
					current='stop';
					gamenum++;
					peowinnum++;
					ShowText();
					alert('你赢了！');
				}
			}
		}
		else									//人跟牌
		{
			if(secondcard > 0)				//有牌可跟
			{
				lastpeocard=secondcard;
				//ShowCard(xt+parseInt(tnum/2)*width,yt+size+span,secondcard);
				ShowCard(xt+size*3/4+2,yt+size+span,secondcard,size);
				tnum++;					
				if(peoarray.length == 0)
				{
					current='stop';
					gamenum++;
					peowinnum++;
					ShowText();
					alert('你赢了！');
				}
				else if(secondcard > firstcard)	//人跟的牌比电脑出的牌大，下一轮先出牌
				{
					firstcard=0;
					if(secondcard >= 53)
						nocolor=GetCardColor(firstcard);	//人跟王牌，说明没有该花色牌，如果电脑手牌还有该花色，下次出牌时将选择该花色牌
				}							
				else														//人跟的牌比电脑出的牌小，下一轮电脑先出牌
				{
					current='computer';
					firstcard=0;
				}
			}
			else if(secondcard == 0)						//人无牌可跟
			{
				nocolor=GetCardColor(firstcard);			//电脑看出人手上没有该花色牌，如果电脑手牌还有该花色，下次出牌时将选择该花色牌
				tcard=PeoGetCard();
				if(tcard != 0)
				{
					if(GetCardColor(tcard) == GetCardColor(firstcard) || tcard >= 53)
					{
						secondcard=tcard;
						peoarray.pop();
						LeftCards(tcard);
						lastpeocard=secondcard;
						//ShowCard(xt+parseInt(tnum/2)*width,yt+size+span,secondcard);
						ShowCard(xt+size*3/4+2,yt+size+span,secondcard,size);
						tnum++;
						if(secondcard < firstcard)				//人跟牌比电脑出的牌小
						{
							current='computer';
							firstcard=0;							
						}							
						else												//人跟牌比电脑出的牌大，下一轮先出牌
							firstcard=0;
					}
					else										//没抓到合适的牌，继续抓牌
					{									
						peoarray.sort(sortNumber);
						ShowCards();						
					}
				}
				else									//牌堆无牌
				{
					onecolor=nocolor;				//电脑记录下人手牌该花色牌只有一张
					nocolor='';
					peoarray.push(firstcard);											//人获得电脑刚才出的牌
					peoarray.sort(sortNumber);
					ShowCards();
					//canvas.clearRect(xt+parseInt(tnum/2)*width,yt,width,size);
					canvas.clearRect(xt+size*3/4+2,yt,size*3/4+2,size);
					tnum--;
					current='computer';
					firstcard=0;
					lastpeocard=0;
				}
			}
		}
	}
}

function LeftCards(card)
{
	var tcolor,tnum,i;
	tcolor=GetCardColor(card);
	switch(tcolor)
	{
	case 'diamond':
		for(i=0;i<dleft.length;i++)
		{
			if(dleft[i] == card)
			{
				dleft.splice(i,1);
				if(dleft.length == 0)
					nocolor='diamond';
				break;
			}
		}
		break;
	case 'club':
		for(i=0;i<cleft.length;i++)
		{
			if(cleft[i] == card)
			{
				cleft.splice(i,1);
				if(cleft.length == 0)
					nocolor='club';
				break;
			}
		}
		break;
	case 'heart':
		for(i=0;i<hleft.length;i++)
		{
			if(hleft[i] == card)
			{
				hleft.splice(i,1);
				if(hleft.length == 0)
					nocolor='heart';
				break;
			}
		}
		break;
	case 'spade':
		for(i=0;i<sleft.length;i++)
		{
			if(sleft[i] == card)
			{
				sleft.splice(i,1);
				if(sleft.length == 0)
					nocolor='spade';
				break;
			}
		}
	}
}

domCanvas.addEventListener('click', function(e) {
		var x=e.pageX - e.target.offsetLeft,	y=e.pageY - e.target.offsetTop;
		
		OnClickEvent(x,y);
	
		//console.dir(e)
	});
