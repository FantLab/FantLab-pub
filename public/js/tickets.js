/* FL tickets.js v2.2
 * https://github.com/parserpro/fantlab_pub/blob/master/public/js/tickets.js
 * Live demo : https://jsbin.com/sumudah/
 * ========================================================================
 * Copyright 2018, Oreon (for FantLab.RU)
 * Licensed under CC-BY-SA (https://creativecommons.org/licenses/by-sa/4.0/deed.ru)
 * ======================================================================== */


function ticketsToggle()
{
  var e = document.getElementById("ticketsdiv"),
      l = document.getElementById("ticketslink");


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
      <optgroup label="для произведений">\
      <option>Добавить произведение</option>\
      <option>Прислать интересный факт (для примечания)</option>\
      </optgroup>\
      <optgroup label="для изданий">\
      <option>Добавить / Дополнить издание</option>\
      <option>Подтвердить (Озеленить) издание</option>\
      </optgroup>\
      </select><br><br>\
      <div id="tickets_type_div"></div>\
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
      tbl=document.getElementById("tickets_type_div");
  tbl.innerHTML = '';  

  var 
      s='<div style="text-align: right"><a target=_blank href="/forum/forum2page1/topic6005page1">*правила оформления заявок на издание</a></div>\
      <div class="form-group"><label for="tickets_name"><B>Тема заявки</B></label>\
      <input id="tickets_name" name="tickets_name" type="text" value="'+nm+'"></div>';
     
  switch(index)
  {

    case 0: {
      s+='<div class="form-group"><label for="tickets_txt"><nobr>Опишите, что нужно</nobr><br>исправить или<BR>дополнить</label>\
      <textarea id="tickets_txt" name="tickets_txt" rows=5></textarea></div>';
    } break;

    // добавить издание
     case 3: {
      if (!ur.indexOf('edition')==-1 & ur.indexOf('autor')==-1 & ur.indexOf('work')==-1 & ur.indexOf('series')==-1) {
        f=false; 
      s='<div style="color: red; text-align: center"><BR><big>Заявку этого типа можно отправлять лишь<BR>со страниц издания, произведения, автора или серии\
          любого из произведений книги!</big><BR>(Если на сайте нет даже автора - воспользуйтесь общей формой заявки)<div><BR><BR>';
      }
      else {
        s+= '<div class="form-group"><label for="t_name">Название</label>';
        // nm=document.querySelector('[itemprop=name]').textContent;
        s+= '<input type="text" id="t_name" name="t_name" value="" required><addr data-toggle="tooltip" data-container="body" title="строго как в книге!"></addr></div>';
        // nm=document.querySelector('[itemprop=author]').textContent;
        s+= '<div class="form-group"><label for="t_autors">Автор</label>\
             <input type="text" id="t_autors" name="t_autors" value=""><addr data-toggle="tooltip" data-container="body" title="можно несколько через запятую, строго как в книге"></addr></div>';
    
        s+= '<div class="form-group"><label for="t_language">Язык</label>\
             <input type="text" id="t_language" name="t_language" value="русский" style="width:140px"></div>';
      
        //nm=document.querySelector('[itemprop=publisher]').textContent;
        s+= '<div class="form-group"><label for="t_publisher">Издательство</label>\
             <input type="text" id="t_publisher" name="t_publisher" value=""><addr data-toggle="tooltip" data-container="body" title="можно несколько через запятую, плюс город"></addr></div>';
    
        s+= '<div class="form-group"><label for="t_series">Серия</label>\
             <input type="text" id="t_series" name="t_series"><addr data-toggle="tooltip" data-container="body" title="плюс номер тома если есть"></addr></div>';
    
        //nm=document.querySelector('[itemprop=copyrightYear]').textContent;
        s+= '<div class="form-group"><label for="t_year">Год</label>\
             <input type="text" id="t_year" name="t_year" value="" style="width:50px"></div>';
        s+= '<div class="form-group"><label for="t_count">Тираж</label>\
            <input type="text" id="t_count" name="t_count" style="width:50px"></div>';
        s+= '<div class="form-group"><label for="t_plength">Страниц</label>\
            <input type="text" id="t_plength" name="t_plength" value="" style="width:50px"></div>';
  
        //nm=document.querySelector('[itemprop=isbn]').textContent;
        s+= '<div class="form-group"><label for="t_isbn">ISBN</label>\
             <input type="text" id="t_isbn" name="t_isbn" value=""><addr data-toggle="tooltip" data-container="body" title="можно несколько через запятую"></addr></div>';
  
        //nm=document.querySelector('[itemprop=bookFormat]').textContent;
        s+= '<div class="form-group"><label for="t_covertype">Тип обложки</label>\
          <select id="t_covertype" name="t_covertype"> \
          <option>не известен</option>\
          <option>мягкая</option>\
          <option>твёрдая</option>\
          <option>дутая</option>\
          <option>кожаная</option>\
          <option>интегральная</option>\
        </select></div>';

        s+= '<div class="form-group"><label for="t_format">Формат</label>\
             <input type="text" id="t_format" name="t_format" style="width:140px"><addr data-toggle="tooltip" data-container="body" title="в стиле: 84x108\/32"></addr></div>';
  
        s+= '<div class="form-group"><label for="t_descript">Описание</label>\
             <textarea id="t_descript" name="t_descript" \
             rows=4></textarea><addr data-toggle="tooltip" data-container="body" title="сюда пишем базовую информацию,\
что перед нами за книга, типа: &quot;Сборник избранных произведений автора&quot; \
и ОБЯЗАТЕЛЬНО здесь же указываем художников книги, отдельно, если указано, - художника обложки; иначе ПИШЕМ - \
&quot;художник не указан&quot;"></addr></div>';
        s+= '<div class="form-group"><label for="t_content">Содержание</label>\
             <textarea id="t_content" name="t_content" rows=8></textarea><addr data-toggle="tooltip" data-container="body" title="здесь указываем отдельными строками, строго как в книге, название, тип (что это: рассказ, роман, сказка... - если в книге указано), \
переводчик и, для каждого произведения, страницы от и до, начиная со шмуцтитула, сверенные по книге, а не по содержанию"></addr></div>';
        s+= '<div class="form-group"><label for="t_note">Примечание</label>\
             <textarea id="t_note" name="t_note" rows=4></textarea><addr data-toggle="tooltip" data-container="body" title="Здесь пишем любую доп. информацию, которая не подошла по формату полям выше, \
плюс свои пожелания и замечания администратору, который будет обрабатывать заявку"></addr></div>';
        s+= '<div class="div_green"><label><input id="t_green" name="t_green" type="checkbox" onchange="set_stop();">\
             Информация внесена с бумажной книги, полная и достоверная (можно ставить зелёную рамку)</label></div><br>';
      }
    } break;

    // озеленить
    case 4: {   
      if (ur.indexOf('edition')==-1) {
        f = false; 
        s = '<div style="color: red; text-align: center"><BR><big>Заявку этого типа можно отправлять лишь <BR>со страницы издания!</big><div><BR><BR>';
      }
      else {    
        s+= '<div class="div_green"><label><input id="t_green" name="t_green" type="checkbox" onchange="set_stop();">\
            Подтверждаю: сверено с бумажной книгой - информация в карточке издания полная и достоверная, можно ставить зелёную рамку</label></div><br>'; 
        s+= '<div class="form-group"><label for="t_note">Примечание</label><textarea id="t_note" name="t_note" rows=4>\
              </textarea><addr data-toggle="tooltip" data-container="body" title="любая доп. информация, пожелания администратору или уточнения вида: &quot;всё верно, сверено по книге, \
плюс дизайнер обложки (или любой другой параметр издания поменять или дополнить) - такой-то&quot;"></addr></div>';
      }
    } break;

    // добавить ворк
    case 1: {
      if (ur.indexOf('autor')==-1 & ur.indexOf('series')==-1) {
        f=false; 
      s='<div style="color: red;"><BR><big>Заявку этого типа можно отправлять лишь <BR>со страницы автора или цикла!</big><div><BR><BR>';
      break; 
      }
      else {
      s+= '<div class="form-group"><label for="t_name">Название</label><input type="text" id="t_name" name="t_name"></div>';
      s+= '<div class="form-group"><label for="t_year">Год</label><input type="text" id="t_year" name="t_year" style="width:50px"></div>';
      s+= '<div class="form-group"><label for="t_worktype">Форма произв-я</label><input type="text" id="t_worktype" name="t_worktype" style="width:140px"></div>';
      s+= '<div class="form-group"><label for="t_note">Примечание</label>\
            <textarea id="t_note" name="t_note" rows=4></textarea></div>';
      s+= '<div class="form-group"><label for="t_url">Ссылка на источник</label>\
            <input type="text" id="t_url" name="t_url"><addr data-toggle="tooltip" data-container="body" title="крайне желательна ссылка на источник"></addr></div>';
      }
    } break;

    // интересный факт
    case 2: {
      s+= '<div class="form-group"><label for="t_name">Интересный факт</label><textarea id="t_content" name="t_content" rows=6>\
           </textarea><addr data-toggle="tooltip" data-container="body" title="Примечание, которое будет интересно широкому кругу читателей, из истории создания произведения, его героев, связь с реальностью и т.п."></addr></div>';
  
      s+= '<div class="form-group"><label for="t_name">Ссылка на источник</label>\
           <input type="text" id="t_url" name="t_url" <addr data-toggle="tooltip" data-container="body" title="для одобрения вашего &quot;факта&quot;, крайне желательно указать источник"></addr></div>';
    } break;
  }
  // end case

  if (f) {
    s+= '<div class="form-group"><label>Прикрепить файл</label><input name="tickets_file" type="file" value=""></div>\
         <div class="form-group"><label>&nbsp;</label>&nbsp;<font size="-2" color="gray">(несколько файлов можно послать одним архивом)</font></div>\
         <label>&nbsp;</label><div align="center"><input type="submit" style="cursor:pointer" onclick="return ticketsSubmit();" style="width:144px" value="отправить заявку">\
         <input type="button" style="cursor:pointer" value="отмена" onclick="return ticketsToggle()"></div>'; 
  }
    
  var trtd = document.createElement('trtd');
  trtd.innerHTML=s;
  tbl.appendChild(trtd);
  $('[data-toggle="tooltip"]').tooltip();  
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

    case 3: {
      s+='Название: '+document.getElementById("t_name").value+ '\n\
Автор: '+document.getElementById("t_autors").value+ '\n\
Язык: '+document.getElementById("t_language").value+ '\n\
Издательство: '+document.getElementById("t_publisher").value+ '\n\
Серия:  — '+document.getElementById("t_series").value+ '\n\
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

    case 4: {
      s+='Примечание: '+document.getElementById("t_note").value+ '\n\n';
      if (document.getElementById("t_green").checked) {s+='Подтверждаю: сверено с бумажной книгой - информация в карточке издания полная и достоверная, можно ставить зелёную рамку'}
    } break;

    case 1: {
      s+='Название: '+document.getElementById("t_name").value+'\n\
Год: '+document.getElementById("t_year").value+'\n\
Форма: '+document.getElementById("t_worktype").value+'\n\
Примечание: '+document.getElementById("t_note").value+'\n\
Источник: '+document.getElementById("t_url").value;
    } break;

    case 2: {
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

