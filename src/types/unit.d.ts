declare namespace Unit {
    
    interface IUnit {
        id: string;
        name: string;
        location: string;
        created_at: string;
    }

    interface IPaginatedUnitResponse {
        total: number;
        page: number;
        limit: number;
        data: IUnit[];
    }
}