$(document).ready(function(){

    var canvas = new fabric.Canvas('canvas',{
        backgroundColor: '#ffffff',
    });

    function clearInput(){
        const content = $('#text-content').val('');
        const font = $('#font-family').val('Montserrat');
        const size = $('#font-size').val('13');
        const bold =  $('#font-bold').attr('checked', false);
        const normal =  $('#font-normal').attr('checked', false);
        const italic =  $('#font-italic').attr('checked', false);
        const under =  $('#text-underline').attr('checked', false);
        const color =  $('#text-color').val('#000000');
        const bg =  $('#bg-color').val('#ffffff');
    }

    function addText(content, font, size, bold, normal, italic, under, color, bg){
        if(content){
            const text = new fabric.IText(content,{
                fontFamily: font,
                fontSize: size,
                fill: color,
                left: 120,
                top: 50,
            });
            if(bold){
                text.set('fontWeight', 'bold');
            }
            if(normal){
                text.set('fontWeight', 'normal');
            }
            if(italic){
                text.set('fontStyle', 'italic');
            }
            if(under){
                text.set('underline', 'true');
            }
            if(bg != '#ffffff'){
                text.set('textBackgroundColor', bg);
            }

            canvas.add(text);
            clearInput()
            text.on('selected', function() {
                $('#text-content').val(text.text);

                // this.text =  $('#text-content').on('keyup change', function (e) { 
                //     e.preventDefault();
                //     return $('#text-content').val();
                // });
              });
        }
    }
    
    $('#add-text').click(function (e) { 
        e.preventDefault();
        const content = $('#text-content').val();
        const font = $('#font-family').val();
        const size = $('#font-size').val();
        const bold =  $('#font-bold').is(':checked');
        const normal =  $('#font-normal').is(':checked');
        const italic =  $('#font-italic').is(':checked');
        const under =  $('#text-underline').is(':checked');
        const color =  $('#text-color').val();
        const bg =  $('#bg-color').val();

        console.log(content, font, size, bold, normal, italic, under, color, bg);
        addText(content, font, size, bold, normal, italic, under, color, bg);
    });
    
    // var text = new fabric.IText('hello world', { 
    //     left: 100, 
    //     top: 100, 
    //     fontSize: 40 ,
    //     fill : 'red'
    // } );
    // canvas.add(text);

})


