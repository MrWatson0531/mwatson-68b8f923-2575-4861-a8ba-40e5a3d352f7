import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Org } from "./org.entity";

@Injectable()
export class OrgsService {
    constructor(
        @InjectRepository(Org)
        private repo: Repository<Org>,
    ){}
    findAll(){
        return this.repo.find({relations: ['children', 'parent']});
    }
    create (name: string, parentId?: number){
        const org = this.repo.create({name, parent: parentId ? {id: parentId} : null});
        return this.repo.save(org);
    }
}