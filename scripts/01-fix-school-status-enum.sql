-- Drop existing enum if it exists and recreate with all needed values
DO $$ BEGIN
    -- Create the enum type if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'school_status') THEN
        CREATE TYPE school_status AS ENUM (
            'NEW',
            'CONTACTED', 
            'VISITED',
            'PROPOSAL_SENT',
            'NEGOTIATING',
            'WON',
            'LOST'
        );
    ELSE
        -- Add missing enum values if they don't exist
        BEGIN
            ALTER TYPE school_status ADD VALUE IF NOT EXISTS 'NEGOTIATING';
        EXCEPTION WHEN duplicate_object THEN
            NULL;
        END;
    END IF;
END $$;

-- Ensure schools table uses the enum
DO $$ BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'schools' AND column_name = 'status'
    ) THEN
        -- Update existing status column to use enum if not already
        ALTER TABLE schools 
        ALTER COLUMN status TYPE school_status 
        USING status::school_status;
    END IF;
END $$;
