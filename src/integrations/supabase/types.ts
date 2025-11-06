export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      email_logs: {
        Row: {
          created_at: string
          email: string
          email_type: string
          id: string
          metadata: Json | null
          sent_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          email_type: string
          id?: string
          metadata?: Json | null
          sent_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          email_type?: string
          id?: string
          metadata?: Json | null
          sent_at?: string
          user_id?: string
        }
        Relationships: []
      }
      email_schedules: {
        Row: {
          created_at: string
          email: string
          email_type: string
          error_message: string | null
          id: string
          metadata: Json | null
          scheduled_for: string
          sent_at: string | null
          status: string
          template_name: string
          updated_at: string
          user_id: string
          webinar_event_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          email_type: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          scheduled_for: string
          sent_at?: string | null
          status?: string
          template_name: string
          updated_at?: string
          user_id: string
          webinar_event_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          email_type?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          scheduled_for?: string
          sent_at?: string | null
          status?: string
          template_name?: string
          updated_at?: string
          user_id?: string
          webinar_event_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_schedules_webinar_event_id_fkey"
            columns: ["webinar_event_id"]
            isOneToOne: false
            referencedRelation: "webinar_events"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          converted: boolean
          created_at: string
          email: string
          id: string
          metadata: Json | null
          source: string | null
          user_id: string | null
          webinar_purchased: boolean
        }
        Insert: {
          converted?: boolean
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          source?: string | null
          user_id?: string | null
          webinar_purchased?: boolean
        }
        Update: {
          converted?: boolean
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          source?: string | null
          user_id?: string | null
          webinar_purchased?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount: number
          expires_at: string
          id: string
          product_type: string
          purchased_at: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          expires_at: string
          id?: string
          product_type: string
          purchased_at?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          expires_at?: string
          id?: string
          product_type?: string
          purchased_at?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      webinar_access: {
        Row: {
          id: string
          last_accessed_at: string | null
          purchased_at: string
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          last_accessed_at?: string | null
          purchased_at?: string
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          id?: string
          last_accessed_at?: string | null
          purchased_at?: string
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      webinar_events: {
        Row: {
          bundle_price_cents: number
          created_at: string
          discount_window_hours: number
          id: string
          is_active: boolean
          meeting_id: string
          passcode: string
          post_webinar_trigger_offset_minutes: number
          single_workbook_price_cents: number
          timezone: string
          title: string
          updated_at: string
          webinar_date: string
          zoom_link: string
        }
        Insert: {
          bundle_price_cents?: number
          created_at?: string
          discount_window_hours?: number
          id?: string
          is_active?: boolean
          meeting_id: string
          passcode: string
          post_webinar_trigger_offset_minutes?: number
          single_workbook_price_cents?: number
          timezone?: string
          title: string
          updated_at?: string
          webinar_date: string
          zoom_link: string
        }
        Update: {
          bundle_price_cents?: number
          created_at?: string
          discount_window_hours?: number
          id?: string
          is_active?: boolean
          meeting_id?: string
          passcode?: string
          post_webinar_trigger_offset_minutes?: number
          single_workbook_price_cents?: number
          timezone?: string
          title?: string
          updated_at?: string
          webinar_date?: string
          zoom_link?: string
        }
        Relationships: []
      }
      webinar_registrations: {
        Row: {
          attended: boolean | null
          created_at: string
          email: string
          id: string
          registered_at: string
          user_id: string
          webinar_event_id: string
        }
        Insert: {
          attended?: boolean | null
          created_at?: string
          email: string
          id?: string
          registered_at?: string
          user_id: string
          webinar_event_id: string
        }
        Update: {
          attended?: boolean | null
          created_at?: string
          email?: string
          id?: string
          registered_at?: string
          user_id?: string
          webinar_event_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "webinar_registrations_webinar_event_id_fkey"
            columns: ["webinar_event_id"]
            isOneToOne: false
            referencedRelation: "webinar_events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
