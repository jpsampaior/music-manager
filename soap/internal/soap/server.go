package soap

import (
	"encoding/xml"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"music-manager-go/internal/db"
)

type SOAPServer struct {
	musicHandler    *MusicSOAPHandler
	playlistHandler *PlaylistSOAPHandler
	userHandler     *UserSOAPHandler
}

func NewSOAPServer(supabase *db.SupabaseService) *SOAPServer {
	return &SOAPServer{
		musicHandler:    NewMusicSOAPHandler(supabase),
		playlistHandler: NewPlaylistSOAPHandler(supabase),
		userHandler:     NewUserSOAPHandler(supabase),
	}
}

func (s *SOAPServer) Start(port string) error {
	http.HandleFunc("/music", s.handleMusicService)
	http.HandleFunc("/playlist", s.handlePlaylistService)
	http.HandleFunc("/user", s.handleUserService)
	http.HandleFunc("/music/wsdl", s.handleMusicWSDL)
	http.HandleFunc("/playlist/wsdl", s.handlePlaylistWSDL)
	http.HandleFunc("/user/wsdl", s.handleUserWSDL)

	log.Printf("SOAP server running on port %s", port)
	return http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
}

func (s *SOAPServer) handleMusicService(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, SOAPAction")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed. Use POST for SOAP requests", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Parse SOAP envelope
	var envelope struct {
		XMLName xml.Name `xml:"Envelope"`
		Body    struct {
			Content []byte `xml:",innerxml"`
		} `xml:"Body"`
	}

	if err := xml.Unmarshal(body, &envelope); err != nil {
		s.sendSOAPFault(w, "Client", "Invalid SOAP envelope")
		return
	}

	// Determine action from SOAPAction header or body content
	action := r.Header.Get("SOAPAction")
	action = strings.Trim(action, "\"")

	var response interface{}
	var fault *SOAPFault

	// Parse request and call appropriate handler
	bodyContent := string(envelope.Body.Content)

	switch {
	case strings.Contains(bodyContent, "FindAllMusicRequest") || strings.Contains(action, "FindAll"):
		var req FindAllMusicRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.musicHandler.FindAll(&req)
		}
	case strings.Contains(bodyContent, "FindOneMusicRequest") || strings.Contains(action, "FindOne"):
		var req FindOneMusicRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.musicHandler.FindOne(&req)
		}
	case strings.Contains(bodyContent, "CreateMusicRequest") || strings.Contains(action, "Create"):
		var req CreateMusicRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.musicHandler.Create(&req)
		}
	case strings.Contains(bodyContent, "UpdateMusicRequest") || strings.Contains(action, "Update"):
		var req UpdateMusicRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.musicHandler.Update(&req)
		}
	case strings.Contains(bodyContent, "DeleteMusicRequest") || strings.Contains(action, "Delete"):
		var req DeleteMusicRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.musicHandler.Delete(&req)
		}
	default:
		s.sendSOAPFault(w, "Client", "Unknown operation")
		return
	}

	if fault != nil {
		s.sendSOAPFault(w, fault.FaultCode, fault.FaultString)
		return
	}

	s.sendSOAPResponse(w, response)
}

func (s *SOAPServer) handlePlaylistService(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, SOAPAction")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed. Use POST for SOAP requests", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var envelope struct {
		XMLName xml.Name `xml:"Envelope"`
		Body    struct {
			Content []byte `xml:",innerxml"`
		} `xml:"Body"`
	}

	if err := xml.Unmarshal(body, &envelope); err != nil {
		s.sendSOAPFault(w, "Client", "Invalid SOAP envelope")
		return
	}

	action := r.Header.Get("SOAPAction")
	action = strings.Trim(action, "\"")

	var response interface{}
	var fault *SOAPFault

	bodyContent := string(envelope.Body.Content)

	switch {
	case strings.Contains(bodyContent, "FindAllPlaylistsRequest") || strings.Contains(action, "FindAll"):
		var req FindAllPlaylistsRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.playlistHandler.FindAll(&req)
		}
	case strings.Contains(bodyContent, "FindOnePlaylistRequest") || strings.Contains(action, "FindOne"):
		var req FindOnePlaylistRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.playlistHandler.FindOne(&req)
		}
	case strings.Contains(bodyContent, "FindMusicsInPlaylistRequest") || strings.Contains(action, "FindMusics"):
		var req FindMusicsInPlaylistRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.playlistHandler.FindMusics(&req)
		}
	case strings.Contains(bodyContent, "FindUsersOfPlaylistRequest") || strings.Contains(action, "FindUsers"):
		var req FindUsersOfPlaylistRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.playlistHandler.FindUsers(&req)
		}
	case strings.Contains(bodyContent, "CreatePlaylistRequest") || strings.Contains(action, "Create"):
		var req CreatePlaylistRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.playlistHandler.Create(&req)
		}
	case strings.Contains(bodyContent, "UpdatePlaylistRequest") || strings.Contains(action, "Update"):
		var req UpdatePlaylistRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.playlistHandler.Update(&req)
		}
	case strings.Contains(bodyContent, "DeletePlaylistRequest") || strings.Contains(action, "Delete"):
		var req DeletePlaylistRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.playlistHandler.Delete(&req)
		}
	case strings.Contains(bodyContent, "AddMusicToPlaylistRequest") || strings.Contains(action, "AddMusic"):
		var req AddMusicToPlaylistRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.playlistHandler.AddMusic(&req)
		}
	case strings.Contains(bodyContent, "RemoveMusicFromPlaylistRequest") || strings.Contains(action, "RemoveMusic"):
		var req RemoveMusicFromPlaylistRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.playlistHandler.RemoveMusic(&req)
		}
	default:
		s.sendSOAPFault(w, "Client", "Unknown operation")
		return
	}

	if fault != nil {
		s.sendSOAPFault(w, fault.FaultCode, fault.FaultString)
		return
	}

	s.sendSOAPResponse(w, response)
}

func (s *SOAPServer) handleUserService(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, SOAPAction")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed. Use POST for SOAP requests", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var envelope struct {
		XMLName xml.Name `xml:"Envelope"`
		Body    struct {
			Content []byte `xml:",innerxml"`
		} `xml:"Body"`
	}

	if err := xml.Unmarshal(body, &envelope); err != nil {
		s.sendSOAPFault(w, "Client", "Invalid SOAP envelope")
		return
	}

	action := r.Header.Get("SOAPAction")
	action = strings.Trim(action, "\"")

	var response interface{}
	var fault *SOAPFault

	bodyContent := string(envelope.Body.Content)

	switch {
	case strings.Contains(bodyContent, "FindAllUsersRequest") || strings.Contains(action, "FindAll"):
		var req FindAllUsersRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.userHandler.FindAll(&req)
		}
	case strings.Contains(bodyContent, "FindOneUserRequest") || strings.Contains(action, "FindOne"):
		var req FindOneUserRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.userHandler.FindOne(&req)
		}
	case strings.Contains(bodyContent, "FindPlaylistsOfUserRequest") || strings.Contains(action, "FindPlaylists"):
		var req FindPlaylistsOfUserRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.userHandler.FindPlaylists(&req)
		}
	case strings.Contains(bodyContent, "CreateUserRequest") || strings.Contains(action, "Create"):
		var req CreateUserRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.userHandler.Create(&req)
		}
	case strings.Contains(bodyContent, "UpdateUserRequest") || strings.Contains(action, "Update"):
		var req UpdateUserRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.userHandler.Update(&req)
		}
	case strings.Contains(bodyContent, "DeleteUserRequest") || strings.Contains(action, "Delete"):
		var req DeleteUserRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.userHandler.Delete(&req)
		}
	case strings.Contains(bodyContent, "AddPlaylistToUserRequest") || strings.Contains(action, "AddPlaylist"):
		var req AddPlaylistToUserRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.userHandler.AddPlaylist(&req)
		}
	case strings.Contains(bodyContent, "RemovePlaylistFromUserRequest") || strings.Contains(action, "RemovePlaylist"):
		var req RemovePlaylistFromUserRequest
		if err := xml.Unmarshal(envelope.Body.Content, &req); err == nil {
			response, fault = s.userHandler.RemovePlaylist(&req)
		}
	default:
		s.sendSOAPFault(w, "Client", "Unknown operation")
		return
	}

	if fault != nil {
		s.sendSOAPFault(w, fault.FaultCode, fault.FaultString)
		return
	}

	s.sendSOAPResponse(w, response)
}

func (s *SOAPServer) sendSOAPResponse(w http.ResponseWriter, response interface{}) {
	envelope := struct {
		XMLName xml.Name `xml:"soap:Envelope"`
		SOAP    string   `xml:"xmlns:soap,attr"`
		Body    struct {
			Response interface{}
		} `xml:"soap:Body"`
	}{
		SOAP: "http://schemas.xmlsoap.org/soap/envelope/",
	}
	envelope.Body.Response = response

	w.Header().Set("Content-Type", "text/xml; charset=utf-8")
	w.WriteHeader(http.StatusOK)

	output, err := xml.MarshalIndent(envelope, "", "  ")
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Write([]byte(xml.Header))
	w.Write(output)
}

func (s *SOAPServer) sendSOAPFault(w http.ResponseWriter, faultCode, faultString string) {
	fault := struct {
		XMLName xml.Name `xml:"soap:Envelope"`
		SOAP    string   `xml:"xmlns:soap,attr"`
		Body    struct {
			Fault SOAPFault `xml:"soap:Fault"`
		} `xml:"soap:Body"`
	}{
		SOAP: "http://schemas.xmlsoap.org/soap/envelope/",
	}
	fault.Body.Fault = SOAPFault{
		FaultCode:   faultCode,
		FaultString: faultString,
	}

	w.Header().Set("Content-Type", "text/xml; charset=utf-8")
	w.WriteHeader(http.StatusInternalServerError)

	output, _ := xml.MarshalIndent(fault, "", "  ")
	w.Write([]byte(xml.Header))
	w.Write(output)
}

// WSDL handlers (simplified - return basic WSDL)
func (s *SOAPServer) handleMusicWSDL(w http.ResponseWriter, r *http.Request) {
	wsdl := `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://music.soap.manager/music"
             targetNamespace="http://music.soap.manager/music">
  <message name="FindAllMusicRequest"/>
  <message name="FindAllMusicResponse"/>
  <portType name="MusicServicePortType">
    <operation name="FindAll">
      <input message="tns:FindAllMusicRequest"/>
      <output message="tns:FindAllMusicResponse"/>
    </operation>
  </portType>
  <binding name="MusicServiceBinding" type="tns:MusicServicePortType">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="FindAll">
      <soap:operation soapAction="FindAll"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
  </binding>
  <service name="MusicService">
    <port name="MusicServicePort" binding="tns:MusicServiceBinding">
      <soap:address location="http://localhost:8080/music"/>
    </port>
  </service>
</definitions>`

	w.Header().Set("Content-Type", "text/xml; charset=utf-8")
	w.Write([]byte(wsdl))
}

func (s *SOAPServer) handlePlaylistWSDL(w http.ResponseWriter, r *http.Request) {
	wsdl := `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://music.soap.manager/playlist"
             targetNamespace="http://music.soap.manager/playlist">
  <message name="FindAllPlaylistsRequest"/>
  <message name="FindAllPlaylistsResponse"/>
  <portType name="PlaylistServicePortType">
    <operation name="FindAll">
      <input message="tns:FindAllPlaylistsRequest"/>
      <output message="tns:FindAllPlaylistsResponse"/>
    </operation>
  </portType>
  <binding name="PlaylistServiceBinding" type="tns:PlaylistServicePortType">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="FindAll">
      <soap:operation soapAction="FindAll"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
  </binding>
  <service name="PlaylistService">
    <port name="PlaylistServicePort" binding="tns:PlaylistServiceBinding">
      <soap:address location="http://localhost:8080/playlist"/>
    </port>
  </service>
</definitions>`

	w.Header().Set("Content-Type", "text/xml; charset=utf-8")
	w.Write([]byte(wsdl))
}

func (s *SOAPServer) handleUserWSDL(w http.ResponseWriter, r *http.Request) {
	wsdl := `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://music.soap.manager/user"
             targetNamespace="http://music.soap.manager/user">
  <message name="FindAllUsersRequest"/>
  <message name="FindAllUsersResponse"/>
  <portType name="UserServicePortType">
    <operation name="FindAll">
      <input message="tns:FindAllUsersRequest"/>
      <output message="tns:FindAllUsersResponse"/>
    </operation>
  </portType>
  <binding name="UserServiceBinding" type="tns:UserServicePortType">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="FindAll">
      <soap:operation soapAction="FindAll"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
  </binding>
  <service name="UserService">
    <port name="UserServicePort" binding="tns:UserServiceBinding">
      <soap:address location="http://localhost:8080/user"/>
    </port>
  </service>
</definitions>`

	w.Header().Set("Content-Type", "text/xml; charset=utf-8")
	w.Write([]byte(wsdl))
}
