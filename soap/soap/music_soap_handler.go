package soap

import (
	"encoding/xml"
	"music-manager-go/internal/db"
	"music-manager-go/internal/models"
)

type MusicSOAPHandler struct {
	supabase *db.SupabaseService
}

func NewMusicSOAPHandler(supabase *db.SupabaseService) *MusicSOAPHandler {
	return &MusicSOAPHandler{
		supabase: supabase,
	}
}

// SOAP Request/Response types
type MusicSOAPEnvelope struct {
	XMLName xml.Name `xml:"http://schemas.xmlsoap.org/soap/envelope/ Envelope"`
	Body    MusicSOAPBody
}

type MusicSOAPBody struct {
	XMLName xml.Name `xml:"http://schemas.xmlsoap.org/soap/envelope/ Body"`
	Content interface{}
}

// FindAll
type FindAllMusicRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/music FindAllMusicRequest"`
}

type FindAllMusicResponse struct {
	XMLName xml.Name     `xml:"http://music.soap.manager/music FindAllMusicResponse"`
	Musics  []MusicSOAP  `xml:"musics"`
}

// FindOne
type FindOneMusicRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/music FindOneMusicRequest"`
	ID      int32    `xml:"id"`
}

type FindOneMusicResponse struct {
	XMLName xml.Name   `xml:"http://music.soap.manager/music FindOneMusicResponse"`
	Music   MusicSOAP  `xml:"music"`
}

// Create
type CreateMusicRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/music CreateMusicRequest"`
	Name    string   `xml:"name"`
	Artist  string   `xml:"artist"`
}

type CreateMusicResponse struct {
	XMLName xml.Name   `xml:"http://music.soap.manager/music CreateMusicResponse"`
	Music   MusicSOAP  `xml:"music"`
}

// Update
type UpdateMusicRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/music UpdateMusicRequest"`
	ID      int32    `xml:"id"`
	Name    *string  `xml:"name,omitempty"`
	Artist  *string  `xml:"artist,omitempty"`
}

type UpdateMusicResponse struct {
	XMLName xml.Name   `xml:"http://music.soap.manager/music UpdateMusicResponse"`
	Music   MusicSOAP  `xml:"music"`
}

// Delete
type DeleteMusicRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/music DeleteMusicRequest"`
	ID      int32    `xml:"id"`
}

type DeleteMusicResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/music DeleteMusicResponse"`
	Success bool     `xml:"success"`
	Message string   `xml:"message"`
}

// Music data type
type MusicSOAP struct {
	ID     int32  `xml:"id"`
	Name   string `xml:"name"`
	Artist string `xml:"artist"`
}

// SOAP Fault
type SOAPFault struct {
	XMLName     xml.Name `xml:"http://schemas.xmlsoap.org/soap/envelope/ Fault"`
	FaultCode   string   `xml:"faultcode"`
	FaultString string   `xml:"faultstring"`
}

func (h *MusicSOAPHandler) FindAll(req *FindAllMusicRequest) (*FindAllMusicResponse, *SOAPFault) {
	musics, err := h.supabase.FindAllMusic(nil)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	soapMusics := make([]MusicSOAP, len(musics))
	for i, music := range musics {
		soapMusics[i] = MusicSOAP{
			ID:     music.ID,
			Name:   music.Name,
			Artist: music.Artist,
		}
	}

	return &FindAllMusicResponse{Musics: soapMusics}, nil
}

func (h *MusicSOAPHandler) FindOne(req *FindOneMusicRequest) (*FindOneMusicResponse, *SOAPFault) {
	music, err := h.supabase.FindMusicByID(nil, req.ID)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &FindOneMusicResponse{
		Music: MusicSOAP{
			ID:     music.ID,
			Name:   music.Name,
			Artist: music.Artist,
		},
	}, nil
}

func (h *MusicSOAPHandler) Create(req *CreateMusicRequest) (*CreateMusicResponse, *SOAPFault) {
	createReq := &models.CreateMusicRequest{
		Name:   req.Name,
		Artist: req.Artist,
	}

	music, err := h.supabase.CreateMusic(nil, createReq)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &CreateMusicResponse{
		Music: MusicSOAP{
			ID:     music.ID,
			Name:   music.Name,
			Artist: music.Artist,
		},
	}, nil
}

func (h *MusicSOAPHandler) Update(req *UpdateMusicRequest) (*UpdateMusicResponse, *SOAPFault) {
	updateReq := &models.UpdateMusicRequest{
		ID:     req.ID,
		Name:   req.Name,
		Artist: req.Artist,
	}

	music, err := h.supabase.UpdateMusic(nil, updateReq)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &UpdateMusicResponse{
		Music: MusicSOAP{
			ID:     music.ID,
			Name:   music.Name,
			Artist: music.Artist,
		},
	}, nil
}

func (h *MusicSOAPHandler) Delete(req *DeleteMusicRequest) (*DeleteMusicResponse, *SOAPFault) {
	err := h.supabase.DeleteMusic(nil, req.ID)
	if err != nil {
		return &DeleteMusicResponse{
			Success: false,
			Message: err.Error(),
		}, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &DeleteMusicResponse{
		Success: true,
		Message: "Music deleted successfully",
	}, nil
}
