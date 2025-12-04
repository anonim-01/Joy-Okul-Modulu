-- Add missing enum values to school_status
DO $$ 
BEGIN
    -- Add VISITED if not exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'VISITED' 
        AND enumtypid = 'school_status'::regtype
    ) THEN
        ALTER TYPE school_status ADD VALUE 'VISITED';
    END IF;
    
    -- Add PROPOSAL_SENT if not exists  
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'PROPOSAL_SENT' 
        AND enumtypid = 'school_status'::regtype
    ) THEN
        ALTER TYPE school_status ADD VALUE 'PROPOSAL_SENT';
    END IF;
    
    -- Add NEGOTIATING if not exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'NEGOTIATING' 
        AND enumtypid = 'school_status'::regtype
    ) THEN
        ALTER TYPE school_status ADD VALUE 'NEGOTIATING';
    END IF;
END $$;
