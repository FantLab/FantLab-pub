/* FL tickets.js v2.1.1
 * https://github.com/parserpro/fantlab_pub/blob/master/public/js/tickets.js
 * Live demo : https://jsbin.com/sumudah/
 * ========================================================================
 * Copyright 2018, Oreon (for FantLab.RU)
 * Licensed under CC-BY-SA (https://creativecommons.org/licenses/by-sa/4.0/deed.ru)
 * ======================================================================== */


function ticketsToggle()
{
  var e = document.getElementById("ticketsdiv");
  var l = document.getElementById("ticketslink");
  //var t = document.getElementById("tickets_text");

  if (!e) return true;
  if (e.style.display=="none")
  {
    e.innerHTML = '';
    var frm = document.createElement('frm');
	
    var s='<div id="ticketsdiv" width="100%">\
      <form name="ticketsform" action="/addticket" method="post" enctype="multipart/form-data">\
      Тип заявки: \
      <select id="tickets_type" name="tickets_type" style="border:1px solid black;" onchange="select_ttype();">\
      <option>Общая заявка</option>\
      <optgroup label="для изданий">\
      <option>Добавить / Дополнить издание</option>\
      <option>Подтвердить (Озеленить) издание</option>\
      </optgroup>\
      <optgroup label="для произведений">\
      <option>Добавить произведение автору</option>\
      <option>Прислать интересный факт (для примечания)</option>\
      </optgroup></select><br><br>\
      <div id="tbl"></div>\
      <input type="hidden" name="tickets_add_new" value="yes">\
      <input type="hidden" name="tickets_old_action" value="show">\
	  <input type="hidden" id="tickets_text" name="tickets_text">\
      </form>  </div>';
          
    frm.innerHTML = s;
    e.appendChild(frm);
    
    document.getElementById("tickets_type").onchange(); 
	
    e.style.display="block";
    l.style.display="none";
    // t.focus();
  }
  else
  {
    e.style.display="none";
    l.style.display="block";
  }
  return true;
}

function select_ttype()
{
  var ttype=document.getElementById("tickets_type"),
      index = ttype.selectedIndex,
      ur=window.location.pathname,
      f=true,
      nm=document.title,
      tbl=document.getElementById("tbl");
  tbl.innerHTML = '';  
  
  var s='<table width="600" cellpadding="2" cellspacing="0" border="0"><tr valign="top" align="right"><td></td>\
      <td style="text-align:right"><a target=_blank href="/forum/forum2page1/topic6005page1">*правила оформления заявок на издание</a></td></tr>\
      <tr><td><B>Тема заявки</B></td><td width="100%">\
      <input id="tickets_name" name="tickets_name" type="text" style="border:1px solid black;width:100%" value="'+nm+'">\
      </td></tr><tr valign="top"><td>';

  switch(index)
  {

    case 0: {
      s+='<nobr>Опишите, что нужно</nobr><br>исправить или дополнить</td>\
      <td width="100%"><textarea id="tickets_txt" name="tickets_txt" style="border:1px solid black;width:100%;height:150px"></textarea>\
      </td></tr>';
    } break;

    // добавить издание
    case 1: {
      if (ur.indexOf('edition')==-1 & ur.indexOf('autor')==-1 & ur.indexOf('work')==-1 & ur.indexOf('series')==-1) {
        f=false; 
  		s='<div style="color: red;"><BR><big>Заявку этого типа можно отправлять лишь <BR>со страниц издания, произведения автора или серии\
  	    	любого из произведений книги!</big><BR>(Если на сайте нет даже автора - воспользуйтесь общей формой заявки)<div><BR><BR>';
      }
      else {
        s+='Название</td><td width="100%" nowrap>';
        // nm=document.querySelector('[itemprop=name]').textContent;
        s+= '<input type="edit" id="t_name" name="t_name" value="" style="width:100%" required><addr title="строго как в книге!"></addr></td></tr>';
        // nm=document.querySelector('[itemprop=author]').textContent;
        s+= '<tr><td>Автор</td><td nowrap>\
             <input type="edit" id="t_autors" name="t_autors" value="" style="width:100%"><addr title="можно несколько через запятую, строго как в книге"></addr></td></tr> ';
    
        s+= '<tr><td>Язык</td><td><input type="edit" id="t_language" name="t_language" value="русский"></td></tr> ';
      
        //nm=document.querySelector('[itemprop=publisher]').textContent;
        s+= '<tr><td>Издательство</td><td nowrap>\
             <input type="edit" id="t_publisher" name="t_publisher" value="" style="width:100%"><addr title="можно несколько через запятую, плюс город"></addr></td></tr> ';
    
        s+= '<tr><td>Серия</td><td nowrap>\
             <input type="edit" id="t_series" name="t_series" style="width:100%"><addr title="плюс номер тома если есть"></addr></td></tr> ';
    
        //nm=document.querySelector('[itemprop=copyrightYear]').textContent;
        s+= '<tr><td>Год</td><td><input type="edit" id="t_year" name="t_year" value="" style="width:50px"></td></tr> ';
        s+= '<tr><td>Тираж</td><td><input type="edit" id="t_count" name="t_count"></td></tr> ';
        s+= '<tr><td>Страниц</td><td><input type="edit" id="t_plength" name="t_plength" value="" style="width:50px"></td></tr> ';
  
        //nm=document.querySelector('[itemprop=isbn]').textContent;
        s+= '<tr><td>ISBN</td><td nowrap>\
             <input type="edit" id="t_isbn" name="t_isbn" value="" style="width:100%"><addr title="можно несколько через запятую"></addr></td></tr> ';
  
        //nm=document.querySelector('[itemprop=bookFormat]').textContent;
        s+= '<tr><td>Тип обложки</td><td><select id="t_covertype" name="t_covertype"> \
					<option>не известен</option>\
					<option>мягкая</option>\
					<option>твёрдая</option>\
					<option>дутая</option>\
					<option>кожаная</option>\
					<option>интегральная</option>\
				</select>';

        //input type="edit" id="t_covertype" name="t_covertype" value="" style="width:100%"></td></tr> ';
        s+= '<tr><td>Формат</td><td>\
             <input type="edit" id="t_format" name="t_format"><addr title="в стиле: 84x108\/32"></addr></td></tr> ';
  
        s+= '<tr><td>Описание</td><td nowrap><textarea id="t_descript" name="t_descript" \
             style="width:100%;" rows=4></textarea><addr title="сюда пишем базовую информацию,\
что перед нами за книга, типа: &quot;Сборник избранных произведений автора&quot; \
и ОБЯЗАТЕЛЬНО здесь же указываем художников книги, отдельно, если указано, - художника обложки; иначе ПИШЕМ - \
&quot;художник не указан&quot;"></addr></td></tr> ';
        s+= '<tr><td>Содержание</td><td nowrap>\
             <textarea id="t_content" name="t_content" style="width:100%;" rows=8></textarea><addr title="здесь указываем отдельными строками, строго как в книге, название, тип (что это: рассказ, роман, сказка... - если в книге указано), \
переводчик и, для каждого произведения, страницы от и до, начиная со шмуцтитула, сверенные по книге, а не по содержанию"></addr></td></tr>';
        s+= '<tr><td>Примечание</td><td nowrap>\
             <textarea id="t_note" name="t_note" style="width:100%;" rows=4></textarea><addr title="Здесь пишем любую доп. информацию, которая не подошла по формату полям выше, \
плюс свои пожелания и замечания администратору, который будет обрабатывать заявку"></addr></td></tr> ';
        s+= '<tr><td></td><td align="center"><label><input id="t_green" name="t_green" type="checkbox" onchange="set_stop();">\
Информация внесена с бумажной книги, полная и достоверная (можно ставить зелёную рамку)</label>';
      }
    } break;

    // озеленить
    case 2: {
      if (ur.indexOf('edition')==-1) {
        f=false; 
  		s='<div style="color: red;"><BR><big>Заявку этого типа можно отправлять лишь <BR>со страницы издания!</big><div><BR><BR>';
  	  }
      else {		
         s+= '<tr><td></td><td align="center"><label><input id="t_green" name="t_green" type="checkbox"> Подтверждаю: сверено с бумажной книгой - информация в карточке издания полная и достоверная, можно ставить зелёную рамку</label>';	
    	 s+= '<tr><td>Примечание</td><td nowrap><textarea id="t_note" name="t_note" \
              style="width:100%;" rows=4></textarea><addr title="любая доп. информация, пожелания администратору или уточнения вида: &quot;всё верно, сверено по книге, \
плюс дизайнер обложки (или любой другой параметр издания поменять или дополнить) - такой-то&quot;"></addr></td></tr> ';
      }
    } break;

    // добавить ворк
    case 3: {
      if (ur.indexOf('autor')==-1) {
        f=false; 
  		s='<div style="color: red;"><BR><big>Заявку этого типа можно отправлять лишь <BR>со страницы автора!</big><div><BR><BR>';
  		break; 
      }
      else {
    	s+= '<tr><td>Название</td> <td width="100%"><input type="edit" id="t_name" name="t_name" style="width:100%"></td></tr>';
        s+= '<tr><td>Год</td><td><input type="edit" id="t_year" name="t_year"></td></tr> ';
    	s+= '<tr><td>Форма произв-я</td> <td width="100%"><input type="edit" id="t_worktype" name="t_worktype"></td></tr>';
    	s+= '<tr><td>Примечание</td><td><textarea id="t_note" name="t_note" style="width:100%;height:30px"></textarea></td></tr> ';
    	s+= '<tr><td>Ссылка на источник</td><td width="100%" nowrap>\
             <input type="edit" id="t_url" name="t_url" style="width:100%"><addr title="крайне желательна ссылка на источник"></addr></td></tr>';
      }
    } break;

    // интересный факт
    case 4: {
        s+= '<tr><td>Интересный факт</td><td nowrap><textarea id="t_content" name="t_content" \
             style="width:100%;" rows=6></textarea><addr title="Примечание, которое будет интересно широкому кругу читателей, из истории сосздания \
произведения, его героев, связь с реальностью и т.п."></addr></td></tr> ';
	
    	s+='<tr><td>Ссылка на источник</td><td width="100%" nowrap>\
            <input type="edit" id="t_url" name="t_url" style="width:100%"><addr title="для одобрения вашего &quot;факта&quot;, крайне желательно указать источник"></addr></td></tr>';
    } break;
  }
  // end case

  if (f) {
    s+= '<tr valign="top" align="left"><td>Прикрепить файл</td>\
         <td width="100%"><input name="tickets_file" type="file" style="border:1px solid black;width:100%" value="">\
         &nbsp;<font size="-2" color="gray">(несколько файлов можно послать одним архивом)</font></td></tr>\
         </td> </tr>\
         <tr align="center"> <td colspan="2">\
         <input type="submit" style="cursor:pointer" onclick="return ticketsSubmit();" style="width:144px" value="отправить заявку">\
         <input type="button" style="cursor:pointer" value="отмена" onclick="return ticketsToggle()">\
         </td></tr></table>'; 
  }
    
  var trtd = document.createElement('trtd');
  trtd.innerHTML=s;
  tbl.appendChild(trtd);
}


function set_stop()
{
  if (document.getElementById("t_green").checked) {
    document.getElementById("t_autors").required = true; 
    document.getElementById("t_publisher").required = true; 
    document.getElementById("t_year").required = true; 
    document.getElementById("t_plength").required = true; 
    document.getElementById("t_content").required = true; 
  }
  else {
    document.getElementById("t_autors").required = false; 
    document.getElementById("t_publisher").required = false;
    document.getElementById("t_year").required = false;
    document.getElementById("t_plength").required = false;
    document.getElementById("t_content").required = false;
  }
}


function ticketsSubmit()
{
  if (document.getElementById("tickets_name").value.length<1)
  {
    alert("Укажите тему заявки!");
    return false
  }
  
  var ttype=document.getElementById("tickets_type"),
      index = ttype.selectedIndex,
      s='Тип заявки: '+ document.getElementById("tickets_type").value+'\n\n';
  
  switch(index)
  {
    case 0: {
      s+=document.getElementById("tickets_txt").value;
    } break;      

    case 1: {
      s+='Название: '+document.getElementById("t_name").value+ '\n\
Автор: '+document.getElementById("t_autors").value+ '\n\
Язык: '+document.getElementById("t_language").value+ '\n\
Издательство: '+document.getElementById("t_publisher").value+ '\n\
Серия: 	— '+document.getElementById("t_series").value+ '\n\
Год: '+document.getElementById("t_year").value+ '\n\
Тираж: '+document.getElementById("t_count").value+ '\n\
Страниц: '+document.getElementById("t_plength").value+ '\n\
ISBN: '+document.getElementById("t_isbn").value+ '\n\
Тип обложки: '+document.getElementById("t_covertype").value+ '\n\
Формат: '+document.getElementById("t_format").value+ '\n\
Описание: '+document.getElementById("t_descript").value+ '\n\n\
Содержание: '+document.getElementById("t_content").value+ '\n\n\
Примечание: '+document.getElementById("t_note").value+ '\n\n';
	  if (document.getElementById("t_green").checked) {s+='Информация внесена с бумажной книги, полная и достоверная (можно ставить зелёную рамку)'}
    } break;

    case 2: {
      s+='Примечание: '+document.getElementById("t_note").value+ '\n\n';
      if (document.getElementById("t_green").checked) {s+='Подтверждаю: сверено с бумажной книгой - информация в карточке издания полная и достоверная, можно ставить зелёную рамку'}
    } break;

    case 3: {
      s+='Название: '+document.getElementById("t_name").value+'\n\
Год: '+document.getElementById("t_year").value+'\n\
Форма: '+document.getElementById("t_worktype").value+'\n\
Примечание: '+document.getElementById("t_note").value+'\n\
Источник: '+document.getElementById("t_url").value;
    } break;

    case 4: {
      s+='Интересный факт: '+document.getElementById("t_content").value+'\n\
Примечание: '+document.getElementById("t_note").value+'\n\
Источник: '+document.getElementById("t_url").value;

    } break;
  }
  document.getElementById("tickets_text").value=s;  
  
  if (document.getElementById("tickets_text").value.length<1)
  {
    alert("Опишите заявку!");
    return false
  }
  else
  {
    ticketsform.submit();
    this.disabled=true;
   }
}

