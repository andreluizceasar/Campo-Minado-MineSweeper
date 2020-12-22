document.addEventListener('DOMContentLoaded', () =>{
    
    const matrix = [];

    for(let i = 0;i<10;i++){
        matrix[i] = new Array(8);
        for(let j = 0; j < 8; j++){
            matrix[i][j] = 
            {
                name: 'blank',
                img: 'blank.jpg'
            }
        }
    }

    //vetor com os numeros
    const numeros = [
        {   
            name: 'num',
            img: '1.png'
        },
        {
            name: 'num',
            img: '2.png'
        },
        {
            name: 'num',
            img: '3.png'
        },
        {            
            name: 'num',
            img: '4.png'
        },
        {            
            name: 'num',
            img: '5.png'
        },
        {            
            name: 'num',
            img: '6.png'
        },
        {            
            name: 'num',
            img: '7.png'
        },
        {            
            name: 'num',
            img: '8.png'
        }
    ];

    //Plant bombs
    let numBombas = 10;
    while(numBombas > 0){
        let col = Math.floor(Math.random()*10);
        let row = Math.floor(Math.random()*8);
        
        if(matrix[col][row].name != 'bomb'){
            matrix[col][row] = 
            {                
                name: 'bomb',
                img: 'bomb.jpg'
            }
            numBombas--;
            
            // Check for number of bombs
            let colLim = col+1;
            let rowLim = row+1;

            //As linhas tem que ser resetadas toda vez
            let rowInit = row;            
            for(col -= 1; col <= colLim;col++){
                for(row = rowInit-1; row <= rowLim; row++){                    
                   //Check if its out of bounds
                    if(matrix[col]!=undefined){

                        if(matrix[col][row]!=undefined){
                            /*if it's not a bomb, then count how many bombs it has 
                            around it*/
                            if(matrix[col][row].name!='bomb'){
                                let numBombs=0;
                               
                                let colint = col;
                                let rowint = row;

                                let colintLim = col+1;
                                let rowintLim = row+1;                        
                            
                                for(colint -= 1; colint <= colintLim; colint++){
                                    for(rowint = row-1; rowint <= rowintLim; rowint++){                                        
                                        if(matrix[colint]!=undefined){
                                            
                                            if(matrix[colint][rowint]!=undefined){
                                                
                                                if(matrix[colint][rowint].name == 'bomb'){                                                    
                                                    numBombs++;
                                                }
                                            }

                                        }
                                    } 
                                }                                
                                if(numBombs>0)
                                    matrix[col][row] = numeros[numBombs-1];                                    
                            }

                        }
                    }

                }                
            }
        } 

    }

    const grid = document.querySelector('.grid-container');

    function createBoard(){
        for(let i = 0; i < 8;i++){
            for(let j = 0; j < 10; j++){
                var card = document.createElement('img');
                card.setAttribute('name', matrix[j][i].name);
                card.setAttribute('src', 'tile.jpg');
                card.setAttribute('row',i);
                card.setAttribute('column',j);
                card.addEventListener('click', flipCard);                
                grid.appendChild(card);
            }
            
        }
    }
    
    function flipCard(){
        let column = new Number(this.getAttribute('column'));
        let row = new Number (this.getAttribute('row'));        
        this.setAttribute('src', matrix[column][row].img); 
       
        //se for bomba, mostrar todas as bombas
        if(matrix[column][row].name=='bomb'){
            let colb,rowb;
            let list = grid.querySelectorAll("[name='bomb']");
            
            for(let i = 0;i<list.length;i++){
                colb = list[i].getAttribute('column');
                rowb = list[i].getAttribute('row');
                list[i].setAttribute('src',matrix[column][row].img);
            }
        }

        //se for espaço branco, abre todos ao redor
        if(matrix[column][row].name=='blank'){
            flipBlanksPrin(column,row);              
        }
        
    }

    function flipBlanksPrin(col, row){
        flipBlanks(col,row-1);
        flipBlanks(col,row+1);
        flipBlanks(col-1,row);
        flipBlanks(col+1,row);
    }

    function flipBlanks(col, row){
        if(matrix[col]!=undefined && matrix[col][row]!=undefined && elementList[col][row].getAttribute('src')=='tile.jpg'){
            elementList[col][row].setAttribute('src',matrix[col][row].img);
            
            if(elementList[col][row].getAttribute('name')=='num'){
                return;
            }
            flipBlanksPrin(col,row);

        }else{
            return;
        }
    }

    createBoard();

    let elementList = [];
    for(let i = 0;i<10;i++){
        elementList[i] = grid.querySelectorAll("[column='"+i+"']");
    }

})
