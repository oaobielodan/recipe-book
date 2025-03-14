let sheets = [
    { name: 'one'},
    { name: 'two'},
    { name: 'three'},
    { name: 'four'},
    { name: 'five' },
    { name: 'six' },
];

let ongoingSheet = 1,
changing = false;

function change(flip) {
    if (changing) return;
    
    if (flip != 'next' && flip != 'back') return;  

    let next_sheet = (flip == 'next'),
        switch_left_data = next_sheet ? sheets[ongoingSheet + 2] : sheets[ongoingSheet - 2],
        switch_right_data = next_sheet ? sheets[ongoingSheet + 3] : sheets[ongoingSheet - 1];
    
    if (!switch_left_data && !switch_right_data) return;
    
    changing = true;

    let $ong_left = $('.book .ongoing.page-left.page'),
        $ong_right = $('.book .ongoing.page-right.page'),
        $switch_left = $('<div class="page-left page ' + flip + '" />'),
        $switch_right = $('<div class="page-right oage ' + flip + '" />');
    
    if (switch_left_data) {
        $switch_left.addClass(switch_left_data.name);
        // $switch_left.html(switch_left_data.id);
    }
    
    if (switch_right_data) {
        $switch_right.addClass(switch_right_data.name); 
        // $switch_right.html(switch_right_data.id);
    }  
    
    $('.book').prepend($switch_left);
    $('.book').prepend($switch_right);
    
    $ong_left.addClass('to_remove');
    $ong_right.addClass('to_remove');
    
    setTimeout(function(){
        if (next_sheet) {
            $ong_right.addClass('move');
            $switch_left.addClass('move');
        }
        else {
            $ong_left.addClass('move');
            $switch_right.addClass('move');
        }
        
        $switch_left.addClass('ongoing');
        $switch_right.addClass('ongoing');
        
    }, 100);
    
    setTimeout(function(){
        $('.book .page.to_remove').remove();
        $('.book .page').removeClass('move next back'); 
        changing = false;        
    }, 500);
    
    ongoingSheet = next_sheet ? (ongoingSheet + 2) : (ongoingSheet - 2);
}

$('.controls button').click(function(){
	change($(this).prop('class'));
});