const variables = require("../variables");
const path = require("path");
const filesystem = require("../toolkit/filesystem");

const database_path = path.join(variables.database_path, "rooms.json");


class Room 
{
    constructor(title, password)
    {
        this.title = title;
        this.sessionKey = Math.floor(Math.random() * 26) + 1; 
        this.password = password; 
        this.id = -1;
    }

    getId()
    {
        return this.id;
    }

    save(CALLBACK)
    {
        Room.findAll((rooms) => {
            const length = rooms.length; 
            if(this.id == -1)
            {
                if(length > 0){
                    this.id = rooms[length - 1].id + 1;
                } 
                else this.id = 1;
                
                rooms.push({
                    id: this.id,
                    sessionKey : this.sessionKey, 
                    password :  this.password, 
                    title : this.title
                }); 
            }
            else 
            {
                for(let i = 0; i < length; i++)
                {
                    if(rooms[i].id == this.id)
                    {
                        rooms[i].password = this.password; 
                        rooms[i].sessionKey = this.sessionKey;
                        rooms[i].title = this.title;
                    }
                }
            }
            
            filesystem.writeToFile(database_path, rooms, CALLBACK);
        });
    }

    static findById(id, CALLBACK)
    {
        Room.findAll((rooms) => {
            const length = rooms.length;
            for(let i = 0; i < length; i++)
            {
                if(rooms[i].id == id)
                {
                    return CALLBACK(rooms[i]);
                }
            }; 
            CALLBACK(undefined);
        });
    }

    static findByIdAndDelete(id, CALLBACK)
    {
        Room.findAll((rooms) => {
            const length = rooms.length;
            for(let i = 0; i < length; i++)
            {
                if(rooms[i].id == id)
                {
                    rooms.splice(i, 1);
                }
            }; 
            filesystem.writeToFile(database_path, rooms, CALLBACK);
        });
    }

    static findAll(CALLBACK)
    {
        filesystem.readFromFile(database_path, (data) => 
        {
            return CALLBACK(data);
        }); 
    }

    static filterByFrom(from, CALLBACK)
    {
        Message.findAll((rooms) => {
            const length = rooms.length;
            let filtered_rooms = [];
            for(let i = 0; i < length; i++)
            {
                if(rooms[i].from == from)
                {
                    filtered_rooms.push(rooms[i]);
                }
            }; 
            CALLBACK(filtered_rooms);
        });
    }

    static filterByTo(to, CALLBACK)
    {
        Message.findAll((rooms) => {
            const length = rooms.length;
            let filtered_rooms = [];
            for(let i = 0; i < length; i++)
            {
                if(rooms[i].to == to)
                {
                    filtered_rooms.push(rooms[i]);
                }
            }; 
            CALLBACK(filtered_rooms);
        });
    }

    

}

module.exports = Room;