declare namespace Face {
    interface SearchPayload {
        user_id?: string;
        start_date?: string;  // ISO string, contoh: "2025-05-01T00:00:00"
        end_date?: string;    // ISO string
        page?: number;
        limit?: number;
        top_k?: number;
        collection_name?: string;
        unit_id?: string;
        nRadius?: number;
    };

    type BoundingBox = {
        x: number;
        y: number;
        w: number;
        h: number;
    }

    type FaceSearchResult = {
        id: number;
        score: number;
        is_reference: boolean;
        photo_face_id: string;
        photo_id: string;
        original_path: string;
        compressed_path: string;
        original_filename: string;
        bounding_box_db: BoundingBox;
        uploaded_at: string;
        is_choosen: boolean | null;
        unit_name: string;
        photo_type_name: string,
        photo_price: number,
        is_purchased: boolean
    }

    interface SearchResponse {
        status_code: number;
        status: string;
        message: string;
        user_id: string;
        page: number;
        limit: number;
        total_items: number;
        total_pages: number;
        results: FaceSearchResult[];
    };


    interface IPhotos {
        id?: string;
        type: number;
        data: Face.FaceSearchResult[];
    }

    interface IResponseGetInference {
        status_code: number;
        user_id: string;
        inference: boolean
    }

    interface UploadResponseData {
        id: string;
        filename: string;
        original_path: string;
        thumbnail_path: string;
        status: string;
        uploaded_at: string; // ISO date string
    }

    interface UploadResponse {
        message: string;
        data: UploadResponseData;
    }

    interface PhotoReferenceStatus {
        photo_id: string;
        user_id: string;
        status: string;
        milvus_id: number;
        updated_at: string; 
    }

    interface PurchasedStatus {
        user_id: string;
        photo_id: string;
        is_purchased: boolean
    }
}